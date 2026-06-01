require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

function query(sql, values = [], executor = db) {
  return new Promise((resolve, reject) => {
    executor.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(results);
    });
  });
}

function getConnection() {
  return new Promise((resolve, reject) => {
    db.getConnection((error, connection) =>
      error ? reject(error) : resolve(connection)
    );
  });
}

function beginTransaction(connection) {
  return new Promise((resolve, reject) => {
    connection.beginTransaction((error) => (error ? reject(error) : resolve()));
  });
}

function commit(connection) {
  return new Promise((resolve, reject) => {
    connection.commit((error) => (error ? reject(error) : resolve()));
  });
}

function rollback(connection) {
  return new Promise((resolve) => connection.rollback(resolve));
}

async function withTransaction(callback) {
  const connection = await getConnection();

  try {
    await beginTransaction(connection);
    const result = await callback(connection);
    await commit(connection);
    return result;
  } catch (error) {
    await rollback(connection);
    throw error;
  } finally {
    connection.release();
  }
}

function normalizeShippingInformation(shippingInformation) {
  if (!shippingInformation) {
    return null;
  }

  return {
    firstName: String(shippingInformation.firstName || "").trim(),
    lastName: String(shippingInformation.lastName || "").trim(),
    email: String(shippingInformation.email || "").trim().toLowerCase(),
    phoneNumber: String(
      shippingInformation.phoneNumber || shippingInformation.phone || ""
    ).trim(),
    streetAddress: String(
      shippingInformation.streetAddress || shippingInformation.address || ""
    ).trim(),
    city: String(shippingInformation.city || "").trim(),
    state: String(shippingInformation.state || "").trim(),
    zipCode: String(
      shippingInformation.zipCode || shippingInformation.postalCode || ""
    ).trim(),
    saveForFutureOrders: Boolean(shippingInformation.saveForFutureOrders),
  };
}

function isValidShippingInformation(shippingInformation) {
  return (
    shippingInformation &&
    shippingInformation.firstName &&
    shippingInformation.lastName &&
    shippingInformation.email &&
    shippingInformation.phoneNumber &&
    shippingInformation.streetAddress &&
    shippingInformation.city &&
    shippingInformation.state &&
    shippingInformation.zipCode
  );
}

async function insertShippingAddress(
  customerId,
  shippingInformation,
  executor = db
) {
  const result = await query(
    `
      INSERT INTO shipping_addresses
      (
        customer_id,
        first_name,
        last_name,
        email,
        phone_number,
        street_address,
        city,
        state,
        zip_code,
        save_for_future_orders
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      customerId,
      shippingInformation.firstName,
      shippingInformation.lastName,
      shippingInformation.email,
      shippingInformation.phoneNumber,
      shippingInformation.streetAddress,
      shippingInformation.city,
      shippingInformation.state,
      shippingInformation.zipCode,
      shippingInformation.saveForFutureOrders,
    ],
    executor
  );

  return result.insertId;
}

app.get("/", (req, res) => {
  res.send("ShopVerse backend running");
});

app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "ShopVerse API running",
    endpoints: {
      signup: "POST /api/signup",
      signin: "POST /api/signin",
      shippingAddress: "POST /api/customers/:customerId/shipping-addresses",
      checkout: "POST /api/checkout",
    },
  });
});

app.get("/api/health", async (req, res) => {
  try {
    await query("SELECT 1");
    return res.json({ success: true, database: "connected" });
  } catch (error) {
    return res.status(503).json({
      success: false,
      database: "unavailable",
    });
  }
});

app.post("/api/signup", async (req, res) => {
  const { name, fullName, email, password } = req.body;
  const customerName = String(name || fullName || "").trim();
  const normalizedEmail = String(email || "").trim().toLowerCase();

  if (!customerName || !normalizedEmail || !password) {
    return res.status(400).json({
      success: false,
      message: "Name, email and password are required",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const customerResult = await withTransaction(async (connection) => {
      const result = await query(
        `
          INSERT INTO customers (name, email, password)
          VALUES (?, ?, ?)
        `,
        [customerName, normalizedEmail, hashedPassword],
        connection
      );

      await query(
        `
          INSERT INTO customer_signin_details
            (customer_id, email, password_hash, auth_provider)
          VALUES (?, ?, ?, 'email')
        `,
        [result.insertId, normalizedEmail, hashedPassword],
        connection
      );

      return result;
    });

    return res.status(201).json({
      success: true,
      message: "Customer created successfully",
      customer: {
        customerId: customerResult.insertId,
        name: customerName,
        fullName: customerName,
        email: normalizedEmail,
      },
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Signup failed",
      error: error.message,
    });
  }
});

app.post("/api/signin", async (req, res) => {
  const { email, password, rememberMe = false } = req.body;
  const normalizedEmail = String(email || "").trim().toLowerCase();

  if (!normalizedEmail || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  try {
    const customers = await query(
      `
        SELECT
          c.customer_id,
          c.name,
          c.email,
          COALESCE(csd.password_hash, c.password) AS password_hash,
          csd.signin_id
        FROM customers c
        LEFT JOIN customer_signin_details csd
          ON csd.customer_id = c.customer_id
          AND csd.auth_provider = 'email'
        WHERE c.email = ?
        LIMIT 1
      `,
      [normalizedEmail]
    );

    if (customers.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const customer = customers[0];
    const isPasswordMatch = await bcrypt.compare(password, customer.password_hash);

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    if (customer.signin_id) {
      await query(
        `
          UPDATE customer_signin_details
          SET remember_me = ?, last_signin_at = CURRENT_TIMESTAMP,
              signin_count = signin_count + 1
          WHERE signin_id = ?
        `,
        [Boolean(rememberMe), customer.signin_id]
      );
    } else {
      await query(
        `
          INSERT INTO customer_signin_details
            (
              customer_id, email, password_hash, auth_provider,
              remember_me, last_signin_at, signin_count
            )
          VALUES (?, ?, ?, 'email', ?, CURRENT_TIMESTAMP, 1)
        `,
        [
          customer.customer_id,
          customer.email,
          customer.password_hash,
          Boolean(rememberMe),
        ]
      );
    }

    const token = jwt.sign(
      { customerId: customer.customer_id },
      process.env.JWT_SECRET || "shopverse_secret_key",
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Signin successful",
      token,
      customer: {
        customerId: customer.customer_id,
        name: customer.name,
        fullName: customer.name,
        email: customer.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Signin failed",
      error: error.message,
    });
  }
});

app.post("/api/customers/:customerId/shipping-addresses", async (req, res) => {
  const customerId = Number(req.params.customerId);
  const shippingInformation = normalizeShippingInformation(req.body);

  if (!Number.isInteger(customerId) || customerId <= 0) {
    return res.status(400).json({ message: "A valid customer ID is required" });
  }

  if (!isValidShippingInformation(shippingInformation)) {
    return res.status(400).json({
      message:
        "First name, last name, email, phone number, street address, city, state and ZIP code are required",
    });
  }

  try {
    const shippingAddressId = await insertShippingAddress(
      customerId,
      shippingInformation
    );

    return res.status(201).json({
      message: "Shipping address saved successfully",
      shippingAddressId,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Shipping address could not be saved",
      error: error.message,
    });
  }
});

app.post("/api/checkout", async (req, res) => {
  const { customerId, cartItems } = req.body;
  const normalizedCustomerId = Number(customerId);
  const shippingInformation = normalizeShippingInformation(
    req.body.shippingInformation
  );

  if (
    !Number.isInteger(normalizedCustomerId) ||
    normalizedCustomerId <= 0 ||
    !Array.isArray(cartItems) ||
    cartItems.length === 0
  ) {
    return res.status(400).json({
      message: "Customer ID and cart items are required",
    });
  }

  if (
    req.body.shippingInformation &&
    !isValidShippingInformation(shippingInformation)
  ) {
    return res.status(400).json({
      message:
        "First name, last name, email, phone number, street address, city, state and ZIP code are required",
    });
  }

  const normalizedCartItems = cartItems.map((item) => ({
    id: Number(item.id ?? item.productId),
    name: item.name ?? item.productName,
    price: Number(item.price),
    quantity: Number(item.quantity),
  }));

  const hasInvalidCartItem = normalizedCartItems.some((item) => {
    return (
      !Number.isInteger(item.id) ||
      item.id <= 0 ||
      !item.name ||
      !Number.isFinite(item.price) ||
      item.price < 0 ||
      !Number.isInteger(item.quantity) ||
      item.quantity <= 0
    );
  });

  if (hasInvalidCartItem) {
    return res.status(400).json({
      message:
        "Each cart item must include a valid id, name, numeric price and numeric quantity",
    });
  }

  const netAmount = normalizedCartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
  const shippingAmount = 0;
  const taxAmount = Number((netAmount * 0.08).toFixed(2));
  const totalAmount = Number((netAmount + shippingAmount + taxAmount).toFixed(2));

  try {
    const order = await withTransaction(async (connection) => {
      const customers = await query(
        "SELECT name, email FROM customers WHERE customer_id = ? LIMIT 1",
        [normalizedCustomerId],
        connection
      );

      if (customers.length === 0) {
        const error = new Error("Customer not found");
        error.statusCode = 404;
        throw error;
      }

      const shippingAddressId = shippingInformation
        ? await insertShippingAddress(
            normalizedCustomerId,
            shippingInformation,
            connection
          )
        : null;

      const orderResult = await query(
        `
          INSERT INTO orders
            (
              customer_id, shipping_address_id, net_amount,
              shipping_amount, tax_amount, total_amount
            )
          VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
          normalizedCustomerId,
          shippingAddressId,
          netAmount,
          shippingAmount,
          taxAmount,
          totalAmount,
        ],
        connection
      );

      const orderItemsData = normalizedCartItems.map((item) => [
        orderResult.insertId,
        item.id,
        item.name,
        item.quantity,
        item.price,
        item.price * item.quantity,
      ]);

      await query(
        `
          INSERT INTO order_items
            (order_id, product_id, product_name, quantity, price, item_total)
          VALUES ?
        `,
        [orderItemsData],
        connection
      );

      const itemCount = normalizedCartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      await query(
        `
          INSERT INTO customer_shopping_information
            (
              customer_id, customer_name, customer_email, order_id,
              item_count, net_amount, shipping_amount, tax_amount, total_amount
            )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          normalizedCustomerId,
          customers[0].name,
          customers[0].email,
          orderResult.insertId,
          itemCount,
          netAmount,
          shippingAmount,
          taxAmount,
          totalAmount,
        ],
        connection
      );

      return { orderId: orderResult.insertId, shippingAddressId };
    });

    return res.status(201).json({
      message: "Order placed successfully",
      orderId: order.orderId,
      customerId: normalizedCustomerId,
      shippingAddressId: order.shippingAddressId,
      netAmount,
      shippingAmount,
      taxAmount,
      totalAmount,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.statusCode ? error.message : "Checkout failed",
      error: error.statusCode ? undefined : error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;

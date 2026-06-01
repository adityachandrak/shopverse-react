require("dotenv").config();

const mysql = require("mysql2/promise");

async function columnExists(db, tableName, columnName) {
  const [rows] = await db.query(
    `
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = ? AND table_name = ? AND column_name = ?
      LIMIT 1
    `,
    [process.env.DB_NAME, tableName, columnName]
  );

  return rows.length > 0;
}

async function migrate() {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT || 3306),
    multipleStatements: true,
  });
  const sourceDatabase = `\`${String(process.env.DB_NAME).replace(/`/g, "``")}\``;

  if (!(await columnExists(db, "customers", "name"))) {
    await db.query("ALTER TABLE customers ADD COLUMN name VARCHAR(100) NULL");
  }

  if (await columnExists(db, "customers", "full_name")) {
    await db.query(
      "UPDATE customers SET name = COALESCE(name, full_name) WHERE name IS NULL"
    );
  }

  await db.query(`
    CREATE TABLE IF NOT EXISTS customer_signin_details (
      signin_id INT AUTO_INCREMENT PRIMARY KEY,
      customer_id INT NOT NULL,
      email VARCHAR(100) NOT NULL,
      password_hash VARCHAR(255),
      auth_provider VARCHAR(30) NOT NULL DEFAULT 'email',
      provider_account_id VARCHAR(255),
      remember_me BOOLEAN NOT NULL DEFAULT FALSE,
      last_signin_at TIMESTAMP NULL,
      signin_count INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY uq_customer_signin_provider (customer_id, auth_provider),
      UNIQUE KEY uq_customer_signin_email_provider (email, auth_provider),
      FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
    );

    CREATE TABLE IF NOT EXISTS shipping_addresses (
      shipping_address_id INT AUTO_INCREMENT PRIMARY KEY,
      customer_id INT NOT NULL,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      phone_number VARCHAR(30) NOT NULL,
      street_address VARCHAR(255) NOT NULL,
      city VARCHAR(100) NOT NULL,
      state VARCHAR(100) NOT NULL,
      zip_code VARCHAR(20) NOT NULL,
      save_for_future_orders BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      KEY idx_shipping_customer (customer_id),
      FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
    );
  `);

  if (!(await columnExists(db, "orders", "shipping_address_id"))) {
    await db.query(`
      ALTER TABLE orders
      ADD COLUMN shipping_address_id INT NULL AFTER customer_id,
      ADD KEY idx_orders_shipping_address (shipping_address_id),
      ADD CONSTRAINT fk_orders_shipping_address
        FOREIGN KEY (shipping_address_id)
        REFERENCES shipping_addresses(shipping_address_id)
    `);
  }

  if (!(await columnExists(db, "orders", "shipping_amount"))) {
    await db.query(
      "ALTER TABLE orders ADD COLUMN shipping_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00 AFTER net_amount"
    );
  }

  if (!(await columnExists(db, "orders", "tax_amount"))) {
    await db.query(
      "ALTER TABLE orders ADD COLUMN tax_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00 AFTER shipping_amount"
    );
  }

  await db.query(`
    INSERT INTO products
      (id, name, description, category, image, price, stock)
    VALUES
      (1, 'Wireless Headphones', 'ShopVerse catalog product', 'electronics', '', 16999, 10),
      (2, 'Smart Watch', 'ShopVerse catalog product', 'electronics', '', 29999, 10),
      (3, 'Premium Laptop', 'ShopVerse catalog product', 'electronics', '', 109999, 10),
      (4, 'Portable Speaker', 'ShopVerse catalog product', 'electronics', '', 7499, 0),
      (5, 'Leather Bag', 'ShopVerse catalog product', 'fashion', '', 12499, 10),
      (6, 'Modern Chair', 'ShopVerse catalog product', 'home', '', 24999, 10),
      (7, 'Luxury Watch', 'ShopVerse catalog product', 'fashion', '', 49999, 10),
      (8, 'Designer Sunglasses', 'ShopVerse catalog product', 'fashion', '', 14999, 10),
      (9, 'Circuit Board Kit', 'ShopVerse catalog product', 'electronics', '', 6499, 10),
      (10, 'Gold Necklace', 'ShopVerse catalog product', 'fashion', '', 20999, 10),
      (11, 'Modern Sofa', 'ShopVerse catalog product', 'home', '', 74999, 10),
      (12, 'Dining Table Set', 'ShopVerse catalog product', 'home', '', 99999, 10)
    ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      description = VALUES(description),
      category = VALUES(category),
      price = VALUES(price),
      stock = VALUES(stock);

    CREATE TABLE IF NOT EXISTS customer_shopping_information (
      shopping_information_id INT AUTO_INCREMENT PRIMARY KEY,
      customer_id INT NOT NULL,
      customer_name VARCHAR(100) NOT NULL,
      customer_email VARCHAR(100) NOT NULL,
      order_id INT NOT NULL,
      item_count INT NOT NULL,
      net_amount DECIMAL(10,2) NOT NULL,
      shipping_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
      tax_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
      total_amount DECIMAL(10,2) NOT NULL,
      order_status VARCHAR(50) NOT NULL DEFAULT 'PLACED',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY uq_customer_shopping_order (order_id),
      KEY idx_customer_shopping_customer (customer_id),
      FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
      FOREIGN KEY (order_id) REFERENCES orders(order_id)
    );

    INSERT INTO customer_signin_details
      (customer_id, email, password_hash, auth_provider)
    SELECT customer_id, email, password, 'email'
    FROM customers
    WHERE email IS NOT NULL
    ON DUPLICATE KEY UPDATE
      password_hash = COALESCE(customer_signin_details.password_hash, VALUES(password_hash));

    CREATE DATABASE IF NOT EXISTS shopverse_customer_360;
  `);

  if (!(await columnExists(db, "customer_shopping_information", "shipping_amount"))) {
    await db.query(
      "ALTER TABLE customer_shopping_information ADD COLUMN shipping_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00 AFTER net_amount"
    );
  }

  if (!(await columnExists(db, "customer_shopping_information", "tax_amount"))) {
    await db.query(
      "ALTER TABLE customer_shopping_information ADD COLUMN tax_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00 AFTER shipping_amount"
    );
  }

  await db.query(`
    CREATE OR REPLACE VIEW shopverse_customer_360.customer_complete_information AS
    SELECT
      c.customer_id,
      c.name AS customer_name,
      c.email AS customer_email,
      c.created_at AS customer_created_at,
      (
        SELECT JSON_ARRAYAGG(
          JSON_OBJECT(
            'authProvider', csd.auth_provider,
            'email', csd.email,
            'rememberMe', csd.remember_me,
            'lastSigninAt', csd.last_signin_at,
            'signinCount', csd.signin_count
          )
        )
        FROM ${sourceDatabase}.customer_signin_details csd
        WHERE csd.customer_id = c.customer_id
      ) AS signin_details,
      (
        SELECT JSON_ARRAYAGG(
          JSON_OBJECT(
            'shippingAddressId', sa.shipping_address_id,
            'firstName', sa.first_name,
            'lastName', sa.last_name,
            'email', sa.email,
            'phoneNumber', sa.phone_number,
            'streetAddress', sa.street_address,
            'city', sa.city,
            'state', sa.state,
            'zipCode', sa.zip_code,
            'saveForFutureOrders', sa.save_for_future_orders
          )
        )
        FROM ${sourceDatabase}.shipping_addresses sa
        WHERE sa.customer_id = c.customer_id
      ) AS shipping_addresses,
      (
        SELECT JSON_ARRAYAGG(
          JSON_OBJECT(
            'shoppingInformationId', csi.shopping_information_id,
            'orderId', csi.order_id,
            'itemCount', csi.item_count,
            'netAmount', csi.net_amount,
            'shippingAmount', csi.shipping_amount,
            'taxAmount', csi.tax_amount,
            'totalAmount', csi.total_amount,
            'orderStatus', csi.order_status,
            'createdAt', csi.created_at
          )
        )
        FROM ${sourceDatabase}.customer_shopping_information csi
        WHERE csi.customer_id = c.customer_id
      ) AS shopping_information
    FROM ${sourceDatabase}.customers c;
  `);

  await db.end();
  console.log("Customer information migration completed");
}

migrate().catch((error) => {
  console.error("Customer information migration failed:", error.message);
  process.exit(1);
});

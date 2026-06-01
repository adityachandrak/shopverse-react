require("dotenv").config();

const mysql = require("mysql2/promise");

async function validate() {
  const customerId = Number(process.argv[2]);
  const shouldCleanup = process.argv.includes("--cleanup");

  if (!Number.isInteger(customerId) || customerId <= 0) {
    throw new Error("Usage: node scripts/validate-customer-information.js <customerId> [--cleanup]");
  }

  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT || 3306),
  });

  const [normalized] = await db.query(
    `
      SELECT
        c.customer_id, c.name, c.email, csd.remember_me, csd.signin_count,
        sa.first_name, sa.last_name, sa.city, sa.zip_code,
        csi.order_id, csi.item_count, csi.net_amount, csi.shipping_amount,
        csi.tax_amount, csi.total_amount
      FROM customers c
      JOIN customer_signin_details csd ON csd.customer_id = c.customer_id
      JOIN shipping_addresses sa ON sa.customer_id = c.customer_id
      JOIN customer_shopping_information csi ON csi.customer_id = c.customer_id
      WHERE c.customer_id = ?
    `,
    [customerId]
  );

  const [consolidated] = await db.query(
    `
      SELECT
        customer_id, customer_name, customer_email,
        JSON_LENGTH(signin_details) AS signin_records,
        JSON_LENGTH(shipping_addresses) AS shipping_records,
        JSON_LENGTH(shopping_information) AS shopping_records
      FROM shopverse_customer_360.customer_complete_information
      WHERE customer_id = ?
    `,
    [customerId]
  );

  console.log("Normalized validation:", JSON.stringify(normalized));
  console.log("Customer 360 validation:", JSON.stringify(consolidated));

  if (normalized.length === 0 || consolidated.length === 0) {
    throw new Error("Customer information validation failed");
  }

  if (shouldCleanup) {
    await db.beginTransaction();
    await db.query(
      `
        DELETE oi
        FROM order_items oi
        JOIN orders o ON o.order_id = oi.order_id
        WHERE o.customer_id = ?
      `,
      [customerId]
    );
    await db.query("DELETE FROM customer_shopping_information WHERE customer_id = ?", [
      customerId,
    ]);
    await db.query("DELETE FROM orders WHERE customer_id = ?", [customerId]);
    await db.query("DELETE FROM shipping_addresses WHERE customer_id = ?", [customerId]);
    await db.query("DELETE FROM customer_signin_details WHERE customer_id = ?", [
      customerId,
    ]);
    await db.query("DELETE FROM customers WHERE customer_id = ?", [customerId]);
    await db.commit();

    const [remaining] = await db.query(
      "SELECT COUNT(*) AS remaining_validation_customers FROM customers WHERE customer_id = ?",
      [customerId]
    );
    console.log("Cleanup:", JSON.stringify(remaining));
  }

  await db.end();
}

validate().catch((error) => {
  console.error("Customer information validation failed:", error.message);
  process.exit(1);
});

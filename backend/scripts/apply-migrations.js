require("dotenv").config();

const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

const migrationDir = path.join(__dirname, "../migrations");
const dbName = process.env.DB_NAME || "shopverse_db";

if (!fs.existsSync(migrationDir)) {
  console.error(`Migration directory not found: ${migrationDir}`);
  process.exit(1);
}

async function loadMigrationFiles() {
  return fs
    .readdirSync(migrationDir)
    .filter((file) => file.endsWith(".sql"))
    .sort();
}

async function main() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    multipleStatements: true,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
  await connection.query(`USE \`${dbName}\``);
  await connection.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      migration_name VARCHAR(255) NOT NULL UNIQUE,
      executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const [existingRows] = await connection.query(
    "SELECT migration_name FROM migrations ORDER BY migration_name"
  );

  const executed = new Set(existingRows.map((row) => row.migration_name));
  const migrationFiles = await loadMigrationFiles();

  for (const file of migrationFiles) {
    if (executed.has(file)) {
      console.log(`Skipping already executed migration: ${file}`);
      continue;
    }

    const filePath = path.join(migrationDir, file);
    const sql = fs.readFileSync(filePath, "utf8");

    console.log(`Applying migration: ${file}`);
    await connection.query(sql);
    await connection.query(
      "INSERT INTO migrations (migration_name) VALUES (?)",
      [file]
    );
    console.log(`Migration applied: ${file}`);
  }

  console.log("All migrations applied.");
  await connection.end();
}

main().catch((error) => {
  console.error("Migration failed:", error.message);
  process.exit(1);
});

CREATE DATABASE IF NOT EXISTS shopverse;
USE shopverse;

CREATE TABLE IF NOT EXISTS customers (
  customer_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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

CREATE TABLE IF NOT EXISTS products (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  image VARCHAR(255),
  price DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL,
  deleted_at TIMESTAMP NULL
);

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

CREATE TABLE IF NOT EXISTS orders (
  order_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  shipping_address_id INT,
  net_amount DECIMAL(10,2) NOT NULL,
  shipping_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  tax_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  total_amount DECIMAL(10,2) NOT NULL,
  order_status VARCHAR(50) DEFAULT 'PLACED',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
  FOREIGN KEY (shipping_address_id) REFERENCES shipping_addresses(shipping_address_id)
);

CREATE TABLE IF NOT EXISTS order_items (
  order_item_id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id BIGINT UNSIGNED NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  item_total DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

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

CREATE DATABASE IF NOT EXISTS shopverse_customer_360;

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
    FROM shopverse.customer_signin_details csd
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
    FROM shopverse.shipping_addresses sa
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
    FROM shopverse.customer_shopping_information csi
    WHERE csi.customer_id = c.customer_id
  ) AS shopping_information
FROM shopverse.customers c;

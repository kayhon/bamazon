DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pumpkins", "Food & Grocery", 4.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("AlmondMilk", "Food & Grocery", 2.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ProteinPowder", "Food & Grocery", 25.49, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("4kTV", "Electronics", 499.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("IphoneX", "Electronics", 900.00, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("YogaPants", "Clothing & Jewelry", 19.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("AquaSocks", "Clothing & Jewelry", 9.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("HairStraightener", "Beauty & Health", 99.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("AloeVeraGel", "Beauty & Health", 3.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("SteeringWheel", "Automotive", 149.49, 30);
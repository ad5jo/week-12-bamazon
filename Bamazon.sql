CREATE DATABASE Bamazon;
USE Bamazon;
CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL primary key,
	product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
	price DECIMAL(11,2) NOT NULL,
    stock_quantity INTEGER(11) NULL
);
drop table products;

SELECT stock_quantity FROM products WHERE item_id = 1;
SELECT * FROM products;
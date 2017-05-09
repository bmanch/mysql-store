CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products(
	id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price INTEGER(10) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("DJ Rumba", "Electronics", 350, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fulbright E-Reader", "Electronics", 199, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("NoSweat Wireless Headphones", "Electronics", 249, 18);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("New Heights Hover Craft", "Electronics", 12500, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Think Pen", "Electronics", 39, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cool Kid Headband", "Sports", 12.99, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Best Ever Basketball", "Sports", 99, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Node Hockey Stick", "Sports", 75, 11);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Not Average Cleats", "Sports", 60, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("About Average Cleats", "Sports", 65, 6);


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

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("New Horizons", "Books", 35, 72);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("JS for Newbies", "Books", 225, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("How a Computer Works", "Books", 48, 23);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("I Love Stuff", "Books", 9, 16);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Brand New Horizons (The Sequel to New Horizons)", "Books", 80, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Quinoa Madness", "Grocery", 14, 38);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Only Potato Chip", "Grocery", 4.75, 90);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Magic Health Drink", "Grocery", 9.99, 27);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Memories Cookies", "Grocery", 7, 65);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nostalgia Cookies", "Grocery", 6, 72);

UPDATE products
SET product_name = "Brand New Horizons - The Sequel to New Horizons"
WHERE id = 15;

ALTER TABLE products
ADD product_sales INTEGER(30);

CREATE TABLE departments(
	department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(100) NOT NULL,
    over_head_costs INTEGER(30) NOT NULL,
    total_sales INTEGER(30),
    PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Electronics", 2000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Sports", 1500);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Books", 1000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Grocery", 3000);

UPDATE departments
SET total_sales = 0
WHERE department_id = 1;

UPDATE departments
SET total_sales = 0
WHERE department_id = 2;

UPDATE departments
SET total_sales = 0
WHERE department_id = 3;

UPDATE departments
SET total_sales = 0
WHERE department_id = 4;
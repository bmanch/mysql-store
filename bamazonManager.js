var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
var departments = [];
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "Bamazon"
});

connection.connect(function(err) {
	if (err) throw err;
	connection.query("SELECT department_name FROM departments", function(err, res) {
		if (err) throw err;
		for (var i = 0; i < res.length; i++) {
			departments.push(res[i].department_name);
		}
		manage();
	});
});

function manage() {
	inquirer.prompt([
		{
			name: "manager",
			type: "list",
			message: "Hello Manager! What would you like to do?",
			choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
		}
	]).then(function(answer) {
		switch(answer.manager) {
			case "View Products for Sale":
				viewProd();
				break;

			case "View Low Inventory":
				viewInv();
				break;

			case "Add to Inventory":
				addInv();
				break;

			case "Add New Product":
				addProd();
				break;
		}
	});
}

function viewProd() {
	console.log("\n=================================================================\n");
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;
		var table = new Table({
			head: ['Product ID', 'Product Name', 'Department', 'Price', 'Stock Quantity'],
			colWidths: [15, 50, 15, 15, 20]
		});

		for (var i = 0; i < res.length; i++) {
			table.push(
				[res[i].id, res[i].product_name, res[i].department_name, "$" + res[i].price, res[i].stock_quantity]
			);
		}

		console.log(table.toString());
		console.log("\n=================================================================\n");
		setTimeout(manage, 1000);
	});
}

function viewInv() {
	console.log("\n=================================================================\n");
	connection.query("SELECT product_name, stock_quantity FROM products", function(err, res) {
		if (err) throw err;
		var table = new Table({
			head: ['Product Name', 'Low Stock Quantity'],
			colWidths: [30, 30]
		});

		for (var i = 0; i < res.length; i++) {
			if (res[i].stock_quantity < 5) {
				table.push(
					[res[i].product_name, res[i].stock_quantity]
				);
			}
		}

		console.log(table.toString());
		console.log("\n=================================================================\n");
		setTimeout(manage, 1000);
	});
}

function addInv() {
	console.log("\n=================================================================\n");
	var products = [];
	connection.query("SELECT product_name, stock_quantity FROM products", function(err, res) {
		if (err) throw err;

		for (var i = 0; i < res.length; i++) {
			products.push(res[i].product_name + " (current stock quantity: " + res[i].stock_quantity + ")");
		}

		inquirer.prompt([
			{
				name: "productSelect",
				type: "list",
				message: "What product would you like to add stock to?",
				choices: products
			}
		]).then(function(answer) {
			var index = answer.productSelect.indexOf("(") - 1;
			var product = answer.productSelect.slice(0, index);
			var numIndexOne = answer.productSelect.indexOf(":") + 2;
			var numIndexTwo = answer.productSelect.length - 1;
			var currentQuantity = parseInt(answer.productSelect.slice(numIndexOne, numIndexTwo));

			inquirer.prompt([
				{
					name: "quantity",
					type: "message",
					message: "How much stock would you like to add to this -- " + product + " -- product?",
					validate: function(value) {
						if (isNaN(value) === false) {
							return true;
						}
						return false;
					}
				}
			]).then(function(answer) {
				var newQuantity = currentQuantity + parseInt(answer.quantity);

				connection.query("UPDATE products SET ? WHERE ?", [ { stock_quantity: newQuantity }, { product_name: product }], function(err, res) {
					if (err) throw err;
					console.log("\n=================================================================\n");
					setTimeout(manage, 1000);
				});
			});
		});
	});
}

function addProd() {
	console.log("\n=================================================================\n");
	inquirer.prompt([
		{
			name: "name",
			type: "message",
			message: "What is the product called? (Do not include any colons or parentheses.)",
			validate: function(value) {
				if (value.indexOf(":") === -1 && value.indexOf("(") === -1 && value.indexOf(")") === -1) {
					return true;
				}
				return false;
			}
		},
		{
			name: "department",
			type: "list",
			message: "Choose which department this will go in.",
			choices: departments
		},
		{
			name: "price",
			type: "message",
			message: "How much will this item cost? (Do not include the dollar sign.)",
			validate: function(value) {
				if (isNaN(value) === false) {
					return true
				}
				return false
			}
		},
		{
			name: "quantity",
			type: "message",
			message: "How many of these items are we adding to our inventory?",
			validate: function(value) {
				if (isNaN(value) === false) {
					return true
				}
				return false
			}
		}
	]).then(function(answer) {
		connection.query("INSERT INTO products SET ?", {
			product_name: answer.name,
			department_name: answer.department,
			price: parseInt(answer.price),
			stock_quantity: parseInt(answer.quantity)
		}, function(err, res) {
			if (err) throw err;
			console.log("\n=================================================================\n");
			setTimeout(manage, 1000);
		});
	});
}
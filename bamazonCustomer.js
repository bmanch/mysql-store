var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "83meTOOdo91",
	database: "Bamazon"
});
var prodId = [];

connection.connect(function(err) {
	if (err) throw err;
	printProduct();
});

function printProduct() {
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;

		var table = new Table({
			head: ['Product ID', 'Product Name', 'Price'],
			colWidths: [15, 30, 15]
		});
		for (var i = 0; i < res.length; i++) {
			table.push(
				[res[i].id, res[i].product_name, "$" + res[i].price]
			);
			prodId.push(res[i].id);
		}
		console.log(table.toString());
		console.log("=================================================================\n");
		shop();
	});
}

function shop() {
	inquirer.prompt([
		{
			name: "productId",
			type: "message",
			message: "Take a look at our products above. What is the ID of the product you'd like to purchase?",
			validate: function(value) {
				if (isNaN(value) === false && prodId.indexOf(parseInt(value)) !== -1) {
					return true;
				}
				return false;
			}
		},
		{
			name: "amount",
			type: "message",
			message: "How many units of this product would you like to buy?",
			validate: function(value) {
				if (isNaN(value) === false) {
					return true;
				}
				return false;
			}
		}
	]).then(function(answer) {
		connection.query("SELECT price, stock_quantity FROM products WHERE id=?", [answer.productId], function(err, res) {
			if (err) {
				throw err;
			} else if (answer.amount > res[0].stock_quantity) {
				console.log("Sorry, but we have an insufficent quantity to fulfill your order. Try placing another order.");
				setTimeout(shop, 2000);
			} else {
				var amount = res[0].price * answer.amount;
				var remaining_stock = res[0].stock_quantity - answer.amount;

				connection.query("UPDATE products SET ? WHERE ?", [ {stock_quantity: remaining_stock}, {id: answer.productId} ], function(err, res) {
					if (err) throw err;
				});

				console.log("Purchase total: $" + amount + "\nThank you for your purchase!\n");

				//For the supervisor capabilities
				connection.query("SELECT department_name FROM products WHERE id=?", [answer.productId], function(err, res) {
					if (err) throw err;
					var depName = res[0].department_name;

					connection.query("SELECT total_sales FROM departments WHERE department_name=?", [depName], function(err, res) {
						if (err) throw err;
						var newTotalSales = res[0].total_sales + amount;
						connection.query("UPDATE departments SET ? WHERE ?", [ { total_sales: newTotalSales }, { department_name: depName }], function(err, res) {
							if (err) throw err;
						});
					});
				});

				inquirer.prompt([
					{
						name: "next",
						type: "list",
						message: "What would you like to do next?",
						choices: ["Make another purchase.", "Stop shopping."]
					}
				]).then(function(answer) {
					switch(answer.next) {
						case "Make another purchase.":
							console.log("=================================================================\n");
							prodId = [];
							printProduct();
							break;

						case "Stop shopping.":
							console.log("Thanks for shopping with us. Make sure to check out our Bamazon rewards card.");
							break;
					}
				});
			}
		});
	});
}
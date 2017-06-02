var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "Bamazon"
});

connection.connect(function(err) {
	if (err) throw err;
	supervisor();
});

function supervisor() {
	inquirer.prompt([
		{
			name: "choice",
			type: "list",
			message: "What would you like to do?",
			choices: ["View Product Sales by Department", "Create New Department"]
		}
	]).then(function(answer) {
		switch(answer.choice) {
			case "View Product Sales by Department":
				console.log("=================================================================\n");
				viewSales();
				break;
			case "Create New Department":
				console.log("=================================================================\n");
				createDepartment();
		}
	});
}

function viewSales() {
	connection.query("SELECT * FROM departments", function(err, res) {
		if (err) throw err;

		var table = new Table({
			head: ['department_id', 'department_name', 'over_head_costs', 'total_sales', 'total_profit'],
			colWidths: [20, 20, 20, 20, 20]
		});

		for (var i = 0; i < res.length; i++) {
			table.push(
				[res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].total_sales, res[i].total_sales - res[i].over_head_costs]
			);
		}
		console.log(table.toString());
		console.log("=================================================================\n");
		supervisor();
	});
}

function createDepartment() {
	inquirer.prompt([
		{
			name: "name",
			type: "message",
			message: "What is the department name?"
		},
		{
			name: "overhead",
			type: "message",
			message: "What are the overhead costs for this department? (Do not include the dollar sign.)",
			validate: function(value) {
				if (isNaN(value) === false) {
					return true
				}
				return false
			}
		}
	]).then(function(answer) {
		connection.query("INSERT INTO departments SET ?", {
			department_name: answer.name,
			over_head_costs: parseInt(answer.overhead),
			total_sales: 0
		}, function(err, res) {
			if (err) throw err;
			supervisor();
		});
	});
}
var mysql = require("mysql");
const prompt = require("prompt");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Starbucks9",
    database: "Bamazon"
});

function connectDB() {
    connection.connect(function (err) {
        if (err) { throw err; }
        console.log("connected as id " + connection.threadId);
        //setTimeout(inquireList(), 0);
        inquireList();
        setTimeout(inquireMain(), 0);
        //inquireMain();
    });
}

function inquireMain() {
    console.log("-----------------------------------------");
    console.log("");
    //setTimeout(inquireList(), 0);
    inquirer.prompt([
        {
            type: "list",
            message: "Add new inventory:",
            choices: ["Add an item", "QUIT"],
            name: "command"
        }

    ]).then(function (user) {
        switch (user.command) {
            case "Add an item":
                console.log("\n -"+ user.command + "- ");
                inquireItem();
                break;
            case "QUIT":
                console.log("\nGoodbye!");
                process.exit(0);
        }
    });
}

function inquireItem() {
    console.log("-----------------------------------------");
    console.log("\n");
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the product name: ",
            name: "name_"
        },
        {
            type: "input",
            message: "Enter the department name: ",
            name: "department_"
        },
        {
            type: "input",
            message: "Enter the price: ",
            name: "price_"
        },
        {
            type: "input",
            message: "Enter the stock quantity: ",
            name: "quantity_"
        }

    ]).then(function (user) {

        connection.query("INSERT INTO products SET ?", {
            product_name: user.name_,
            department_name: user.department_,
            price: user.price_,
            stock_quantity: user.quantity_
        }, function (err, res) { });
        inquireList();
        //inquireMain();
        setTimeout(inquireMain(), 0);
    });
}

function inquireList() {
    var items = [];
    connection.query("SELECT * FROM products",
        function (err, res) {
            console.log("\n-----------------------------------------");
            console.log(" -inventory- ");
            console.log("");
            for (var i = 0; i < res.length; i++) {
                console.log(res[i].item_id + "\t" + res[i].product_name);
                //console.log("\t" );
                //console.log(res[i].product_name );
                items.push(res[i].product_name);
            }
            console.log("-----------------------------------------");
            console.log("\n");
        });

}

connectDB();
var mysql = require("mysql");
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
        inquireMain();
    });
}

// inquire user input for card type
function inquireMain() {
    inquirer.prompt([
        {
            type: "list",
            message: "Welcome to Flashcard App, Select an Option Below:",
            choices: ["POST AN ITEM", "BID ON AN ITEM", "QUIT"],
            name: "command"
        }
    ]).then(function (user) {
        switch (user.command) {
            case "POST AN ITEM":
                console.log('POST');
                inquireItem();
                break;
            case "BID ON AN ITEM":
                console.log('BID');
                inquireBid();
                break;
            case "QUIT":
                console.log("Goodbye!");
                process.exit(0);
        }
    });
}

function inquireItem() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter your item for bid: ",
            name: "item"
        },
        {
            type: "input",
            message: "Enter your item's starting bid: ",
            name: "bid"
        }
    ]).then(function (user) {

        connection.query("INSERT INTO item SET ?", {
            item_name: user.item,
            start_price: user.bid
        }, function (err, res) { });
        inquireMain();
    });
}

function inquireBid() {
    var items = [];
    connection.query("SELECT * FROM item",
        function (err, res) {
            for (var i = 0; i < res.length; i++) {
                //console.log(res[i].item_name);
                items.push(res[i].item_name);

            }
            inquirer.prompt([
                {
                    type: "list",
                    message: "Select an item to bid",
                    choices: items,
                    name: "selected"
                },
            ]).then(function (user) {
                console.log(user.selected);
            });
        });

}

connectDB();

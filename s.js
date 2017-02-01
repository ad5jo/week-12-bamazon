//db: amazon
//table: items
// name
//bid_price

const prompt = require("prompt");
const mysql = require("mysql");
const inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Starbucks9",
    database: "Bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    inquireMain();
})

var bid_on_items = () => {
    connection.query("select * from items", function(err, res) {

        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " " + res[i].name);
        }
        prompt.start();
        var bid_item = {
            name: "item",
            message: "Choose the number of the item you would like to bid on."
        }
        var item_number;
        prompt.get(bid_item, function(err, result) {
            item_number = result.item;
            console.log("Current bid: " + res[item_number - 1].bid_price);
            var bid_price = {
                name: "price",
                message: "What's your bid?"
            }
            prompt.get(bid_price, function(err, result) {
                if (result.price > res[item_number - 1].bid_price) {
                    connection.query("update items set ? where ?", [
                        { bid_price: result.price },
                        { id: item_number }
                    ], function(err, res) {
                        console.log("Bid added!");
                        inquireMain();
                    })
                } else {
                    console.log(`Bid price below current bid price of ${result.price}.`);
                }
            });
        });
    });
}


function inquireMain() {
    inquirer.prompt([{
        type: "list",
        message: "Welcome to Flashcard App, Select an Option Below:",
        choices: ["POST AN ITEM", "BID ON AN ITEM", "QUIT"],
        name: "command"
    }]).then(function(user) {
        switch (user.command) {
            case "POST AN ITEM":
                console.log('POST');
                inquireItem();
                break;
            case "BID ON AN ITEM":
                console.log('BID');
                bid_on_items();
                break;
            case "QUIT":
                console.log("Goodbye!");
                process.exit(0);
        }
    });
}

function inquireItem() {
    inquirer.prompt([{
        type: "input",
        message: "Enter your item for bid: ",
        name: "item"
    }, {
        type: "input",
        message: "Enter your item's starting bid: ",
        name: "bid"
    }]).then(function(user) {

        connection.query("INSERT INTO items SET ?", {
            name: user.item,
            bid_price: user.bid
        }, function(err, res) {});
        inquireMain();
    });
}

var make_user_login = () => {
	var username;
	var password;

	var login = {
		name: "username",
		message: "What's your username?"
	}
	prompt.get(login, function(err, result){
		username = result.username;
		var password_input = {
			name: "password",
			message: "What's your password?"
		}

		prompt.get(password_input, function(err, result){
			password = result.password;
			connection.query("insert into users set?", {
				username: username,
				p_word: password
			});
		})
	})
}


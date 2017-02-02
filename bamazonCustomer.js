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
        inquireMain();
    });
}

// inquire user input for card type
function inquireMain() {
    inquirer.prompt([
        {
            type: "list",
            message: "Welcome to BAMazon:",
            choices: ["List items","Purchase", "QUIT"],
            name: "command"
        }
    ]).then(function (user) {
        switch (user.command) {
            case "List items":
                console.log(' -list items- ');
                inquireList();
                break;
            case "Purchase":
                console.log(' -Purchase- ');
                inquire_purchase();
                break;
            case "QUIT":
                console.log("Goodbye!");
                process.exit(0);
        }
    });
}

// function inquireItem() {
//     inquirer.prompt([
//         {
//             type: "input",
//             message: "Enter your item for bid: ",
//             name: "item"
//         },
//         {
//             type: "input",
//             message: "Enter your item's starting bid: ",
//             name: "bid"
//         }
//     ]).then(function (user) {

//         connection.query("INSERT INTO item SET ?", {
//             item_name: user.item,
//             start_price: user.bid
//         }, function (err, res) { });
//         inquireMain();
//     });
// }


// UPDATE Customers
// SET City = 'Hamburg'
// WHERE CustomerID = 1;

// function inquire_purchase() {
//     connection.query("UPDATE products SET quantity = ",
//         function (err, res) {
//             for (var i = 0; i < res.length; i++) {
//                 //console.log(res[i].item_name);
//                 items.push(res[i].item_name);

//             }
//             inquirer.prompt([
//                 {
//                     type: "list",
//                     message: "Select an item to bid",
//                     choices: items,
//                     name: "selected"
//                 },
//             ]).then(function (user) {
//                 console.log(user.selected);
//             });
//         });
// }

function inquire_purchase() {
    inquirer.prompt([
        {
            type: "input",
            message: "item number",
            name: "id"
        },
        ])
        .then(function (user) {
            console.log(user.id);
            }
        );
    inquirer.prompt([
        {
            type: "input",
            message: "How many",
            name: "qty"
        },
        ])
        .then(function (user) {
            console.log(user.qty);
            }
        );

    var s_temp = "SELECT stock_quantity FROM products WHERE item_id = " + user.id;
    var s_count_query = '\"s_temp\"';
    connection.query(s_count_query,function (err, res) {
            // do somethin
            var i_temp_qty = res.stock_quantity;
            if (res.stock_quantity >= user.qty)
            {
                i_temp_qty = i_temp_qty - user.qty;
            }
            else
            {
                console.log("-----------------------------------------");
                console.log("Sorry, Can't complete you order. Not enough inventory. Try ordering fewer.");
                console.log("-----------------------------------------");
                inquireMain();
            }
        })
        .then ( // then A
            //var 
            s_temp = "UPDATE products SET stock_quantity = " + i_temp_qty;
            s_temp = s_temp + " WHERE item_id = " + user.id;
            var s_ud_query = '\"s_temp\"';
            connection.query(s_ud_query,function (err, res) {
                // do somethin
                console.log("success");
                inquireMain();
                console.log("-----------------------------------------");
                console.log("\n");
            });
        ); // then A

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

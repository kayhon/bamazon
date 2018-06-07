const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "*****",
    database: "bamazon_db"
});

const prompts = {
    productIDPrompt: {
        type: "input",
        name: "productID",
        message: "Please enter the product ID of the product you want to purchase: "
    },
    numberOfUnitsPrompt: {
        type: "input",
        name: "numberOfUnits",
        message: "Please enter the number of units you want to buy: "
    }
}

const displayProducts = function () {
    console.log('------------------');
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (error, results) {
        if (error) throw error;

        results.forEach(function (element) {
            console.log('Product ID: ' + element.item_id + '\nName: ' + element.product_name + '\nPrice($): ' + element.price + '\n');

        });

        buyProduct();
    });
}

const buyProduct = function () {
    console.log('------------------');
    inquirer.prompt([prompts.productIDPrompt, prompts.numberOfUnitsPrompt])
        .then(function (answers) {
            let query = "SELECT item_id, stock_quantity, price FROM products WHERE ?";
            connection.query(query, {
                item_id: answers.productID
            }, function (error, results) {
                if (results.length === 0) {

                    console.log('------------------');
                    console.log("\nProduct ID not found\n");
                    buyProduct();

                } else if (results.length > 0) {

                    if (answers.numberOfUnits <= results[0].stock_quantity) {
                        let totalCost = answers.numberOfUnits * results[0].price;
                        let updatedStockQuantity = results[0].stock_quantity - answers.numberOfUnits;

                        let query = connection.query(
                            "UPDATE products SET ? WHERE ?", [{
                                    stock_quantity: updatedStockQuantity
                                },
                                {
                                    item_id: answers.productID
                                }
                            ],
                            function (error, results) {
                                console.log('------------------');
                                console.log('\nSuccess!');
                                console.log('The total cost of your purchase is: $' + totalCost);
                                
                                inquirer.prompt({
                                    name: "confirm",
                                    type: "confirm", 
                                    message: "Do you want to shop again?"
                                }).then(function(answer) {
                                    if (answer.confirm) {
                                        buyProduct();
                                    } else {
                                        connection.end();
                                    }
                                });
                            }
                        );
                    } else if (answers.numberOfUnits > results[0].stock_quantity) {
                        console.log('------------------');
                        console.log('\nInsufficient stock!');
                        console.log('Only ' + results[0].stock_quantity + ' units available.');
                        console.log('Please try again.\n');
                        buyProduct();
                    }
                }
            });
        });
}

connection.connect(function (err) {
    if (err) throw err;
    displayProducts();
});
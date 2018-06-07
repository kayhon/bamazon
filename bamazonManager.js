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
    managerOptionsPrompt: {
        type: "list",
        name: "managerOptions",
        message: "Select an option: ",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
    },
    productIDPrompt: {
        type: "input",
        name: "productID",
        message: "Please enter the product ID of the product you want to stock: "
    },
    productNamePrompt: {
        type: "input",
        name: "productName",
        message: "Please enter the name of the product you want to add to stock: "
    },
    departmentNamePrompt: {
        type: "input",
        name: "departmentName",
        message: "Please enter the product's department name: "
    },
    productPricePrompt: {
        type: "input",
        name: "productPrice",
        message: "Please enter the product's price: "
    },
    numberOfUnitsPrompt: {
        type: "input",
        name: "numberOfUnits",
        message: "Please enter the number of units you want to add to stock: "
    }
};

connection.connect(function (err) {
    if (err) throw err;
    selectAnOption();
});

const selectAnOption = function () {
    console.log('------------------');
    inquirer.prompt(prompts.managerOptionsPrompt)
        .then(function (answers) {
            switch (answers.managerOptions) {
                case "View Products for Sale":
                    viewProducts();
                    break;

                case "View Low Inventory":
                    viewLowInventory();
                    break;

                case "Add to Inventory":
                    addToInventory();
                    break;

                case "Add New Product":
                    addNewProduct();
                    break;

                case "Exit":
                    exitProgram();
                    break;
            }
        });
};

const viewProducts = function () {
    console.log('------------------');
    console.log("\nSelecting all products...\n");
    connection.query("SELECT * FROM products", function (error, results) {
        if (error) throw error;

        results.forEach(function (element) {
            console.log('Product ID: ' + element.item_id + '\nName: ' + element.product_name + '\nPrice: $' + parseFloat(Math.round(element.price * 100) / 100).toFixed(2) + '\nQuantity: ' + element.stock_quantity + '\n');
        });

        selectAnOption();
    });
};

const viewLowInventory = function () {
    console.log('------------------');
    console.log("\nSearching for low inventory products...\n");
    let query = "SELECT * FROM products HAVING stock_quantity <= 5 ORDER BY item_id";
    connection.query(query, function (error, results) {

        if (results.length === 0) {

            console.log("No low inventory products.");
            selectAnOption();

        } else if (results.length > 0) {
            results.forEach(function (element) {
                console.log('Product ID: ' + element.item_id + '\nName: ' + element.product_name + '\nQuantity: ' + element.stock_quantity + '\n');
            });

            selectAnOption();
        }

    });
};


const addToInventory = function () {
    console.log('------------------');
    inquirer.prompt([prompts.productIDPrompt, prompts.numberOfUnitsPrompt])
        .then(function (answers) {
            console.log('------------------');
            console.log("\nUpdating stock quantities...\n");
            let query = "SELECT item_id, product_name, stock_quantity FROM products WHERE ?";
            connection.query(query, {
                item_id: answers.productID
            }, function (error, results) {

                if (results.length === 0) {

                    console.log("Product ID not found\n");
                    selectAnOption();

                } else if (results.length > 0) {

                    let updatedStockQuantity = parseInt(answers.numberOfUnits) + results[0].stock_quantity;
                    let productName = results[0].product_name;

                    let query = "UPDATE products SET ? WHERE ?";
                    connection.query(query, [{
                                stock_quantity: updatedStockQuantity
                            },
                            {
                                item_id: answers.productID
                            }
                        ],
                        function (error, results) {
                            console.log('Success!');
                            console.log('Updated "' + productName + '" quantity to ' + updatedStockQuantity + '\n');
                            selectAnOption();
                        });
                }
            });
        });
};

const addNewProduct = function () {
    console.log('------------------');
    inquirer.prompt([prompts.productNamePrompt, prompts.departmentNamePrompt, prompts.productPricePrompt, prompts.numberOfUnitsPrompt]).then(function (answers) {

        let query = "SELECT * FROM products WHERE ?";
        connection.query(query, {
                product_name: answers.productName
            },
            function (error, results) {

                if (results.length > 0) {
                    console.log('------------------');
                    console.log("\nProduct already exists in inventory\n")
                    selectAnOption();

                } else if (results.length === 0) {

                    console.log('------------------');
                    console.log("\nInserting a new product...\n");
                    let query = "INSERT INTO products SET ?";
                    connection.query(query, {
                            product_name: answers.productName,
                            department_name: answers.departmentName,
                            price: answers.productPrice,
                            stock_quantity: answers.numberOfUnits
                        },
                        function (error, results) {
                            console.log('Success!');
                            console.log('"' + answers.productName + '" added to inventory\n')
                            selectAnOption();
                        });
                }
            });
    });
};

const exitProgram = function () {
    console.log('------------------');
    console.log("\nSee you next time!");
    connection.end();
};
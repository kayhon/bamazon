
# bamazon<br>
https://github.com/kayhon/bamazon/<br>
 https://kayhon.github.io/bamazon/<br>
<br>
<b>Description</b><br>
This CLI application creates an Amazon-like storefront using MySql. The app takes orders from customers as it deplete stock from the store's inventory. The app also provides a manager view with options to create products adding to the inventory. In addition, the App, as its used by the 'customer' and 'manager' updates the local mysql database in realtime.

![database-before-01-gif](https://github.com/kayhon/bamazon/blob/master/images/01.gif)<br>

<b>Customer Application</b><br>
Running this application will first display all of the items available for sale and then prompt the user for which product and how many units they would like to purchase. Once the customer has made a selection, their purchase request will be checked against the current inventory.

![Customer View Demo-02-gif](https://github.com/kayhon/bamazon/blob/master/images/02.gif)<br>
![database-before-02half-gif](https://github.com/kayhon/bamazon/blob/master/images/2half.jpg)<br>

<b>Manager Application</b><br>
Running the bamazonManager.js will display a list of menu options for the user to view products for sale, view low inventory, add to inventory or add a new product.

![Manager View Demo-03gif](https://github.com/kayhon/bamazon/blob/master/images/03.gif)<br>
![database-after-03half-gif](https://github.com/kayhon/bamazon/blob/master/images/3half.jpg)<br>
![Manager-add-product-04-gif](https://github.com/kayhon/bamazon/blob/master/images/04.gif)<br>
![database-after-05-gif](https://github.com/kayhon/bamazon/blob/master/images/05.gif)<br>

<b>Setup Instructions</b><br>
The JavaScript files reference a MySql database called Bamazon, hosted locally on my computer. To create a similar database on your machine, please reference the schema.sql file to see how the database was created.<br>

<b>Run CLI Instructions</b><br>
Clone repo<br>
npm install<br>
node bamazonCustomer.js for customer interface <br>
node bamazonManager.js for manager interface<br>


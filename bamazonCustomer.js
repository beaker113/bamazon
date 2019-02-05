var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "root",
    port: 3306,
    database: 'bamazon'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("conected")
});

connection.query("SELECT * FROM PRODUCTS", function (err, rows, fields) {
    console.log(rows)
})
inquirer
    .prompt([{
        type: "input",
        name: "id",
        message: "what is the ID of the product you would like to buy?"

    },
    {
        type: "input",
        name: "quantity",
        message: "what is the quantity you would like to purchase?"
    }])
    .then(function (answers) {
        connection.query("SELECT * FROM products WHERE ID = " + answers.id, function (err, res) {
            if (err) throw err;
            console.log(res)
        });
        var product = answers.id
        var amount = Number(answers.quantity)
        connection.query("SELECT quantity FROM products WHERE ID = " + product, function (err, res) {
            if (err) throw err;
            var quantity = Number(res);
            
             if(quantity > amount)
         {
            connection.query(
                'UPDATE products SET quantity = ' + (quantity - amount) + 'Where ID = ' + product,
                // [(Number("quantity") - amount), product],
                function (err, result) {
                    if (err) throw err;
                    

                    console.log(`Changed ${result.changedRows} row(s)`);
                    console.log(result)
                }

            );
        }
        if (amount > quantity) { console.log("Sorry, we do not have that amount in stock") }
    })

    })

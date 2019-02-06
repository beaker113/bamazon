var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "root",
    port: 3306,
    database: 'bamazon',
    multipleStatements: true
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
        console.log(amount)
        connection.query("SELECT quantity FROM products WHERE ID = " + product, function (err, rows) {
            if (err) throw err;
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                ;
                var number = row.quantity
            }
            // var number = rows[0].quantity;
            // console.log(number)
            
             if(number > amount)
         {
            connection.query(
                'UPDATE products SET quantity = ? Where ID = ?', [(number - amount), product],
                
                // [(Number("quantity") - amount), product],
                function (err, result) {
                    if (err) throw err;
                    

                    // console.log(`Changed ${result.changedRows} row(s)`);
                    console.log(result)
                    // for (var i = 0; i < result.length; i++) {
                    //     var out = result[i];
                    //     ;
                    //     var final = out.price
                     //cannot figure out how to nagivate object
                     connection.query('SELECT price FROM products WHERE ID = ' + product, function(err, r) {
                        if (err) throw err;
                        console.log("you owe $" + r[0].price)
                    })
                }

                
            );
            
        }
        if (amount > number) { console.log("Sorry, we do not have that amount in stock") }
    })

    })

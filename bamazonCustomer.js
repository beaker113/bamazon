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

connection.query("SELECT * FROM PRODUCTS", function(err, rows, fields) {
    console.log(rows)
})
inquirer
.prompt([{
    name:"id",
    message:"what is the ID of the product you would like to buy?"
},
{
    name:"quantity",
    message:"what is the quantity you would like to purchase?"
}])
.then(function( answers) {
    connection.query("SELECT * FROM PRODUCTS WHERE ID =" + answers.id, function(err, res) {
        if (err) throw err;
        console.log(res)
    });
    connection.query(
        'UPDATE products SET quantity = ? Where ID = ?',
        [Number("quantity") - Number(answers.quantity), answers.id],
        function(err, result)  {
            if (err) throw err;
        
            console.log(`Changed ${result.changedRows} row(s)`);
          }

        );
})

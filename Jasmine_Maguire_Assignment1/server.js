// Function to test if a string is a non-negative integer
// From Lab 12
function isNonNegInt(q, returnErrors = false) {
    errors = []; // assume no errors at first
    if (Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if (q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if (parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
    return returnErrors ? errors : (errors.length == 0);
}

//From Lab 13
var express = require('express'); // create 'express' variable to use express
var app = express(); // create 'app' of express module
var myParser = require("body-parser"); // get parser from node.js
var fs = require('fs'); // require file system from node
var data = require('./public/products_data.js'); // data from products_data.js
var products = data.products; // 

app.use(myParser.urlencoded({ extended: true }));


// Initialize Express
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});

app.use(myParser.urlencoded({ extended: true }));
// Set up the path and handler for POST requests
app.post("/process_form", function (request, response,next) {
    let POST = request.body;
    // response.send(POS)
    process_quantity_form(POST, response);

});

// Look for files in the "public" folder and listen on port 8080
app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));
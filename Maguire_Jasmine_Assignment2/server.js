//*Jasmine Maguire
//*From Lab13
//*From Lab14

// So it'll load querystring// 
const queryString = require('query-string'); //to load query string
var express = require('express'); //create 'express' variable to use express
var app = express(); //create 'app' of express module
var myParser = require("body-parser"); // get parser from node.js
var fs = require('fs'); // require file system from node
var data = require("./public/products_data.js"); //include data from products_data.js
var products = data.products;
var filename = 'userdata.json' //defines array as object

//From Lab 11
if (fs.existsSync(filename)) { //Only open the file if it exists 
    stats = fs.statSync(filename) //gets stats from file
    console.log(filename + 'has' + stats.size + 'characters');
    data = fs.readFileSync(filename, 'utf-8'); //read the file synchronously until the file comes back
    users_reg_data = JSON.parse(data); //Load users_reg_data from userdata.json
} else { 
    console.log(filename + 'does not exist!'); //filename does not exist
}


//From Lab13 
app.all('*', function (request, response, next) { //Sends type of request and the path of request in response
    console.log(request.method + ' to ' + request.path);
    next();
});
app.use(myParser.urlencoded({ extended: true })); //get data in the body

//From Assignment 1 Example
//Send to invoice if no errors, otherwise send message
app.post("/process_purchase", function (request, response) { 
    let POST = request.body; 
    console.log(POST);
    if (typeof POST['purchase_submit'] != 'undefined') {
        var hasvalidquantities=true; // create a varibale assuming to be true
        var hasquantities=false; // create a varibale assuming to be false
        for (i = 0; i < products.length; i++) {
                qty = POST[`quantity${i}`]; //set qty to the value in quantity_textbox
                hasquantities = hasquantities || qty > 0; // Check for quantities 
                hasvalidquantities = hasvalidquantities && isNonNegInt(qty);    // Check for valid quantities
        } 
        // if all quantities are valid, send to invoice// 
        const stringified = queryString.stringify(POST);
        if (hasvalidquantities && hasquantities) {
            response.redirect("./login.html?"+stringified);  //all good to go! send to invoice
        }  
        else {
            response.send('Please enter a valid quantity')
        } 
    }
});

//From Lab 13
//Server-side processing
app.post("/process_login", function (request, response) {
    var LogError = [];
    console.log(request.query);
    the_username = request.body.username.toLowerCase(); //makes username case insensitive
    if (typeof users_reg_data[the_username] != 'undefined') { //check if username actually exists
        if (users_reg_data[the_username].password == request.body.password) {
            request.query.username = the_username;
            console.log(users_reg_data[request.query.username].name);
            request.query.name = users_reg_data[request.query.username].name;
            response.redirect('/invoice.html?' + queryString.stringify(request.query));
            return;
            //if all good redirect to invoice//
        } else {
            LogError.push = ('Invalid Password'); //Password does not exist/is wrong
            console.log(LogError);
            request.query.username= the_username;
            request.query.name= users_reg_data[the_username].name;
            request.query.LogError=LogError.join(';');
        }
    } else {
        LogError.push = ('Invalid Username'); //Username does not exist
        console.log(LogError);
        request.query.username= the_username;
        request.query.LogError=LogError.join(';');
    }
    response.redirect('./login.html?' + queryString.stringify(request.query));
});

//From Lab 13
//Server-side processing
app.post("/process_register", function (request, response) {
    qstr = request.body;
    console.log(qstr);
    var errors = [];

    //fullname validation
    if ((/[a-zA-Z]+[ ]+[a-zA-Z]+/).test(request.body.name) == false) {
        errors.push('Use letters only! Please leave a space between first and last name.'); //Check if there are numbers or other symbols and make sure there is a space
    }

    if (request.body.name =="") {
        errors.push('Invalid Full Name')
    }

    if ((fullname.length > 30) == true) {
        errors.push('Full name too long - 30 characters max"'); //Check if name is more than 30 characers
    }

    //username validation
    var reguser = request.body.username.toLowerCase(); //makes username case insensitive
    if (typeof users_reg_data[reguser] != 'undefined') { //Check if username already exists
        errors.push('Username is Already in Use.')
    }

    if ((/[a-z0-9]+/).test(request.body.username) == false) {
        errors.push('Numbers and Letters only'); //Check if there are other symbols
    }

    //password validation
    if ((request.body.password.length < 6 == true)) {
      errors.push('Password Too Short - 6 characters minimum'); //Check if password is too short
    }

    // check to see if passwords match
    if (request.body.password !== request.body.repeat_password) { 
      errors.push('Passwords Do Not Match') //Check if passwords match
    }

    if (errors.length == 0) {
       console.log('none');
       request.query.username = reguser; //Input username into JSON file array
       request.query.name = request.body.name; //Input fullname in array
       request.query.password = request.body.password; //Input password in array
       fs.writeFileSync(filename, JSON.stringify(users_reg_data)); //Write it out in the JSON file to store data
       response.redirect('/invoice.html?' + queryString.stringify(request.query)); //send to invoice if all good
    }
    if (errors.length > 0) {
        console.log(errors)
        request.query.name = request.body.name;
        request.query.username = request.body.username;
        request.query.password = request.body.password;
        request.query.repeat_password = request.body.repeat_password;
        request.query.email = request.body.email;
        request.query.errors = errors.join(';');
        response.redirect('registration.html?' + queryString.stringify(request.query));
    }
});

//From Lab 13
//Function to test if a string is a non-negative integer
function isNonNegInt(q, returnErrors = false) {
    errors = []; // assume that quantity data is valid 
    if (q == "") { q = 0; }
    if (Number(q) != q) errors.push('Not a number!'); //check if value is a number
    if (q < 0) errors.push('Negative value!'); //check if value is a positive number
    if (parseInt(q) != q) errors.push('Not an integer!'); //check if value is a whole number
    return returnErrors ? errors : (errors.length == 0);
}

//Lab 13
//Look for files in the "public" folder and listen on port 8080
app.use(express.static('./public')); //Creates a static server using express from the public folder
app.listen(8080, () => console.log(`listening on port 8080`))

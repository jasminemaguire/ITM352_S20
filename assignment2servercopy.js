const querystring = require('querystring'); //to load query string

var express = require('express'); //create 'express' variable to use express
var app = express(); //create 'app' of express module
var myParser = require("body-parser"); // get parser from node.js
var fs = require('fs'); // require file system from node
var data = require("./public/products_data.js"); //include data from products_data.js
var products = data.products;
var filename = 'userdata.json' //defines array as object
var qs = require('querystring'); //need querystring in order to initiate functions
var purchase_data = {}; //variable that requests the query string of product quantity

//From Lab 11
if (fs.existsSync(filename)) { //Only open the file if it exists 
    stats = fs.statSync(filename); 
    console.log(filename + 'has' + stats.size + 'characters');
    data = fs.readFileSync(filename, 'utf-8'); //read the file synchronously until the file comes back
    users_reg_data = JSON.parse(data); //Load users_reg_data from userdata.json
    console.log(users_reg_data);
}
else {
    console.log(filename + 'does not exist!'); //filename does not exist
}


//From Lab13 
app.all('*', function (request, response, next) { //Sends type of request and the path of request in response
    console.log(request.method + ' to ' + request.path);
    next();
});
app.use(myParser.urlencoded({ extended: true }));


//From Assignment 1 Example
//Send to invoice if no errors, otherwise send back to products page

app.post("/process_purchase", function (request, response) {
    purchase_data = request.query; // save for later
    //check if quantity data is valid
    params = request.query;
    console.log(params);
    if (typeof params['purchase_submit'] != 'undefined') {
        ExistErrors = false; // assume quantities are valid
        total_qty = 0; // need to check if something was selected so we will look if the total > 0
        for (i = 0; i < products.length; i++) {
            qty = POST[`quantity${i}`]; //set qty to the value in quantity_textbox

            if (typeof params[`quantity${i}`] != 'undefined') { //If all quantities are not undefined
                a_qty = params[`quantity${i}`]; //variable qty stores quantities 
                total_qty += qty; //Add the total quantity
                if (!isNonNegInt(qty)) {
                    ExistErrors = true; // change to errors exist
                }
            }
        }
        console.log(ExistErrors, total_qty);
        //request to look at query list/data
        qstr = querystring.stringify(request.query);
        // Now respond to errors or redirect to login if all is ok
        if (ExistErrors || total_qty == 0) {  //send back to products page if data is invalid
            qstr = querystring.stringify(request.query);
            response.redirect("index.html?" + qstr);
        } else { //all good to go! send to invoice
            response.redirect("login.html?" + qstr);
        }
    }
});
    



//From Lab 13
//Server-side processing
app.post("/login.html", function (request, response) {
    var LogError = [];
    console.log(purchase_data);
    the_username = request.body.username;
    the_username = request.body.username.toLowerCase(); //makes username case insensitive
    console.log(the_username, "Username is", typeof (users_reg_data[the_username]));
    //validate login data
    if (typeof users_reg_data[the_username] != 'undefined') { //check if username actually exists
        if (users_reg_data[the_username].password == request.body.password) {
            purchase_data.username = the_username;
            console.log(users_reg_data[purchase_data.username].name);
            purchase_data.name = users_reg_data[purchase_data.username].name;
            response.redirect('/invoice.html?' + queryString.stringify(purchase_data));
        } else {
            LogError.push = "Invalid Password"; //Password does not exist/is wrong
            console.log(LogError);
            purchase_data.username= the_username;
            purchase_data.name= users_reg_data[the_username].name;
            purchase_data.LogError=LogError.join(';');
        }
    }
    else {
        LogError.push = "Invalid Username"; //Username does not exist
        console.log(LogError);
        purchase_data.username= the_username;
        purchase_data.LogError=LogError.join(';');
    }
    response.redirect('./login.html?' + queryString.stringify(purchase_data)); //if username doesn't exist alert and return to login page
}
);


//From Lab 13
//Server-side processing
app.post("/registration.html", function (request, response) { //Process a simple registration form
    console.log(purchase_data);
    var errors = [];

    //variable for re-enter password validation
    var firstpassword = request.body.password;
    var secondpassword = request.body.repeat_password;

    username = request.body.username;
    username = request.body.username.toLowerCase(); //makes username case insensitive
    errors = {};//checks to see if username already exists

    //username validation
    if (typeof users_reg_data[username] != 'undefined') { //Check if username already exists
        errors.username_error = "Username is Already in Use.";
    }
    if ((/[a-z0-9]+/).test(request.body.username) == false) {
        errors.username_error = "Numbers and Letters only"; //Check if there are other symbols
    }
    if ((username.length > 15 == true)) {
        errors.username_error = "Username is too long - 15 characters max"; //Check if too many characters
    }
    if ((username.length < 4) == true) {
        errors.username_error = "Username is too short - 4 characters minimmum"; //Check if too few characters
    }


    fullname = request.body.fullname;//save new user
    //fullname validation
    if ((/[a-zA-Z]+[ ]+[a-zA-Z]+/).test(request.body.fullname) == false) {
        errors.fullname_error = "Use letters only! Please leave a space between first and last name."; //Check if there are numbers or other symbols and make sure there is a space
    }

    if ((fullname.length > 35) == true) {
        errors.fullname_error = "Please make your full name shorter - 35 characters max"; //Check if name is more than 35 characers
    }

    password = request.body.password;
    //password validation
    if ((password.length < 6) == true) {
        errors.password_error = "Password is too short - 6 characters minimmum"; //Check if password is too short
    }

    email = request.body.email;
    //email validation
    if ((/[a-z0-9._]+@[a-z0-9]+\.[a-z]+/).test(request.body.email) == false) {
        errors.email_error = "Please enter a valid email address"; //Check if email addess is valid
    }

    console.log(errors, users_reg_data);
    //if there are 0 errors and repeat_password is equal to password, request all registration info
    if ((Object.keys(errors).length == 0) & (firstpassword == secondpassword)) {
        users_reg_data[username] = {};
        users_reg_data[username].username = request.body.username //Input username into JSON file array
        users_reg_data[username].password = request.body.password; //Input password in array
        users_reg_data[username].email = request.body.email; //Input email in array
        users_reg_data[username].fullname = request.body.fullname; //Input fullname in array

        fs.writeFileSync(filename, JSON.stringify(users_reg_data)); //Write it out in the JSON file to store data
        theQuantQuerystring = qs.stringify(purchase_data); //make string
        response.redirect("/invoice.html?" + theQuantQuerystring + `&username=${username}`); //send to invoice if all good
    } else {
        qstring = qs.stringify(request.body) + "&" + qs.stringify(errors); //make errores query string
        response.redirect('/registration.html?' + qstring); //redirect to registration page if there are errors
    }
});

//From Lab 13
//Function to test if a string is a non-negative integer
function isNonNegInt(q, returnErrors = false) {
    errors = []; // assume no errors at first
    if (Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if (q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if (parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
    return returnErrors ? errors : (errors.length == 0);
}

//Lab 13
//Server-side processing
//Look for files in the "public" folder and listen on port 8080
app.use(express.static('./public')); //Creates a static server using express from the public folder
app.listen(8080, () => console.log(`listening on port 8080`));

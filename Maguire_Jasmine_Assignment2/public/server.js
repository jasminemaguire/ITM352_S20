var fs = require('fs'); //require file system from node
var express = require('express'); //use the express module from node.js
var app = express(); //create an object of the express module
var myParser = require('body-parser'); //get parser from node
var data = require('./public/products.js'); //include data from products.js
var products = data.products; // Products is defined as the data from product_data.js
var qs = require('querystring'); 


app.use(myParser.urlencoded({ extended: true }));

var purchase_data; // make a global variable to holf the product selections until we get to invoice 


// Function to test if a string is a non-negative integer
function isNonNegInt(q, returnErrors = false) {
    errors = []; // assume no errors at first
    if (Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if (q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if (parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
    return returnErrors ? errors : (errors.length == 0);

}

// Borrowed from Lab13 
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});

//Borrowed and adapted from the assignment examples
app.get('/purchase', function (req, res, next) {
    purchase_data = req.query; // save for later
    if (typeof req.query['purchase_submit'] != 'undefined') {
        console.log(Date.now() + ': Purchase made from ip ' + req.ip + ' data: ' + JSON.stringify(req.query));

        purchase_data = req.query; // get the query string data which has the form data
        // form was submitted so check that quantities are valid then redirect to invoice if ok.

        ExistErrors = false; // clean slate with the assumption everything is right
        total_quantity = 0; // need to check if something was selected so we will look if the total > 0
        for (i = 0; i < products.length; i++) {
            if (purchase_data[`quantity${i}`] != 'undefined') { //If all quantities are not undefined
                arrayquantity = purchase_data[`quantity${i}`]; //variable array quantity stores all the quantities 
                total_quantity += arrayquantity; //Add the total quantity
                if (!isNonNegInt(arrayquantity)) { //check if any quantities are valid
                    ExistErrors = true; // change the clean slate to errors existing
                }
            }
        }
        // Now respond to errors or redirect to login if all is ok
        if (ExistErrors || total_quantity == 0) {
            res.redirect('Products.display.html?' + qs.stringify(purchase_data));
        } else { // all good to go!
            res.redirect('./login.html');
        }

    }
});

// Assignment 2
var filename = "user_data.json"; // Set variable filename to reference user_data.json


if (fs.existsSync(filename)) { //Only open the file if it exists 
    var raw_data = fs.readFileSync(filename, 'utf-8');
    var users_reg_data = JSON.parse(raw_data);
    console.log(users_reg_data);
    fstats = fs.statSync(filename);
    console.log(filename + "has " + fstats.size + " character");
}
else {
    console.log( filename + 'doesnt exist!');
}
app.post("/login", function (request, response) {
    loginData = request.body;
    //console.log(loginData);
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    the_username = loginData.username;
    the_password = loginData.password;
    //console.log(the_username)
    //console.log(the_password)
    if (typeof users_reg_data[the_username] != 'undefined') { //check if the username exists in the json data
        if (users_reg_data[the_username].password == the_password)
            response.redirect('/invoice.html?' + qs.stringify(purchase_data)); //Everything is awesome and send them to invoice along with the purchase data
    } else {
        response.redirect('./login.html'); //There is a valid error, redirect back to page
    }
}
);

//Added from Lab14
app.post("/register", function (request, response) {
    regData = request.body; //registration data is set as variable
    console.log("Got the registration request"); //CLets admin know grabbing the registration data was a success
    console.log(request.body); //Lets admin see what was inputted in all the fields
    // process a simple register form

    validerrors = false;

    username_input = regData.username.toLowerCase(); //Makes it not case sensitive, I think that's right
    password_input = regData.password; //Just setting the rest of the variables to make it easier for me to reference
    REpassword_input = regData.repeat_password;
    email_input = regData.email;

    //The validation was copied and pasted from my registration.html with a couple adjustments (I worked on the html file first) 

    //Validate username <!-- https://www.roseindia.net/javascript/AlphanumericValidationinJavaScript.shtml -->
    var letters = /^[0-9a-zA-Z]+$/; //Defining only letters and numbers

    if (typeof users_reg_data[username_input] != 'undefined') { //See if there is a username matching the username input. 
        validerrors = true
    };
    if (username_input.length < 1 && username_input.length > -1) { //See if the userame input is empty, same from the registration.html 
        validerrors = true
    };
    if (username_input.length > 0 && username_input.length < 4) { //See if the userame input has more characters than 4, same from the registration.html
        validerrors = true //prevents shorts passwords
    };
    if (username_input.length > 15) { //See if the username input has less characters than 15
        validerrors = true //prevents too long of a username
    };
    if (username_input.match(letters)) { }      //check if username input is only alphanumeric, if true: do nothing --> else: valid error
    else {                                      //found this .match method recommendation from a forum and adapted from w3 schools
        validerrors = true
    };

    //Validate Password

    if (password_input.length < 1 && password_input.length > -1) { //Same as above. Check if empty
        validerrors = true
    };
    if (password_input.length > 0 && password_input.length < 5) { //Similar to above. Check if too short
        validerrors = true
    };

    //Validate Re-Entered Password

    if (REpassword_input.length < 1 && REpassword_input.length > -1) { //Same as above. Check if empty
        validerrors = true
    };
    if (password_input != REpassword_input) { //Check whether or not the repeated password input is the same as the first password input
        validerrors = true
    };

    //Validate Email
    //<!-- https://html5-tutorial.net/form-validation/validating-email/ -->
    var email_letters = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; //Setting a variable so it will be easier for me

    if (email_input.length < 1 && email_input.length > -1) { //Same as above. Check if empty
        validerrors = true
    };

    if (email_input.match(email_letters)) { } //Similar concept as above, this time checking if the pattern matches a valid email
    else { validerrors = true };

    username_input = regData.username; //Username input is defined from the body

    if (validerrors == false) {
        users_reg_data[username_input] = {}; //Set username input into the JSON file array
        users_reg_data[username_input].name = username_input; //In the array, make an object the name = username
        users_reg_data[username_input].password = regData.password; //In the array, make an object the password = password
        users_reg_data[username_input].email = regData.email; //In the array, make an object the email = email

        console.log(username_input) //Helps the admin see what the username is being entered

        var output_data = JSON.stringify(users_reg_data); //set variable output_daa as Stringify the users registration data
        fs.writeFileSync(filename, JSON.stringify(users_reg_data)); //Write it out in the JSON file, without this: the new data would not be in the JSON

        console.log(output_data) //See if the data was successfully and correctly added

        response.redirect('/invoice.html?' + qs.stringify(purchase_data)); //Everything is awesome and send them to invoice along with the purchase data that is being held
    }
    else {
        response.redirect('./registration.html'); //There is a valid error, redirect back to page
    }

}); // look for files in the "public" folder and listen on port 8080
app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));
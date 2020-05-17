//*Jasmine Maguire
//*From Lab11
//*From Lab13
//*From Lab14
//*From Lab15
//*From Assignment 2
//*From https://www.w3schools.com/howto/howto_css_register_form.asp
//*From https://paperform.co/blog/registration-form-in-html/ 
//*From https://www.w3schools.com/nodejs/nodejs_email.asp
//*From https://www.w3schools.com/howto/howto_css_login_form.asp

const querystring = require('querystring'); //to load query string
var express = require('express'); //create 'express' variable to use express
var app = express(); //create 'app' of express module
var myParser = require("body-parser"); //get parser from node.js 
var fs = require('fs'); //require file system from node
var products = require("./public/product_data.js"); //include data from product_data.js
var storedUsersCartArray = require("./public/product_data.js"); 
var filename = 'user_data.json';//defines array as an object

var cookieParser = require('cookie-parser'); //get cookie parser from node.js
app.use(cookieParser());

app.use(myParser.urlencoded({ extended: true })); //get data in the body

//From Lab 13
app.all('*', function (request, response, next) { //Sends type of request and the path of request in response
    console.log(request.method + ' to ' + request.path);
    next();
});

app.get('/use_session', function(request, response){ //Sends session ID
    response.send(`welcome, your session ID is ${request.session.id}`);

});


//From Lab 13
//Send to invoice if no errors, otherwise send message
app.post("/process_form", function (request, response) {
    let POST = request.body; //assigns the body into POST variable
    var hasValidQuantities = true; // create a varibale assuming quantities to be true
    var hasPurchases = false; // create a varibale assuming quantities to be false
    for (i = 0; i < storedUsersCartArray.length; i++) { 
        q = POST[`quantity${i}`]; //set qty to the value in quantity_textbox
        if (isNonNegInt(q) == false) { //if the quantity is invalid
            hasValidQuantities = false; 
        }
        if (q > 0) { //if the quantity > 0
            hasPurchases = true; //The user entered a valid quantity
        }
    }

    var qString = querystring.stringify(POST); //query string data is stored when user is redirected
    if (hasValidQuantities == true && hasPurchases == true) {//if hasValidQuantities and hasPurchases is true
        response.redirect('login.html?' + qString); //redirect the user to login.html
    }
    else {
        response.redirect("./cart.html?" + qString); //redirect the user back to cart.html
    }

});


//From Lab 11
if (fs.existsSync(filename)) { //only open the file if it exists
    stats = fs.statSync(filename); //get stats from file
    console.log(filename + ' has ' + stats.size + ' characters'); 
    data = fs.readFileSync(filename, 'utf-8');  //read the file synchronously until the file comes back
    users_reg_data = JSON.parse(data); //Load users_reg_data from user_data.json
    console.log(users_reg_data); 
} else {
    console.log(filename + ' does not exist'); //filename does not exist
}

//From Lab 13
//Server-side processing
//Source: https://www.w3schools.com/howto/howto_css_login_form.asp
app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    console.log(request.body);
    var qString = querystring.stringify(request.query); //string query together
    inputUser = request.body.username;
    inputPass = request.body.password;
    the_username = request.body.username.toLowerCase(); //makes username case insensitive
    var error = null;
    var stickInput = null;
    if (typeof users_reg_data[the_username] != 'undefined') { //check if username actually exists
        if (users_reg_data[the_username].password == request.body.password) {
            //assigns the username, email and fullname into variables
            loginFullname = users_reg_data[the_username].name;
            loginEmail = users_reg_data[the_username].email;
            loginUserName = request.body.username;
            //retrieve variable values and puts it into query
            request.query.stickFullname = loginFullname;
            request.query.stickEmail = loginEmail;
            request.query.stickUsername = loginUserName;
            //strings query together
            qString = querystring.stringify(request.query);
            response.redirect("./invoice.html?" + qString); //redirects user to invoice.html

            
            //Source: https://www.w3schools.com/nodejs/nodejs_email.asp
            var nodemailer = require('nodemailer'); //requires nodemailer from node 
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: { //From my email
                    user: 'jasminemaguire@gmail.com', 
                    pass: 'jasminebonsai' 
                }
            });

            var mailOptions = {
                from: 'jasminemaguire@gmail.com',
                to: loginEmail, //send to email entered by user
                subject: 'Thank you,' + loginFullname + ', for your purchase!', 
                text: 'Enjoy your new tree!'
            };

            transporter.sendMail(mailOptions, function (error1, info) { //if failed to send or there are errors
                if (error1) {
                    console.log(error1);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            
        //if the password doesn't match
        } else if (users_reg_data[the_username].password != request.body.password) {
            error = '<font color="red">Incorrect Password</font>'; //error will display on page
            stickInput = inputUser; 
        }

        //username is not registered
    } else {
        error = the_username +"<style=word-spacing: 5px>: </style>" + "<font color='red'>is not registered</font>";
        stickInput = inputUser; 
        request.query.LoginError = error;  //retrieve variable values and put into query
        request.query.logStickInput = stickInput;
        qString = querystring.stringify(request.query); //string query together 
        response.redirect("./login.html?" + qString); //redirect back to login.html
    }


});


//From Lab 13
//Server-side processing
//Source: https://www.w3schools.com/howto/howto_css_register_form.asp
//Source: https://paperform.co/blog/registration-form-in-html/ 
app.post("/register", function (request, response) {
    var qString = querystring.stringify(request.query);
    //assigns the inputs of the user into variables
    regInputUser = request.body.username.toLowerCase(); //makes username case insensitive
    regInputFullname = request.body.fullname;
    regInputPassword = request.body.password;
    regInputRepPassword = request.body.repeat_password;
    regInputEmail = request.body.email;
    email = request.body.email.toLowerCase(); //makes email case insensitive

    //fullname validation
    if (regInputFullname.length > 30){ //Check if name is more than 30 characers
        fullnameErrorReg = '<font color="red">Full name too long - 30 characters max</font>'; 
        regIncorrectFullName = regInputFullname; 
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    } else if (!(/^[A-Za-z ]+$/.test(regInputFullname))) { //Check if there are numbers or other symbols 
        fullnameErrorReg = '<font color="red">Use letters only!</font>'; 
        regIncorrectFullName = regInputFullname;
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    } else { //there are no errors
        fullnameErrorReg = ''; //no errors are stored in the variable
        regIncorrectFullName = regInputFullname; 
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    }

    //password validation
    if (regInputPassword.length < 6) { //Check if password is too short
        passwordErrorReg = '<font color="red">Password too short - 6 characters minimum</font>';
        regIncorrectFullName = regInputFullname; 
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    } else if (regInputRepPassword != regInputPassword) { //Check if passwords match
        passwordErrorReg = '<font color="red">Passwords do not match</font>'; 
        regIncorrectFullName = regInputFullname;
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    } else { //there are no errors
        passwordErrorReg = ''; //no errors are stored in the variable
        regIncorrectFullName = regInputFullname; 
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    }

    //username valdation
    if (typeof users_reg_data[regInputUser] != 'undefined') { //Check if username already exists
        usernameErrorReg = '<font color="red">Username is already in use</font>'; 
        regIncorrectFullName = regInputFullname; 
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    } else if (!(/^[a-zA-Z0-9]+$/.test(regInputUser))) { //Check if there are other symbols
        usernameErrorReg = '<font color="red">Username must be characters and numbers only</font>'; 
        regIncorrectFullName = regInputFullname; 
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    } else if (regInputUser.length > 10) { //Check if username is too long
        usernameErrorReg = useLong = '<font color="red">Username must be 10 characters or less</font>'; 
        regIncorrectFullName = regInputFullname;
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    } else if (regInputUser.length < 4) { //Check if username is too short
        usernameErrorReg = '<font color="red">Username must be at least 4 characters long</font>';
        regIncorrectFullName = regInputFullname; 
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    } else { //there are no errors
        usernameErrorReg = ''; //no errors are stored in the variable
        regIncorrectFullName = regInputFullname; 
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    }

    if (!(/^[a-zA-Z0-9._]+@[a-zA-Z.]+\.[a-zA-Z]{2,3}$/.test(regInputEmail))) { // follows X@Y.Z format; address which can only contain letters, numbers, and the characters “_” and “.”; Y is the host machine which can contain only letters and numbers and “.” characters; Z is the domain name which is either 2 or 3 letters such as “edu” or “tv”
        emailErrorReg = '<font color="red">Please enter a valid email address</font>'; 
        regIncorrectFullName = regInputFullname; 
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    } else { //there are no errors
        emailErrorReg = ''; //no errors are stored in the variable
        regIncorrectFullName = regInputFullname;
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    }

    //user info is stored in users_reg_data
    if (fullnameErrorReg == '' && passwordErrorReg == '' && usernameErrorReg == '' && emailErrorReg == '') {
        users_reg_data[regInputUser] = {}; 
        users_reg_data[regInputUser].name = request.body.fullname; 
        users_reg_data[regInputUser].password = request.body.password; 
        users_reg_data[regInputUser].email = request.body.email; 
        fs.writeFileSync(filename, JSON.stringify(users_reg_data)); //strings data into JSON for users_reg_data

        //retrieve variables and puts them into query
        request.query.stickFullname = regInputFullname;
        request.query.stickEmail = regInputEmail;
        request.query.stickUsername = regInputUser;
        qString = querystring.stringify(request.query); //string query together
        response.redirect("./invoice.html?" + qString); //redirect user to invoice.html


        //send user an email
        //Source: https://www.w3schools.com/nodejs/nodejs_email.asp
        var nodemailer = require('nodemailer'); //requires nodemailer from node
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { //From my email
                user: 'jasminemaguire@gmail.com', 
                pass: 'jasminebonsai' 
            }
        });

        var mailOptions = {
            from: 'jasminemaguire@gmail.com',
            to: regInputEmail, //send to email entered by user
            subject: 'Thank you, ' + regInputFullname + ' for your purchase!',
            text: 'Enjoy your new tree!'
        };

        transporter.sendMail(mailOptions, function (error, info) { //if failed to send or there are errors
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        console.log(request.body);
    }
    //retrieve variables and puts them into query; for displaying errors on page
    request.query.RegFullnameError = fullnameErrorReg;
    request.query.RegPasswordError = passwordErrorReg;
    request.query.RegUsernameError = usernameErrorReg;
    request.query.RegEmailError = emailErrorReg;
    //retrieve variables and puts them into query; for sticking user input
    request.query.stickRegFullname = regIncorrectFullName;
    request.query.stickUsername = regIncorrectUsername;
    request.query.stickEmail = regIncorrectEmail;
    qString = querystring.stringify(request.query); //string query together
    response.redirect("./registration.html?" + qString); //redirect user to registration.html
});


//From Lab 13
//Function to test if string is a non-negative integer
function isNonNegInt(q, returnErrors = false) {
    errors = []; // assume no errors at first
    if (q == '') { q = 0 }; 
    if (Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if (q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if (parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
    return returnErrors ? errors : (errors.length == 0); //return errors if there are errors 
}

//From Lab 13
//Look for files in the "public" folder and listen on port 8080
app.use(express.static('./public')); //Creates a static server using express from the public folder
app.listen(8080, () => console.log(`listening on port 8080`)); //printed into console

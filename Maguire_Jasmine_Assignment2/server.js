//*Jasmine Maguire
//*From Lab13
//*From Lab14

const querystring = require('querystring');

var express = require('express'); //create 'express' variable to use express
var app = express(); //create 'app' of express module
var myParser = require("body-parser"); // get parser from node.js
var fs = require('fs'); // require file system from node
var products = require("./public/product_data.js"); //include data from products_data.js
var filename = 'userdata.json' //defines array as object
var qs = require('querystring');
var qstr = {};
var quantity = {};

app.use(myParser.urlencoded({ extended: true }));

//go to invoice if quantity values accepted, if not, redirect back to order page 
app.get("/process_page", function (request, response) {
    //check for valid quantities
    //look up request.query
    quantity = request.query;
    params = request.query;
    console.log(params);
    if (typeof params['purchase_submit'] != 'undefined') {
        has_errors = false; // assume no errors
        total_qty = 0; // check total > 0
        for (i = 0; i < products.length; i++) {
            if (typeof params[`quantity${i}`] != 'undefined') {
                a_qty = params[`quantity${i}`];
                total_qty += a_qty;
                if (!isNonNegInt(a_qty)) {
                    has_errors = true;
                }
            }
        }
        qstr = querystring.stringify(request.query);

        if (has_errors || total_qty == 0) {
            //redirect to products page if quantity data is invalid
            qstr = querystring.stringify(request.query);
            response.redirect("index.html?" + qstr);
        } else { //quantity data is ok for invoice
            response.redirect("login.html?" + qstr);
        }
    }
});


//if quantity data valid, send to the invoice

function isNonNegInt(q, returnErrors = false) {
    errors = []; // assume that quantity data is valid 
    if (q == "") { q = 0; }
    if (Number(q) != q) errors.push('Not a number!'); //check if value is a number
    if (q < 0) errors.push('Negative value!'); //check if value is a positive number
    if (parseInt(q) != q) errors.push('Not an integer!'); //check if value is a whole number
    return returnErrors ? errors : (errors.length == 0);
}

//only open file if it exists
if (fs.existsSync(filename)) {
    stats = fs.statSync(filename) //gets stats from file

    data = fs.readFileSync(filename, 'UTF-8');
    console.log(typeof data);
    users_reg_data = JSON.parse(data);
}


//go to login page
app.get("/login.html", function (request, response) {
    str = `
    <html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Login</title>
    <link href="products_style.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Gotu" rel="stylesheet">
</head>

<body>
    <div class="login-box">
        <form name="basic_login" method="POST" action="/login">
            <div class="textbox">
                <input type="text" id="username_input" name="username" size="40" placeholder="username"><br />
            </div>
            <div class="textbox">
                <input type="password" name="password" size="40" placeholder="password"><br />
            </div>
            <div class=submit_button>
                <input type="submit" value="Login" id="submit_login">
            </div>
            <p class="message">Not a user? <a href='./registration.html'>Register</a></p>
        </form>
    </div>
</body>

</html>
       
`;
    response.send(str);

});

app.post("/login.html", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    console.log(quantity);
    the_username = request.body.username;
    console.log(the_username, "Username is", typeof (users_reg_data[the_username]));
    //validate login data
    if (typeof users_reg_data[the_username] != 'undefined') {
        //To check if the username exists in the json data
        if (users_reg_data[the_username].password == request.body.password) {
            theQuantQuerystring = qs.stringify(quantity);
            response.redirect('/cart_page.html?' + theQuantQuerystring + `&username=${the_username}`);

        } else {
            response.redirect('./login.html?')

        }
    }
});

app.get("/registration.html", function (request, response) {
    // Give a simple register form

    str = `
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Customer Registration</title>
        <link href = "products_style.css" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Gotu" rel="stylesheet">
        <script>src ="server.js"</script>
    </head>
    <script>
            var password = document.getElementById("password") //make password an object
            var repeat_password = document.getElementById("repeat_password"); //make repeat password an object
           
            //make sure passwords are equal
            function validatePassword(){
              if(password.value != repeat_password.value) { //passwords dont match
                alert("Passwords do not match");
            response.redirect('public/registration.html') 
              } 
            else{ 
                response.redirect('Login_Successful') //passwords match and login is successful
            }
          
            }
              validatePassword();
          </script>
    <body>
        <ul>
            <li><a href="index.html">Products</a></li>
            <li><a href="contact.html">Contact Us</a></li>
            <li><a href="shipping.html">Shipping Policy</a></li>
        </ul>
    
        <div style="margin-left:25%;padding:1.5px 16px;height:1000px;">
            <div>
                    <form  method="POST" action="" onsubmit=validatePassword() >
                      <input type="text" name="fullname" size="40" pattern="[a-zA-Z]+[ ]+[a-zA-Z]+" maxlength="30" placeholder="Enter First & Last Name"><br />
                      <input type="text" name="username" size="40" pattern=".[a-z0-9]{3,10}" required title="Minimum 4 Characters, Maximum 10 Characters, Numbers/Letters Only" placeholder="Enter Username" ><br />
                      <input type="email" name="email" size="40" placeholder="Enter Email" pattern="[a-z0-9._]+@[a-z0-9]+\.[a-z]{3,}$" required title="Please enter valid email."><br />
                      <input type="password" id="password" name="password"  size="40" pattern=".{8,}" required title="8 Characters Minimum" placeholder="Enter Password"><br />
                      <input type="password" id="repeat_password" name="repeat_password" size="40" pattern=".{8,}" required title="8 Characters Minimum" placeholder="Repeat Password"><br />
                   
                      <input type="submit" value="Submit" id="submit">
                  </form></div>
               
    </body>
    </html>`;
    response.send(str);
});

app.post("/registration.html", function (request, response) {
    // process a simple register form
    console.log(quantity);
    the_username = request.body.username;
    console.log(the_username, "Username is", typeof (users_reg_data[the_username]));

    username = request.body.username;//Save new user to file name (users_reg_data)

    errors = [];//Checks to see if username already exists

    if (typeof users_reg_data[username] != 'undefined') {
        errors.push("Username is Already Taken");
    }

    console.log(errors, users_reg_data);

    if (errors.length == 0) {
        users_reg_data[username] = {};
        users_reg_data[username].username = request.body.username
        users_reg_data[username].password = request.body.password;
        users_reg_data[username].email = request.body.email;

        theQuantQuerystring = qs.stringify(quantity);
        fs.writeFileSync(filename, JSON.stringify(users_reg_data));
        response.redirect("/invoice.html?" + theQuantQuerystring + `&username=${the_username}`);


    }
});


app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});
app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));

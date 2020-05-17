//*Jasmine Maguire
//*From Lab13
//*From Lab14

var express = require('express');
var app = express();
var myParser = require("body-parser");
var products = require("./public/product_data").theproducts; //export and save products here
var fs = require('fs');
const qs= require("querystring"); //loads inputted data

var user_info_file = './user_data.json'; 

if (fs.existsSync(user_info_file)) { //if file exists
    
    var data = fs.readFileSync(user_info_file, 'utf-8');
    var userdata = JSON.parse(data); //gets data from user_data.json makes object userdata

} else {
    console.log("Hello " + user_info_file + " doesn't exist."); 
}

app.use(myParser.urlencoded({ extended: true })); //post from form, named elements show up in body
//any path
app.all('*', function (request, response, next) { //* is all request to the server
    console.log(request.method + ' to ' + request.path);
    next();
});

app.post("/process_login", function (request, response){ //process login page
    console.log(request.query);//info from form
    var err_str = ""; //from lab14
    var login_username = request.body["username"];
    // check if username exists in reg data. If so, check if password matches
    if(typeof userdata[login_username] != 'undefined') {
        var user_info = userdata[login_username];
        // check if password stored for username matches what user typed in
        if(user_info["password"] != request.body["password"]) {
              err_str = `bad_password`;
        } else {
            request.query.username= login_username;
            response.redirect('./invoice.html?'+ qs.stringify(request.query));
          return;
        }
        
    } else {err_str="bad username"; //bad username error message

    }
    
        request.query.err=err_str //detects the error
        response.redirect('./login.html?'+ qs.stringify(request.query));
});





app.post("/register_user", function (request, response) { //Correct?
    // process a simple register form 
    console.log(request.body);
    username = request.body.username;
    userdata[username] = {};
    userdata[username].password = request.body.password;
    userdata[username].email = request.body.email;
    //assume all data is good, write to reg data file
    fs.writeFileSync(user_info_file, JSON.stringify(userdata));
    response.end(`New username ${username} registered`)
});



app.use(myParser.urlencoded({ extended: true })); //to get data in body
app.post("/products_selection", function (request, response) { //process form
    let POST = request.body; //data in body
    console.log(POST);
    if (typeof POST['purchase_submit'] != 'undefined') {
        var validquantities = true;
        for (i = 0; i < products.length; i++) { //validate quantities
            qty = POST[`quantity_textbox${i}`];
            //check if the qty is not a non negative integer
            if (isNonNegInt(qty) == false) {
                validquantities = false;
            }
        }
        //if quantities are valid, go to login
        if(validquantities){
            response.redirect(`./login.html?${qs.stringify(POST)}`) //redirect to login if valid quantities
            return;
        }
    }
            response.redirect(`./index.html?${qs.stringify(POST)}`)

});

function isNonNegInt(q, returnErrors = false) {
    errors = []; //invalid quantity
    if (q == "") { q = 0; }
    if (Number(q) != q) errors.push('Not a number');
    if (q < 0) errors.push('Negative value!');
    if (parseInt(q) != q) errors.push('Not an integer!');
    return returnErrors ? errors : (errors.length == 0);
}


app.use(express.static('./public')); //loads files in public folder
app.listen(8080, () => console.log(`listening on port 8080`));
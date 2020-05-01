var fs= require('fs');
var userinfo_file = './user_data.json'

var express = require('express');
var app = express();
var myParser = require("body-parser");


if (fs.existsSync(userinfo_file)) {
    var filestats = fs.statSync(userinfo_file);
    var data = fs.readFileSync(userinfo_file, 'utf-8');
    var userdata = JSON.parse(data);
    username = 'newuser';
    userdata[username] = {}; 
    userdata[username].password = 'newpass';
    userdata[username].email = 'newuser@user.com';
    userdata[username].name = "The New Guy"

    console.log(userdata["newuser"]["password"]);
    fs.writeFileSync(userinfo_file, JSON.stringify(userdata))

    console.log(filestats.size);
} else {
    console.log("Hey!" + userinfo_file + "doesn't exist!");
}

app.use(myParser.urlencoded({ extended: true }));

app.get("/login", function (request, response) {
    // Give a simple login form
    str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
 });

app.post("/check_login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    console.log(request.body, data);
    var login_username = request.body["username"];
    //check username exists in reg data, if so check password matches
    if(typeof userdata[login_username] != 'undefined') { 
        var user_info = userdata[login_username];
        //check if password stored for username matches what user typed
        if (user_info["password"] == request.body["password"]) {
            response.end(`${login_username} is logged in`)
        } else {
            err_string = `Incorrect password!`;
        }
    } else {
        err_string = `${login_username} does not exist! Please register.`;
    }
    response.redirect(`./login?${login_username}=${login_username}&error=${err_string}`);
});

app.listen(8080, () => console.log(`listening on port 8080`));
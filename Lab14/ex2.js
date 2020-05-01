var fs= require('fs');
var userinfo_file = './user_data.json'

if (fs.existsSync(userinfo_file)) {
    var filestats = fs.statSync(userinfo_file);
    var data = fs.readFileSync(userinfo_file, 'utf-8');
    data = JSON.parse(data);

    console.log(data["kazman"]["password"], data.kazman.email);

    console.log(filestats.size);
} else {
    console.log("Hey!" + userinfo_file + "doesn't exist!");
}

console.log(data.kazman.email);
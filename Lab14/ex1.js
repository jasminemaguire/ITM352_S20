var fs= require('fs');
var userinfo_file = './user_data.json'
var data = fs.readFileSync(userinfo_file, 'utf-8');
data = JSON.parse(data);

console.log(data.kazman.email);
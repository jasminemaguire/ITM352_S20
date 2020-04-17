var express = require('express');
var app = express();
app.all('*', function (request, response, next) {
    response.send(request.method + ' to path ' + request.path);
});
app.listen(8090, () => console.log(`listening on port 8080`));
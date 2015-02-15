var http = require('http');
var app = require('./cloud/main.js').app;

var port = 3200;

http.createServer(app).listen(port, function() {
    console.log("Express server listening on port %s in %s mode", port, app.settings.env);
});
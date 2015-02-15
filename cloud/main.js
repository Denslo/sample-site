var express = require('express');
var app = express();


app.set('views','./cloud/views');
app.set('view engine', 'jade');

app.get('/', function(req, res){
    res.render('index', { title: 'Express' });
});

var spa = require('./routes/spa');
var website = require('./routes/website');

app.use('/spa', spa);
app.use('/website', website);

exports.app = app;
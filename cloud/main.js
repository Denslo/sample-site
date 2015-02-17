var express = require('express');
var app = express();

app.set('views', 'cloud/views');
app.set('view engine', 'jade');
app.use(express.bodyParser());

var data = require('cloud/data.js');

app.get('/', function(req, res){
    res.send('hi');
});

app.get('/website', function(req, res){

    var pageId = randomInt(data.results.length);
    var reqId = -1;

    if(req.query.id !== undefined)
        pageId = req.query.id % data.results.length;

    if(req.query.recorder !== undefined)
        reqId = parseInt(req.query.recorder);

    var result = data.results[pageId];

    result.title = 'website';
    result.pageID = pageId;
    result.reqId = reqId;

    res.render('website', result);
});

app.get('/spa', function(req, res){
    res.render('spa', { title: 'spa' });
});

function randomInt(max)
{
    return Math.floor(Math.random()*(max+1));
}


app.listen(3000);
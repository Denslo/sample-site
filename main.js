var express = require('express');
var app = express();

app.set('views', 'cloud/views');
app.set('view engine', 'jade');
app.use(express.bodyParser());

var dataSrc = "cloud/data.js";

if(process.env != undefined) {
    if (process.env.IS_LOCAL) {
        dataSrc = "./cloud/data.js";
        app.use(express.static(__dirname + '/public'));
    }
}

var data = require(dataSrc);

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
    var reqId = -1;
    if(req.query.recorder !== undefined)
        reqId = parseInt(req.query.recorder);

    res.render('spa', { title: 'spa',reqId:reqId });
});

app.get('/backand', function(req, res){
    var reqId = -1;
    if(req.query.recorder !== undefined)
        reqId = parseInt(req.query.recorder);

    res.render('backand', { title: 'spa',reqId:reqId });
});

app.get('/data', function(req, res){
    res.json(data);
});

function randomInt(max)
{
    return 0;
    //return Math.floor(Math.random()*(max+1));
}


app.listen(3000);
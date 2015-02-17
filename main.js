var jade = require('jade');
var express = require('express');
var app = express();

app.set('views', 'cloud/views');
app.set('view engine', 'jade');
app.use(express.bodyParser());

var dataSrc = "cloud/data.js";

if(process.env != undefined) {
    if (process.env.IS_LOCAL) {
        dataSrc = "./cloud/data.js";
    }
}

var data = require(dataSrc);

app.get('/', function(req, res){
    res.send('hi');
});

app.get('/website', function(req, res){

    var pageId = randomInt(data.results.length);
    var reqId = 0;

    if(req.query.id !== undefined) {
        pageId = req.query.id % data.results.length;
    }
    var result = data.results[pageId];

    if(req.query.recorder !== undefined) {
        reqId = parseInt(req.query.recorder);

        if(reqId !== NaN){
            if(reqId < 0){
                result.head = undefined;
                result.tail = getRecJade(reqId);
            }
            if(reqId > 0){
                result.tail = undefined;
                result.head = "<h1> aaaaaa</h1>>";//getRecJade(reqId);
            }
        }
    }

    result.title = 'website';
    result.pageID = pageId;
    result.reqId = reqId;

    console.log(result.head);
    console.log(result.tail);
    res.render('website', result);
});

app.get('/spa', function(req, res){
    res.render('spa', { title: 'spa' });
});

app.listen(3000);

function randomInt(max)
{
    return Math.floor(Math.random()*(max+1));
}

function getRecJade(recID){

    var jadeName;

    switch (recID){
        case 1:
            jadeName = 'inspectlet';
            break;
        case 2:
            jadeName = 'navilytics';
            break;
        case 3:
            jadeName = 'luckyorange';
            break;
        case -1:
            jadeName = 'sessioncam';
            break;
        case -2:
            jadeName = 'mouseflow';
            break;
        case -3:
            jadeName = 'mousestats';
            break;
        case -4:
            jadeName = 'clicky';
            break;
        default:
            jadeName = 'empty';
    }


    return jadeName;
}
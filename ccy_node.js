var express = require("express");
var Promise = require("promise");
const request = require("request");
var rp = require('request-promise');
const access_key = "48ab38cf1e4e6865a95220a6346cc784";
var currencies=['EUR,USD,GBP,CAD,CHF,JPY,AUD,NZD,NOK,SEK,DKK,CZK,PLN,HUF,TRY,ZAR,SGD,MYR,THB,INR,MXN,BRL,XAU,XAG,BTC'];
var live_url = "http://apilayer.net/api/live?access_key="+access_key+"&currencies="+currencies+"&format=1"
var today = new Date();
today = today.toISOString().slice(0,10);
var hist_url = "http://apilayer.net/api/historical?access_key="+access_key+"&date="+today+"&currencies="+currencies+"&format=1";
var current_quotes = [['ccy', 'current']]

setInterval(setToday, 60000)

function setToday(){ 
    today = new Date();
    today = today.toISOString().slice(0,10);

    hist_url = "http://apilayer.net/api/historical?access_key="+access_key+"&date="+today+"&currencies="+currencies+"&format=1";
}


var hist_url = "http://apilayer.net/api/historical?access_key="+access_key+"&date="+today+"&currencies="+currencies+"&format=1";


var app = express();


function getQuote(url, callback) {
    console.log(url);
    request({url: url, json:true}, callback);
}

function updateHistUrl(date, callback){
    hist_url = "http://apilayer.net/api/historical?access_key="+access_key+"&date="+date+"&currencies="+currencies+"&format=1";
    request({url: hist_url, json: true}, callback);

}

app.get("/quote", (req,res,next) => {
    getQuote(live_url, function(body){res.send(body);});     
})






app.get('/simple_get', function(req,res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    var date = req.query.textField;
    var source = req.query.source;
    hist_url = "http://apilayer.net/api/historical?access_key="+access_key+"&date="+date+"&currencies="+currencies+"&format=1&source="+source;
    console.log(hist_url);
    var options={uri: hist_url, json: true};
    rp(options)
        .then(function (repos) {res.send(JSON.stringify(repos.quotes)), console.log(JSON.stringify(repos.quotes))})

});



// RUNNING THE API
var server = app.listen(5000, () => {
    var host = server.address().address
    var port = server.address().port
    console.log("CCY app listening at http://%s:%s", host, port)
});



var express = require('express');
var app = express();
var http = require("http");
var url = require('url');

app.get('/', function(req, res, next){
  res.sendFile(__dirname+'/index.html')
});

app.get('/dist/bundle.min.js', function(req, res, next){
  res.sendFile(__dirname+'/dist/bundle.js')
});

app.get('/board/:board', function(req, res, next){
    var options = {
      host: 'a.4cdn.org',
      path: '/' + req.params.board + '/catalog.json'
    };

    req = http.get(options, function(response) {
      var str = '';
      response.on('data', function (chunk) {
        str += chunk;
      });

      response.on('end', function () {
        res.json(JSON.parse(str));
      });
    });
});

app.get('/thread/:board/:number', function(req, res, next){
    var options = {
      host: 'a.4cdn.org',
      path: '/' + req.params.board + '/thread/' + req.params.number + '.json'
    };

    req = http.get(options, function(response) {
      var str = '';
      response.on('data', function (chunk) {
        str += chunk;
      });

      response.on('end', function () {
        res.json(JSON.parse(str));
      });
    });
});


app.listen(process.env.PORT || 8080);
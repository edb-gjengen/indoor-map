var express = require('express'),
    http = require('http');

var app = express()
    .use(express.logger('dev'))
    .use("/", express.static(__dirname));

console.log("http://localhost:3000");
http.createServer(app).listen(3000);

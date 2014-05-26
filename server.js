var express = require('express'),
    logger = require('morgan'),
    http = require('http');

var app = express();
app.use(logger({ format: 'dev'}));
app.use("/", express.static(__dirname));

console.log("http://localhost:3000");
http.createServer(app).listen(3000);

var express = require('express');
var app = express();
var bodyParser    = require('body-parser');
var multer        = require('multer');
//var cookieParser  = require('cookie-parser');
//var session       = require('express-session');
app.use(bodyParser.json());// for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));// for parsing application/x-www-form-urlencoded
app.use(multer());
//app.use(session({ secret: process.env.PASSPORT_SECRET }));
//app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.get('/hello', function(req, res){
    res.send('hello world');
});
app.get('/json', function (req, res) {
    var course = {
        title: 'Java 101',
        seats: 23,
        start: new Date()

    };
    res.json(course);
});

require("./public/assignment/server/app.js")(app);
app.listen(port, ipaddress);
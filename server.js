var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var routes =require('./app/routes');
// db
var mongoose = require('mongoose');
var db = require('./config/database');

app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extended: true}));



//Kết nối cơ sở dữ liệu
mongoose.connect(db.url);

app.use(express.static(__dirname + '/public'));
//route
routes(app);
//start server
server.listen(port);
console.log('Server is running on '+ port);
exports = module.exports=app;
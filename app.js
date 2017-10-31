var express = require('express');
var bodyParser = require('body-parser');
const bot = require('./routes/bot');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', bot);


const server = app.listen(8000, function() {
	console.log('Server in running');
});

module.exports = app;

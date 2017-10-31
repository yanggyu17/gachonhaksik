var https = require('https');
var urlencode = require('urlencode');
var bodyParser = require('body-parser');
var express = require('express');
//var router = express.Router();
var date = require('date-utils');
var app = express();

var meals = { };

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//실시간 날짜 정보 
var dt = new Date()
var d = dt.toFormat('YYYY-MM-DD')
console.log(d)

//토큰값과 api쿼리문
const token = 'QXeCCoI5VbFKawSg6Taa6Wgg75LrpgpLqQMUxeoDx0jl3dm977';
var path = '/openapi/v1/campuses/iaSfflZqCl/stores?date='+ d;

//헤더 설정
var options = {
	host: 'bds.bablabs.com',
	port: null,
	path: path,
	method:'GET',
	headers: {'accesstoken':token, 'babsession': 'bot'},
	encoding: null
};

//get요청 및 데이터 저장
var req = https.get(options, function(res){
	var resData = '';
	res.setEncoding('utf8');
	res.on('data',function(chunk){
		resData += chunk;
	});
	res.on('end',function(){

		//json형식으로 파싱
		resData = JSON.parse(resData);	
		
		//meals.vita = resData.stores[0];
		//meals.areum = resData.stores[1];
		//meals.chang = resData.stores[3];
		
		
		var vita = resData.stores[0].name + '\n';
		vita += resData.stores[0].menus;
		//console.log(vita);
		meals.vita = vita;
		
		//console.log(resData.stores[0]);
		//console.log(resData.stores[1]);
		//console.log(resData.stores[3]);
		//console.log(res.headers);
		
	});
});

req.end()

//에러 처리
req.on('error',function(err){
	console.log('err: '+ err.message);
});

module.exports = meals;

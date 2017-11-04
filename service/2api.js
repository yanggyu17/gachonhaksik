var https = require('https');
var urlencode = require('urlencode');
var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var date = require('date-utils');
var code = require('../code/code');
var app = express();

var client = mysql.createConnection({
  host     : 'project.ckbhix5bi49p.ap-northeast-2.rds.amazonaws.com',
  user     : 'project',
  password : 'gachon6543210',
  database : 'project'
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//실시간 날짜 정보 
var dt = new Date()
var d = dt.toFormat('YYYY-MM-DD')
console.log(d)

//토큰값과 api쿼리문
const token = 'QXeCCoI5VbFKawSg6Taa6Wgg75LrpgpLqQMUxeoDx0jl3dm977';
var path = '/openapi/v1/campuses/iaSfflZqCl/stores?date=2017-11-03';

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
		console.log('/api');
		//json형식으로 파싱
		resData = JSON.parse(resData);	
		
		if(resData.stores[0].menu_description != null){
				
		//console.log(resData.stores[0]);
		var vita = resData.stores[0].name + ' (' + d +')' +'\n\n'; 
		vita += resData.stores[0].menus[1].name + '\n';
                vita += resData.stores[0].menus[1].description + '\n\n';
                vita += resData.stores[0].menus[2].name + '\n';
                vita += resData.stores[0].menus[2].description;
		
		//console.log(vita);
		
		

		client.query('INSERT INTO vita4 (code, name, menu, date) VALUES (?, ?, ?, ?)', [code.key_vita, resData.stores[0].name, vita, d], function(err,data){
		if(err){
			console.log(err);
		}else {
			client.query('SELECT menu FROM vita4 WHERE code=?',[code.key_vita],function(err,row){

				//res.send(row);
				console.log("확인");
				console.log(row);
			 });
		}
		});
		
		
		
	});
});



//에러 처리
req.on('error',function(err){
	console.log('err: '+ err.message);
});

module.exports = router;

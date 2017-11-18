var https = require('https');
var urlencode = require('urlencode');
var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var code = require('../code/code');
var date = require('date-utils');
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
		console.log('/api');
		//json형식으로 파싱
		resData = JSON.parse(resData);	

var sql_update_vita = 'UPDATE vita SET code=?, name=?, menu=?, date=?';
var sql_update_areum = 'UPDATE areum SET code=?, name=?, menu=?, date=?';
var sql_update_chang = 'UPDATE chang SET code=?, name=?, menu=?, date=?';
var sql_set_vita = 'INSERT INTO vita (code, name, menu, date) VALUES (?, ?, ?, ?)';
var sql_set_areum = 'INSERT INTO areum (code, name, menu, date) VALUES (?, ?, ?, ?)';
var sql_set_chang = 'INSERT INTO chang (code, name, menu, date) VALUES (?, ?, ?, ?)';


	client.query(sql_set_vita, [code.key_vita, resData.stores[0].name, 'na', d], function(err, data){
		if(err){
			console.log(err);
		}
	});
	client.query(sql_set_areum, [code.key_areum, resData.stores[3].name, 'na', d], function(err, data){
		if(err){
			console.log(err);
		}
	});
	client.query(sql_set_chang, [code.key_chang, resData.stores[1].name, 'na', d], function(err, data){
		if(err){
			console.log(err);
		}
	});

		
if(resData.stores[0].menu_description != null){

	//비전타워 학식없음
	client.query(sql_update_vita, [code.key_vita, resData.stores[0].name, '주말에는 운영을 하지 않습니다.', d], function(err, data){
		if(err){
    		console.log(err);
    	} else {
        	client.query('SELECT menu FROM vita WHERE code=?',[code.key_vita],function(err,row){
        		console.log("확인");
            	console.log(row);
        	});
    	}
	});
	
	//아름관 학식없음
	client.query(sql_update_areum, [code.key_areum, resData.stores[3].name, '주말에는 운영을 하지 않습니다.', d], function(err, data){
		if(err){
    		console.log(err);
    	} else {
        	client.query('SELECT menu FROM areum WHERE code=?',[code.key_areum],function(err,row){
        		console.log("확인");
            	console.log(row);
        	});
    	}
	});
	
	//창조관 학식없음
	client.query(sql_update_chang, [code.key_chang, resData.stores[1].name, '주말에는 운영을 하지 않습니다.', d], function(err, data){
		if(err){
    		console.log(err);
    	} else {
        	client.query('SELECT menu FROM chang WHERE code=?',[code.key_chang],function(err,row){
        		console.log("확인");
            	console.log(row);
        	});
    	}
	});
} else {
	
	//비전타워 학식
	var vita = resData.stores[0].name + ' (' + d +')' +'\n\n';
                vita += resData.stores[0].menus[1].name + '\n';
                vita += resData.stores[0].menus[1].description + '\n\n';
                vita += resData.stores[0].menus[2].name + '\n';
                vita += resData.stores[0].menus[2].description;

	client.query(sql_update_vita, [code.key_vita, resData.stores[0].name, vita, d], function(err,data){
		if(err){
    		console.log(err);
    	} else {
        	client.query('SELECT menu FROM vita WHERE code=? limit 1',[code.key_vita],function(err,row){
        		console.log("확인");
            	console.log(row);
        	});
    	}
	});
	//아름관 학식
	var areum = resData.stores[3].name + ' (' + d +')' +'\n\n';
                areum += resData.stores[3].menus[1].name + '\n';
                areum += resData.stores[3].menus[1].description + '\n\n';
                

	client.query(sql_update_areum, [code.key_areum, resData.stores[3].name, areum, d], function(err,data){
		if(err){
    		console.log(err);
    	} else {
        	client.query('SELECT menu FROM areum WHERE code=? limit 1',[code.key_areum],function(err,row){
        		console.log("확인");
            	console.log(row);
        	});
    	}
	});
	//창조관 학식
	var chang = resData.stores[1].name + ' (' + d +')' +'\n\n';
                chang += resData.stores[1].menus[1].name + '\n';
                chang += resData.stores[1].menus[1].description + '\n\n';
                

	client.query(sql_update_chang, [code.key_chang, resData.stores[1].name, chang, d], function(err,data){
		if(err){
    		console.log(err);
    	} else {
        	client.query('SELECT menu FROM chang WHERE code=? limit 1',[code.key_chang],function(err,row){
        		console.log("확인");
            	console.log(row);
        	});
    	}
	});
}// if else

		
	});
});



//에러 처리
req.on('error',function(err){
	console.log('err: '+ err.message);
});

module.exports = router;

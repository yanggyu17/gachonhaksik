var https = require('https');
var date = require('date-utils');
var bodyParser = require('body-parser');
var date = require('date-utils');
var mysql = require('mysql');
var express = require('express');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var client = mysql.createConnection({
  host     : 'project.ckbhix5bi49p.ap-northeast-2.rds.amazonaws.com',
  user     : 'project',
  password : 'gachon6543210',
  database : 'project'
});

//실시간 날짜 정보 
var dt = new Date()
var d = dt.toFormat('YYYY-MM-DD')
console.log(d)

//토큰값과 api쿼리문
const token = 'QXeCCoI5VbFKawSg6Taa6Wgg75LrpgpLqQMUxeoDx0jl3dm977';
var path = '/openapi/v1/campuses/iaSfflZqCl/stores?date='+ d;


// HTTPRequest의 옵션 설정
var options = {
        host: 'bds.bablabs.com',
        port: null,
        path: path,
        method:'GET',
        headers: {'accesstoken':token, 'babsession': 'bot'},
        encoding: null
};


// 콜백 함수로 Response를 받아온다
var callback = function(res){
   // response 이벤트가 감지되면 데이터를 body에 받아온다
   var body = '';
   res.setEncoding('utf8');
   res.on('data', function(data) {
      body += data;
   });
   
   // end 이벤트가 감지되면 데이터 수신을 종료하고 내용을 출력한다
   res.on('end', function() {
      // 데이저 수신 완료
      body = JSON.parse(body);
                var vita = body;
                //vita += body.stores[0].menus[1] + '\n';
                //vita += body.stores[0].menus[1].description + '\n\n';
                //vita += body.stores[0].menus[2].name + '\n';
                //vita += body.stores[0].menus[2].description;
		//console.log(body.stores[0].name);
                console.log(vita);
               /* 
                client.query('INSERT INTO test2 (id, name) VALUES (?, ?)', [1711, body.stores[0].name], function(err,data){
		if(err){
			console.log(err);
		}else {
			client.query('SELECT * FROM test2 WHERE id=?',[1711],function(err,row){

				//res.send(row);
				console.log("확인");
				console.log(row);
			});
		}
		});*/

	
   });
}
// 서버에 HTTP Request 를 날린다.
var req = https.request(options, callback);
req.end();

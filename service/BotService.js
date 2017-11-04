const message = require('../service/message');
const Bot = { };
var mysql = require('mysql');
var code = require('../code/code');
//var tapi = require('./tapi');
//var api = require('./api');

var client = mysql.createConnection({
  host     : 'project.ckbhix5bi49p.ap-northeast-2.rds.amazonaws.com',
  user     : 'project',
  password : 'gachon6543210',
  database : 'project'
});


Bot.choseMenu = (req, content, callback) => {
	switch (content){
		case message.buttons[0]: //비전타워
			console.log('Button_vita');
			
			var sql_set = "SELECT menu FROM vita WHERE code=?";
			client.query(sql_set,[code.key_vita],function(err,data){
				if(err){
					console.log(err);
				}else{
					//console.log(data);
					console.log(JSON.parse(JSON.stringify(data[0])).menu);
					callback(err, message.baseType(JSON.parse(JSON.stringify(data[0])).menu));
				}
			});
			
      			break;
		case message.buttons[1]: //아름관(교육대학원)
			var sql_set = "SELECT menu FROM areum WHERE code=?";
                        client.query(sql_set,[code.key_areum],function(err,data){
                                if(err){
                                        console.log(err);
                                }else{
                                        console.log(JSON.parse(JSON.stringify(data[0])).menu);
                                        callback(err, message.baseType(JSON.parse(JSON.stringify(data[0])).menu));
                                }
                        });
			break;
		case message.buttons[2]: //창조관(예술대학)
			var sql_set = "SELECT menu FROM chang WHERE code=?";
                        client.query(sql_set,[code.key_chang],function(err,data){
                                if(err){
                                        console.log(err);
                                }else{
                                        console.log(JSON.parse(JSON.stringify(data[0])).menu);
                                        callback(err, message.baseType(JSON.parse(JSON.stringify(data[0])).menu));
                                }
                        });
			break;
		case message.buttons[3]: //학교공지사항
			callback(null, message.ButtonType('학교 공지사항','링크를 클릭하세요','http://www.gachon.ac.kr/community/opencampus/03.jsp?boardType_seq=358'));
			break;
		case message.buttons[4]: //학과 공지사항
			callback(null, message.ButtonType('학과 공지사항','링크를 클릭하세요.','http://www.gachon.ac.kr/major/bbs.jsp?boardType_seq=159'));
			break;
		case message.buttons[5]: //무당이 시간표
			callback(null, message.ButtonType('무당이 시간표','링크를 클릭하면 시간표가 보입니다.','https://s3.ap-northeast-2.amazonaws.com/yanggyu/mudang.jpeg'));
			break;
		default:
			callback(null, message.baseType('올바른 입력값이 아닙니다.'));
			break;
	}
}


module.exports = Bot;

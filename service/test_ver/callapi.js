const cron = require('node-cron');
const async = require('async');
const funcRedis = require('../service/funcRedis');
var date = require('date-utils');
var https = require('https');
const Scheduler = {};

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

let task = cron.schedule('10 5 * * * *', ()=> {
	const tasks = [
		(callback) => {
		
		var req = https.get(options, function(res){
        		var resData = '';
        		res.setEncoding('utf8');
        		res.on('data',function(chunk){
                		resData += chunk;
        		});
		
        		res.on('end',function(err){

                		//json형식으로 파싱
                		resData = JSON.parse(resData);

                		var vita = resData.stores[0].name + '\n\n';
                		vita += resData.stores[0].menus[1].name + '\n';
                		vita += resData.stores[0].menus[1].description + '\n\n';
                		vita += resData.stores[0].menus[2].name + '\n';
                		vita += resData.stores[0].menus[2].description;
                
                		//console.log(resData.stores[0]);
                		//console.log(vita);
		
				callback(err, vita);
        		});
		});
        }, //callback
        
        (vita, callback) => {
		console.log('redis' + vita);
      		funcRedis.setByKey(client, funcRedis.keyofvita, JSON.stringify(vita), (err) => {
        		callback(err);
      		});
    	},
    ];
    
    async.waterfall(tasks, (err) => {
    if (!err) {
      console.info('Crontab Success');
    } else {
      console.error(err);
    }
  });
});


task.start(); //cron start

module.exports = Scheduler;


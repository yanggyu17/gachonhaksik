var request = require('request');
var date = require('date-utils');

var dt = new Date();
var d = dt.toFormat('YYYY-MM-DD');

const token = 'QXeCCoI5VbFKawSg6Taa6Wgg75LrpgpLqQMUxeoDx0jl3dm977';
var path = '/openapi/v1/campuses/iaSfflZqCl/stores?date='+ d;

module.exports = function (callee) { 
    console.log('/multiapi');
	function multiapi(callee) {
        var OPTIONS = {
          
          headers: {'accesstoken':token, 'babsession': 'bot'},
          encoding: null,
	  url: null,
          body: null

        };
	
        
        const PORT = null;
        const BASE_PATH = path;
        var HOST = null;
        
        (function () {
            switch (callee) {
                case 'bab':
                    HOST = 'bds.bablabs.com';
                    break;
                case 'prod':
                    HOST = 'https://prod-api.com';
                    break;
                case 'another':
                    HOST = 'http://localhost';
                    break;
                default:
                    HOST = 'http://localhost';
            }
        })(callee);
        console.log('/multiapi_function');
        return {
            
            bab : function(callback) {
		OPTIONS.url = HOST + BASE_PATH;
	  	console.log(OPTIONS); 
                request.get(OPTIONS, function (err, res, result) {
			console.log('bab_result');
			var resData = '';
			resData += result; 
			console.log(resData);
                   // statusCodeErrorHandler(res.statusCode, callback, result);
                });
            }
        };
    }
    /*
    function statusCodeErrorHandler(statusCode, callback , data) {
        switch (statusCode) {
            case 200:
                callback(null, JSON.parse(data));
                break;
            default:
                callback('error', JSON.parse(data));
                break;
        }
    }
    */
    var INSTANCE;
    if (INSTANCE === undefined) {
        INSTANCE = new multiapi(callee);
    }
    return INSTANCE;
};

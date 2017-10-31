const express = require('express');
const router = express.Router();
var message = require('../service/message');
const Bot = require('../service/BotService');

const checkUserKey = (req, res, next) => {
	if(req.body.user_key != undefined){
		next();
	}else{
		res.status(500).send({error:'user_key is undefined'});
	}
};

router.get('/keyboard',(req, res) => {
	console.log('/keyboard');
	var butType = message.buttonsType();
	res.set({
		'content-type':'application/json'
	}).send(JSON.stringify(butType));
	console.log(butType);
}); 

router.post('/message', checkUserKey, (req, res) => {
	console.log('/message');
	const _obj = {
		user_key : req.body.user_key,
		type : req.body.type,
		content : req.body.content
	};
	console.log(_obj.content);

	Bot.choseMenu(req, _obj.content, (err, result) => {
		if(!err){
			res.set({
				'content-type':'application/json'
			}).send(JSON.stringify(result));
		}else{
			res.set({
				'content-type':'application/json'
			}).send(JSON.stringify(message.baseType('다시 시도해 주세요')));
		}
	});
});

router.post('/friend', checkUserKey, (req, res) => {
  const user_key = req.body.user_key;
  console.log(user_key + '님이 채팅방에 참가했습니다.');
  
  res.set({
    'content-type': 'application/json'
  }).send(JSON.stringify({success: true}));
});

router.delete('/friend/:user_key', checkUserKey, (req, res) => {
  const user_key = req.body.user_key;
  console.log(user_key + '님이 채팅방을 차단했습니다.');
  
  res.set({
    'content-type': 'application/json'
  }).send(JSON.stringify({success: true}));
});

router.delete('/chat_room/:user_key', checkUserKey, (req, res) => {
  const user_key = req.params.user_key;
  console.log(user_key + '님이 채팅방에서 나갔습니다.');
  
  res.set({
    'content-type': 'application/json'
  }).send(JSON.stringify({success: true}));
});

module.exports = router;

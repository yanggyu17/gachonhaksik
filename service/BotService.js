const message = require('../service/message');
const Bot = { };
const meals = require('./api')

Bot.choseMenu = (req, content, callback) => {
	switch (content){
		case message.buttons[0]: //비전타워
			console.log('vita');
			callback(null, meals);
			break;
		case message.buttons[1]: //아름관(교육대학원)
			console.log('areum');
			callback(null, meals.areum);
			break;
		case message.buttons[2]: //창조관(예술대학)
			callback(null, meals.chang)
			break;
		case message.buttons[3]: //도서관
			callback(null, message.mealType());
			//callback(null, meals.vita)
			break;
		default:
			callback(null, message.baseType('올바른 입력값이 아닙니다.'));
			break;
	}
}


module.exports = Bot;

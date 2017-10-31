
const message = { };

message.buttons = ['비전타워', '아름관', '창조관', '도서관자리확인'];

message.buttonsType = () => {
	return {
		type: 'buttons',
		buttons: message.buttons
	}
};

message.baseType = (text) => {
	return {
		message : {
			text : text,
		},
		keyboard : {
			type : 'buttons',
			buttons : message.buttons
		}
	}
};


module.exports = message;

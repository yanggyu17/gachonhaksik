
const message = { };

message.buttons = ['비전타워', '아름관', '창조관', '학교 공지사항','학과 공지사항','무당이 시간표'];

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

message.ButtonType = (text, label, url_button) => {
    return {
      message: {
        text: text,
        message_button: {
          label: label,
          url: url_button,
        }
      },
      keyboard: {
        type: 'buttons',
        buttons: message.buttons
      }
    }
};

module.exports = message;

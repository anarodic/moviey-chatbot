const callSendAPI = require('../helpers/callSendAPI');
const sendTypingOn = require('./sendTypingOn');
const sendTypingOff = require('./sendTypingOff');

module.exports = (recipientId, serviceCall, template, fallbackMessage) => {
const messageData = {
		recipient: {
			id: recipientId
		},
		message: fallbackMessage
	};

	sendTypingOn(recipientId);
	callSendAPI(messageData);
	sendTypingOff(recipientId);
};
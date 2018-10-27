const callSendAPI = require('../helpers/callSendAPI');
const sendTypingOn = require('./sendTypingOn');
const sendTypingOff = require('./sendTypingOff');

module.exports = (recipientId, serviceCall, template, messageText, fallbackMessage) => {
	serviceCall(recipientId, messageText)
		.then((data) => {
			if (data.length === 0 || !data) {
				return {
					recipient: {
						id: recipientId
					},
					message: fallbackMessage
				};
			}

			return {
				recipient: {
					id: recipientId
				},
				message: template(data)
			}
		})
		.then((messageData) => {
			sendTypingOn(recipientId);
			callSendAPI(messageData);
			sendTypingOff(recipientId);
		})
		.catch((error) => console.log(error.message))
};
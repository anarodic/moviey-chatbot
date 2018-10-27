const user = require('../services/user');
const callSendAPI = require('../helpers/callSendAPI');
const sendTypingOff = require('./sendTypingOff');
const sendTypingOn = require('./sendTypingOn');

module.exports = (event) => {
	const senderID = event.sender.id;
	const payload = event.postback.payload;
	const movie = JSON.parse(payload);

	user.save({id: senderID, movie});
	const messageData = {
		recipient: {
			id: senderID
		},
		message: {
			text: `You have successfully liked ${movie.title}. :)`
		}
	};

	sendTypingOn(senderID);
	callSendAPI(messageData);
	sendTypingOff(senderID);
};
const actions = require('../dialogflow/actions');
const user = require('../services/user');
const callSendAPI = require('../helpers/callSendAPI');
const sendTypingOff = require('../senders/sendTypingOff');
const sendTypingOn = require('../senders/sendTypingOn');

module.exports = event => {
	const senderId = event.sender.id;
	const payload = event.postback.payload;
	let isActionFound = false;

	actions.forEach((action) => {
		if (isActionFound) return;
		if (action.intent === payload) {
			isActionFound = true;
			action.sendMessage(senderId, action.serviceCall, action.template, action.fallBackMessage);
		}
	});

	if (isActionFound) return;

	try {
		const movie = JSON.parse(payload);
		user.save({id: senderId, movie});
		const messageData = {
			recipient: {
				id: senderId
			},
			message: {
				text: `You have successfully liked ${movie.title}. :)`
			}
		};

		sendTypingOn(senderId);
		callSendAPI(messageData);
		sendTypingOff(senderId);
	} catch (e) {
		console.log('Caught unknown postback:', e.message)
	}
};
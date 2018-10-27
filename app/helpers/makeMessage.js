const actions = require('../dialogflow/actions');
const callSendAPI = require('./callSendAPI');
const makeHelperMessage = require('../templates/makeHelperMessage');

module.exports = (senderId, response) => {
	const {parameters} = response.result;
	const {intentName} = response.result.metadata;
	let isActionFound = false;

	actions.forEach((action) => {
		if (isActionFound) return;
		if (action.intent === intentName) {
			isActionFound = true;
			action.sendMessage(senderId, action.serviceCall, action.template, parameters[action.entity], action.fallbackMessage);
		}
	});

	if (isActionFound) return;

	const messageData = {
		recipient: {
			id: senderId
		},
		message: {}
	};

	if (response.result.action === 'smalltalk.agent.acquaintance') {
		messageData.message = makeHelperMessage("My name is MovieBot. I'm here to help you in various ways. I can find information about any movie that you want. I can also find you popular and top-rated movies. However, if you prefer to watch newly released or upcoming movies feel free to ask for them. And last, but not least I can provide necessary info about nearby cinemas! Have fun :)");
	} else {
		const result = response.result.fulfillment.speech;
		messageData.message.text = result;
	}
	callSendAPI(messageData);
};

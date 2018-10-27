const config = require('config');
const makeMessage = require('./makeMessage');

const CLIENT_ACCESS_TOKEN = (process.env.DIALOGFLOW_CLIENT_ACCESS_TOKEN) ?
    (process.env.DIALOGFLOW_CLIENT_ACCESS_TOKEN) :
    config.get('dialogFlowClientAccessToken');

const apiai = require('apiai')(CLIENT_ACCESS_TOKEN);

module.exports = event => {
    const senderId = event.sender.id;
    const message = event.message.text;
    const sessionId = 'session';
    const apiaiSession = apiai.textRequest(message, {sessionId});

    apiaiSession.on('response', response => {
        makeMessage(senderId, response);
    });

    apiaiSession.on('error', error => console.log(error));
    apiaiSession.end();
};
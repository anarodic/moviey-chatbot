const callSendAPI = require('../helpers/callSendAPI');

module.exports = recipientId => {
    const messageData = {
        recipient: {
            id: recipientId
        },
        sender_action: "typing_off"
    };

    callSendAPI(messageData);
};
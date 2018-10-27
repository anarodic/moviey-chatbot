const axios = require('axios');
const config = require('config');

const PAGE_ACCESS_TOKEN = (process.env.MESSENGER_PAGE_ACCESS_TOKEN) ?
    (process.env.MESSENGER_PAGE_ACCESS_TOKEN) :
    config.get('pageAccessToken');

module.exports = messageData => {
    const params = {access_token: PAGE_ACCESS_TOKEN};
    const options = {
        data: messageData
    };

    axios.post('https://graph.facebook.com/v2.6/me/messages', params, options)
        .catch(error => {
            console.error("Failed calling Send API", error.response.status, error.response.statusText);
        });
};
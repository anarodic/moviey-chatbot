const crypto = require('crypto');
const config = require('config');

const APP_SECRET = (process.env.MESSENGER_APP_SECRET) ?
    process.env.MESSENGER_APP_SECRET :
    config.get('appSecret');

module.exports = (req, res, buf) => {
    const signature = req.headers["x-hub-signature"];

    if (!signature) {
        console.error("Couldn't validate the signature.");
    } else {
        const elements = signature.split('=');
        const method = elements[0];
        const signatureHash = elements[1];

        const expectedHash = crypto.createHmac('sha1', APP_SECRET)
            .update(buf)
            .digest('hex');

        if (signatureHash !== expectedHash) {
            throw new Error("Couldn't validate the request signature.");
        }
    }
};
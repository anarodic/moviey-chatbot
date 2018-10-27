const config = require('config');

const VALIDATION_TOKEN = (process.env.MESSENGER_VALIDATION_TOKEN) ?
    (process.env.MESSENGER_VALIDATION_TOKEN) :
    config.get('validationToken');

module.exports = (req, res) => {
    const hubChallenge = req.query['hub.challenge'];
    const hubMode = req.query['hub.mode'];
    const isSubscribed = hubMode === 'subscribe';
    const isTokenVerified = req.query['hub.verify_token'] === VALIDATION_TOKEN;

    if (isSubscribed && isTokenVerified) {
        console.log("Validating webhook");
        res.status(200).send(hubChallenge);
    } else {
        console.error("Failed validation. Make sure the validation tokens match.");
        res.sendStatus(403);
    }
};
const processMessage = require('../helpers/processMessage');
const processPostback = require('../helpers/processPostback');

module.exports = (req, res) => {
	const data = req.body;
	const isPageSubscription = data.object === 'page';

	if (isPageSubscription) {
		data.entry.forEach(entry => {
			entry.messaging.forEach(event => {
				if (event.message) {
					processMessage(event);
				} else if (event.postback) {
					processPostback(event);
				}
			})
		});
		res.sendStatus(200);
	}
};
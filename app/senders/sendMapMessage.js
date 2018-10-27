const callSendAPI = require('../helpers/callSendAPI');
const sendTypingOn = require('./sendTypingOn');
const sendTypingOff = require('./sendTypingOff');

module.exports = (recipientId) => {
	const messageData = {
		recipient: {
			id: recipientId
		},
		message: {
			attachment: {
				type: 'template',
				payload: {
					template_type: 'generic',
					elements: {
						element: {
							title: "Nearby Cineplexx Cinemas",
							image_url: 'https://www.google.com/maps/vt/data=IAWKPWZEKfMx7Ll_5gZUyMVO1ECBJOyhzegcNA-iofD-xXDwndT6ZC-hSwPfmkMN79js3VGLWCzXjsROJSt-jYkf4Dp4fLaeSd4HzUb2CzPO4rGOkuJqoYVVx0UO6gx_VBDuRsyoRo8fa11Xh9M9-yS79cIkzh2SroIR89E3yAVe0bIX0OFwMMF1BRpTgqLrhKJsS1VugdrNGN1l0L6nkTL0EOfSn7O3sS7Zf_oK1XOxFsbeZQSxlDBMjt1jlSGYVhELOmv3GUrJuABkYWDXtHXiN8xvs4Dgk5QWGN-VgCjFhO-k9VhwhDCBurCadAmBSKUsLZ5XUy1iZpHfEC53LGSYCvvFxqElPqmun7pIhc88m77HWsBzzMR4XWkt1_sr-DcM6pn44XMi5aG-caS46IQBroRl2hoeVy77uYEqTPBSnrQ7WIs35peZhQFE_UHFjrjYgFqhGQBKRMIEnS9SVRjw5PMM_5hhHue9dcqlVQ',
							default_action: {
								type: "web_url",
								url: 'https://www.google.com/search?client=firefox-b-ab&q=cineplexx&npsic=0&rflfq=1&rlha=0&rllag=44811457,20456969,4207&tbm=lcl&ved=0ahUKEwjp0pra3p_cAhVEJFAKHRirCCMQtgMIQQ&tbs=lrf:!3sIAE,lf:1,lf_ui:4&rldoc=1',
								webview_height_ratio: "tall",
							},
							buttons: [
								{
									type: "web_url",
									url: 'https://www.cineplexx.rs',
									title: "View Website"
								}
							]
						}
					}
				}
			}
		}
	};

	sendTypingOn(recipientId);
	callSendAPI(messageData);
	sendTypingOff(recipientId);
};
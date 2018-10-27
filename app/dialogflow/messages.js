const makeHelperMessage = require('../templates/makeHelperMessage');

module.exports = {
	moviesNotFound: makeHelperMessage("I couldn't find any movies. Can you please try again?"),
	userHasNoLikes: makeHelperMessage("In order for me to recommend you a movie you'll have to like some movies first.")
};
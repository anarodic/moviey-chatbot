const senders = require('../senders');
const intents = require('./intents');
const entities = require('./entities');
const services = require('../services');
const templates = require('../templates');
const messages = require('./messages');

const movieInfoAction = {
	intent: intents.movieInfoIntent,
	sendMessage: senders.sendMessage,
	serviceCall: services.movie.findByTitle,
	template: templates.makeCardTemplate,
	entity: entities.movie,
	fallbackMessage: messages.moviesNotFound
};

const moviePopularAction = {
	intent: intents.moviePopularIntent,
	sendMessage: senders.sendMessage,
	serviceCall: services.movie.findPopularMovies,
	template: templates.makeListTemplate,
	entity: entities.popular,
	fallbackMessage: messages.moviesNotFound
};

const movieTopRatedAction = {
	intent: intents.movieTopRatedIntent,
	sendMessage: senders.sendMessage,
	serviceCall: services.movie.findTopRatedMovies,
	template: templates.makeListTemplate,
	entity: entities.topRated,
	fallbackMessage: messages.moviesNotFound
};

const movieUpcomingAction = {
	intent: intents.movieUpcomingIntent,
	sendMessage: senders.sendMessage,
	serviceCall: services.movie.findUpcomingMovies,
	template: templates.makeListTemplate,
	entity: entities.upcoming,
	fallbackMessage: messages.moviesNotFound
};

const movieRecommendationsAction = {
	intent: intents.movieRecommendationsIntent,
	sendMessage: senders.sendMessage,
	serviceCall: services.movie.findRecommendationsForUser,
	template: templates.makeListTemplate,
	entity: entities.recommendations,
	fallbackMessage: messages.userHasNoLikes
};

const cinemaMapAction = {
	intent: intents.cinemaMapIntent,
	sendMessage: senders.sendMapMessage,
	serviceCall: undefined,
	template: undefined,
	entity: entities.cinemaMap
};

const cinemaAction = {
	intent: intents.cinemaIntent,
	sendMessage: senders.sendMessage,
	serviceCall: services.cinema.findMoviesForCinema,
	template: templates.makeCardTemplate,
	entity: entities.cinema,
	fallbackMessage: messages.moviesNotFound
};

const getStartedAction = {
	intent: intents.getStartedIntent,
	sendMessage: senders.sendTextMessage,
	serviceCall: undefined,
	template: undefined,
	entity: undefined,
	fallbackMessage: messages.getStartedMessage
};

module.exports = [
	movieInfoAction,
	moviePopularAction,
	movieTopRatedAction,
	movieUpcomingAction,
	movieRecommendationsAction,
	cinemaMapAction,
	cinemaAction,
	getStartedAction
];
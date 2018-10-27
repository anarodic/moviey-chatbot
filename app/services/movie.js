const config = require('config');
const axios = require('axios');
const user = require('./user');

const BASE_URL = 'https://api.themoviedb.org';
const TOKEN = (process.env.TMDB_TOKEN) ?
	process.env.TMDB_TOKEN :
	config.get('theMovieDBToken');

const searchMovies = (endpoint) => {
	return axios.get(`${BASE_URL}${endpoint}&api_key=${TOKEN}`)
		.then(response => {
			const {results} = response.data;
			return results.map(movie => {
				const imageBaseUrl = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2';
				const baseUrl = 'https://www.themoviedb.org/movie/';
				return {
					title: movie.title,
					overview: movie.overview,
					poster_path: imageBaseUrl + movie.poster_path,
					release_date: movie.release_date,
					url: baseUrl + movie.id,
					id: movie.id
				}
			});
		})
		.catch(error => {
			// console.log(error);
			return [];
		})
		.then(data => data);
};

const findByTitle = (emptyArgument, term) => {
	const endpoint = `/3/search/movie?include_adult=false&page=1&query=${term}&language=en-US`;
	return searchMovies(endpoint);
};

const findPopularMovies = () => {
	const endpoint = '/3/movie/popular?language=en-US&page=1';
	return searchMovies(endpoint);
};

const findUpcomingMovies = () => {
	const endpoint = '/3/movie/upcoming?language=en-US&page=1';
	return searchMovies(endpoint);
};

const findTopRatedMovies = () => {
	const endpoint = '/3/movie/top_rated?language=en-US&page=1';
	return searchMovies(endpoint);
};

const findRecommendations = (movieId) => {
	const endpoint = `/3/movie/${movieId}/recommendations?language=en-US&page=1`;
	return searchMovies(endpoint);
};

const findRecommendationsForUser = id =>
	user.findLikedMovies(id).then(movieId => findRecommendations(movieId));

module.exports = {
	findByTitle,
	findPopularMovies,
	findTopRatedMovies,
	findUpcomingMovies,
	findRecommendationsForUser
};
const axios = require('axios');
const cheerio = require('cheerio');
const movie = require('./movie');

const url = 'https://www.cineplexx.rs/service/program.php?type=program&centerId=0&sorting=alpha&undefined=Svi&view=detail&page=1&_=1533662201237';

const findMoviesForCinema = () =>
	axios.get(url)
		.then(html => {
			const $ = cheerio.load(html.data);
			const movies = [];

			$('.overview-element').each((i, element) => {
				const movieUrl = $(element).find($('h2 > a')).attr('href');
				const movieTitle = $(element).find($('.starBoxSmall.three-lines > p:nth-child(2)')).text();
				const movieDateParagraph = $(element).find($('.starBoxSmall.three-lines > p:nth-child(4)'));
				const movieDate = movieDateParagraph.text().substr(movieDateParagraph.length - 10);

				movies[i] = {url: movieUrl, title: movieTitle, overview: movieDate};
			});
			return movies;
		})
		.then(movies => Promise.all(movies.map(movies => movie.findByTitle(undefined, movies.title))))
		.then(movies => movies.map(movie => movie[0]).filter(movie => movie))
		.catch(e => console.log(e));

module.exports = {
	findMoviesForCinema
};
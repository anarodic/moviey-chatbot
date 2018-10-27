module.exports = (movies) => ({
	attachment: {
		type: "template",
		payload: {
			template_type: "generic",
			elements: movies.map(function (movie) {
				return {
					title: movie.title,
					image_url: movie.poster_path,
					subtitle: movie.overview,
					default_action: {
						type: "web_url",
						url: movie.url,
						webview_height_ratio: "tall",
					},
					buttons: [
						{
							type: "web_url",
							url: movie.url,
							title: "View Website"
						}, {
							type: "postback",
							title: "Like",
							payload: JSON.stringify({id: movie.id, title: movie.title})
						}
					]
				}
			}).slice(0, 10)
		}
	}
});
module.exports = (movies) => ({
	attachment: {
		type: "template",
		payload: {
			template_type: "list",
			top_element_style: "compact",
			elements: movies.map((movie) => {
				return {
					default_action: {
						type: "web_url",
						url: movie.url,
						messenger_extensions: false,
						webview_height_ratio: "tall"
					},
					title: movie.title,
					image_url: movie.poster_path,
					subtitle: movie.overview,
					buttons: [
						{
							type: "postback",
							title: "Like",
							payload: JSON.stringify({id: movie.id, title: movie.title})
						}
					]
				}
			}).slice(0, 4)
		}
	}
});
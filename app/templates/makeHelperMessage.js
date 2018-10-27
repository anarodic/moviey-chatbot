module.exports = (text) => ({
	attachment: {
		"type": "template",
		"payload": {
			"template_type": "button",
			"text": text,
			"buttons": [
				{
					"type": "postback",
					"title": "Popular Movies",
					"payload": "movie-popular-intent",
					"webview_height_ratio": "full"
				},
				{
					"type": "postback",
					"title": "Top Rated Movies",
					"payload": "movie-top-rated-intent",
					"webview_height_ratio": "full"
				},
				{
					"type": "postback",
					"title": "Upcoming Movies",
					"payload": "movie-upcoming-intent",
					"webview_height_ratio": "full"
				}
			]
		}
	}
});
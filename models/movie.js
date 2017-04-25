var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
	Title: {
		type: String
	},
	Released: {
		type: String
	},
	Runtime: {
		type: String
	},
	Genre: {
		type: String
	},
	imdbID: {
		type: String
	},
	Poster: {
		type: String
	}
});

module.exports = mongoose.model("movie", movieSchema);
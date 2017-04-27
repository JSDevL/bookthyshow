var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
	Title: {
		type: String,
		required: true
	},
	Year: {
		type: String,
		required: true
	},
	Plot: {
		type: String,
		required: true
	},
	Released: {
		type: String,
		required: true
	},
	Runtime: {
		type: String,
		required: true
	},
	Genre: {
		type: String,
		required: true
	},
	imdbID: {
		type: String,
		required: true
	},
	Poster: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model("movie", movieSchema);
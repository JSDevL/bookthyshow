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
	},
	theatres: [{
		theatre: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'theatres'
		},
		dates: [{
			type: String
		}],
		timings: [{
			type: String
		}]
	}]
});

module.exports = mongoose.model("movie", movieSchema);
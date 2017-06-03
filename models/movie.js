var mongoose = require('mongoose');

var genreSchema = new mongoose.Schema({ 
	id: Number,
	name: String
});

var movieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	release_date: {
		type: String,
		required: true
	},
	poster_path: {
		type: String,
		required: true
	},
	backdrop_path: {
		type: String,
		required: true
	},
	genres: {
		type: [genreSchema],
		required: true
	},
	overview: {
		type: String,
		required: true
	},
	runtime: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model("movie", movieSchema);
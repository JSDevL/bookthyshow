var mongoose = require('mongoose');

var theatreSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	location: {
		type: String,
		required: true,
		trim: true
	},
	city: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'cities'
	},
	movies: [{
		movie: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'movies'
		},
		dates: [{
			type: String
		}],
		timings: [{
			type: String
		}]
	}]
});

module.exports = mongoose.model("theatres", theatreSchema);
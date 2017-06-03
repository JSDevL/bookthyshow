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
	city_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'cities',
		required: true
	}
});

module.exports = mongoose.model("theatres", theatreSchema);
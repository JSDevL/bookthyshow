var mongoose = require('mongoose');

var seatSchema = new mongoose.Schema({
	row: {
		type: String,
		required: true
	},
	col: {
		type: Number,
		required: true
	}
});

var bookingSchema = new mongoose.Schema({
	city: {
		type: String,
		required: true
	},
	movie: {
		type: String,
		required: true
	},
	theatre: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	},
	timing: {
		type: String,
		required: true
	},
	class: {
		type: String,
		required: true
	},
	seats: {
		type: [seatSchema],
		required: true
	}
});

module.exports = mongoose.model("bookings", bookingSchema);
var mongoose = require('mongoose');
var movieSchema = require('./movie').schema;
var theatreSchema = require('./theatre').schema;

var validateEmail = function(email) {
	var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(email);
};

var paymentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: 'Name is required'
	},
	email: {
		type: String,
		required: true,
		validate: [validateEmail, 'Please fill a valid email address']
	},
	card_no: {
		type: String,
		required: 'Card number is required'
	},
	expiry_month: {
		type: String,
		required: 'Expiry month is required'
	},
	expiry_year: {
		type: String,
		required: 'Expiry year is required'
	},
	cvv: {
		type:String,
		required: 'CVV is required'
	}
});

var seatSchema = new mongoose.Schema({
	row: {
		type: Number,
		required: true
	},
	col: {
		type: Number,
		required: true
	}
});

var bookingSchema = new mongoose.Schema({
	movie: {
		type: movieSchema,
		required: true
	},
	theatre: {
		type: theatreSchema,
		required: true
	},
	date: {
		type: Date,
		required: true
	},
	timing: {
		type: Date,
		required: true
	},
	selectedSeats: {
		type: [seatSchema],
		required: true
	},
	seatClass: {
		type: String,
		required: true
	},
	paymentDetails: {
		type: paymentSchema,
		required: true
	}
});

module.exports = mongoose.model("bookings", bookingSchema);
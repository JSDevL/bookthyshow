const express = require('express');
const router = express.Router();

const Booking = require('../models/booking');

module.exports.configure = function(io){
	router.post('/', function(req, res, next){
		var newBooking = new Booking(req.body);

		newBooking.save(function(err, booking){
			if(err){
				next(err);
			} else {
				res.status(200);
				res.json(booking);
			}
		});
	});

	router.get('/', function(req, res, next){
		Booking.find(req.query, {paymentDetails: 0}).exec( function(err, bookings){
			if(err){
				next(err);
			} else {
				res.status(200);
				res.json(bookings);
			}
		});
	});

	router.get('/:id', function(req, res, next){
		Booking.findById(req.params['id'], {paymentDetails: 0}).exec( function(err, booking){
			if(err){
				next(err);
			} else {
				res.status(200);
				res.json(booking);
			}
		});
	});

	return router;
};
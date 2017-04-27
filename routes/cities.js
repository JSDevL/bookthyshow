const express = require('express');
const router = express.Router();
const City = require('../models/cities');

module.exports.configure = function(io){
	router.post('/', function(req, res, next){
		var newCity = new City(req.body);

		newCity.save(function(err, movie){
			if(err){
				next(err);
			} else {
				io.emit("POST /api/cities", movie);
				res.status(200);
				res.json(movie);
			}
		});
	});

	router.get('/', function(req, res, next){
		City.find({}, function(err, cities){
			if(err){
				next(err);
			} else {
				res.status(200);
				res.json(cities);
			}
		});
	});

	router.delete('/:id', function(req, res, next){
		City.remove({ _id: req.params.id }, function(err){
			if(err){
				next(err);
			} else {
				io.emit("DELETE /api/cities", req.params.id);
				res.status(200);
				res.send("deleted");
			}
		});
	});

	return router;
};
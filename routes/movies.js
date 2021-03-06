const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

module.exports.configure = function(io){
	router.post('/', function(req, res, next){
		var newMovie = new Movie(req.body);

		newMovie.save(function(err, movie){
			if(err){
				next(err);
			} else {
				res.status(200);
				res.json(movie);
			}
		});
	});

	router.get('/', function(req, res, next){
		Movie.find({}, function(err, movies){
			if(err){
				next(err);
			} else {
				res.status(200);
				res.json(movies);
			}
		});
	});

	router.get('/:id', function(req, res, next){
		Movie.findById(req.params.id).populate('theatres.theatre').exec(function(err, movie){
			if(err){
				next(err);
			} else {
				res.status(200);
				res.json(movie);
			}
		});
	});

	router.delete('/:id', function(req, res, next){
		Movie.remove({ _id: req.params.id }, function(err){
			if(err){
				next(err);
			} else {
				res.status(200);
				res.send("deleted");
			}
		});
	});

	return router;
};
const express = require('express');
const router = express.Router();

const Theatre = require('../models/theatre');
const Movie = require('../models/movie');

module.exports.configure = function(io){
	router.post('/', function(req, res, next){
		var newTheatre = new Theatre(req.body);

		newTheatre.save(function(err, theatre){
			if(err){
				next(err);
			} else {
				Theatre.populate(theatre, "city", function (err, populatedTheatre) {
					if(err){
						next(err);
					} else {
						io.emit("POST /api/theatres", populatedTheatre);
						res.status(200);
						res.json(theatre);
					}
				});
			}
		});
	});

	router.get('/', function(req, res, next){
		Theatre.find({}).populate('city').exec( function(err, theatres){
			if(err){
				next(err);
			} else {
				res.status(200);
				res.json(theatres);
			}
		});
	});

	router.post('/:theatreID/movies/:movieID', function(req, res, next){
		Theatre.findByIdAndUpdate(req.params.theatreID, {
			$push: {
				movies: {
					movie: req.params.movieID,
					dates: req.body.dates,
					timings: req.body.timings
				}
			}
		}, function(err){
			if(err){
				next(err);
			} else {
				Movie.findByIdAndUpdate(req.params.movieID, {
					$push: {
						theatres: {
							theatre: req.params.theatreID,
							dates: req.body.dates,
							timings: req.body.timings
						}
					}
				}, function(err){
					if(err){
						next(err);
					} else {
						res.status(200);
						res.send("updated");
					}
				});
			}
		});
	});

	router.delete('/:id', function(req, res, next){
		Theatre.remove({ _id: req.params.id }, function(err){
			if(err){
				next(err);
			} else {
				io.emit("DELETE /api/theatres", req.params.id);
				res.status(200);
				res.send("deleted");
			}
		});
	});

	return router;
};
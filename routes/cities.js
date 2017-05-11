const express = require('express');
const router = express.Router();

const Theatre = require('../models/theatre');
const City = require('../models/city');

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
		City.find({}).exec(function(err, cities){
			if(err){
				next(err);
			} else {
				res.status(200);
				res.json(cities);
			}
		});
	});

	router.get('/:id', function(req, res, next){
		City.findById(req.params.id).exec(function(err, city){
			if(err){
				next(err);
			} else {
				res.status(200);
				res.json(city);
			}
		});
	});

	router.delete('/:id', function(req, res, next){
		/**
		 * To delete a city all theatres bound to this city must be deleted first
		 */

		Theatre.find({ city: req.params.id }).exec( function(err, theatres){
			if(theatres.length){
				let err = new Error("To delete a city all theatres bound to this city must be deleted first");
				err.name = "city bounded";
				err.status = 400;
				return next(err);
			} else {
				City.remove({ _id: req.params.id }, function(err){
					if(err){
						next(err);
					} else {
						io.emit("DELETE /api/cities", req.params.id);
						res.status(200);
						res.send("deleted");
					}
				});
			}
		});
	});

	return router;
};
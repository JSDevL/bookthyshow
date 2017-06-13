const express = require('express');
const router = express.Router();

const Mapping = require('../models/mapping');

module.exports.configure = function(io){
	router.post('/', function(req, res, next){
		const newMapping = new Mapping(req.body);

		newMapping.save(function(err, mapping){
			if(err){
				next(err);
			} else {
				res.status(200);
				res.json(mapping);
			}
		});
	});

	router.get('/', function(req, res, next){
		Mapping.find(req.query).exec(function(err, mappings){
			if(err){
				next(err);
			} else {
				res.status(200);
				res.json(mappings);
			}
		});
	});

	router.put('/:id', function(req, res, next){
		Mapping.findById(req.params.id, function(err, mapping){
			if(err){
				next(err);
			} else {
				mapping.dates = req.body.dates;
				mapping.timings = req.body.timings;

				mapping.save( function(err, updatedMapping){
					if(err){
						next(err);
					} else {
						res.status(200);
						res.json(updatedMapping);
					}
				});
			}
		});
	});

	router.delete('/:id', function(req, res, next){
		Mapping.findByIdAndRemove(req.params.id, function(err){
			if(err){
				next(err);
			} else {
				res.status(200);
				res.json("removed");
			}
		});
	});

	return router;
};
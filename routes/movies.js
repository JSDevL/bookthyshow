var express = require('express');
var router = express.Router();
var Movie = require('../models/movie');

router.post('/', function(req, res){
	var newMovie = new Movie(req.body);

	newMovie.save(function(err){
		if(err){
			throw err;
		} else {
			res.status(200);
			res.send("added");
		}
	});
});

router.get('/', function(req, res){
	Movie.find({}, function(err, movies){
		if(err){
			throw err;
		} else {
			res.status(200);
			res.json(movies);
		}
	});
});

router.delete('/:id', function(req, res){
	Movie.remove({ _id: req.params.id }, function(err){
		if(err){
			throw err;
		} else {
			res.status(200);
			res.send("deleted");
		}
	});
});

module.exports = router;
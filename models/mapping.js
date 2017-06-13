const mongoose = require('mongoose');
const theatreModel = require('./theatre');
const movieModel = require('./movie');

const mappingSchema = new mongoose.Schema({
	theatre: {
		type: theatreModel.schema,
		required: true
	},
	movie: {
		type: movieModel.schema,
		required: true
	},
	dates: {
		type: [Date],
		required: [true, 'At least one date needs to be added.']
	},
	timings: {
		type: [Date],
		required: [true, 'At least one timing needs to be added.']
	}
});

module.exports = mongoose.model('mappings', mappingSchema);
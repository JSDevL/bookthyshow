var mongoose = require('mongoose');

var citySchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		uppercase: true,
	}
});

module.exports = mongoose.model("cities", citySchema);
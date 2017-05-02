var mongoose = require('mongoose');

var citySchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		trim: true
	}
});

citySchema.pre('save', function (next) {
	// capitalize
	this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
	next();
});

module.exports = mongoose.model("cities", citySchema);
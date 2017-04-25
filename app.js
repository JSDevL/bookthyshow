var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bookthyshow');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("mongoDB connected");
});

var app = express();

app.use(logger('dev'), bodyParser.json(), bodyParser.urlencoded({ extended: false }), cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// require all routes
app.use('/', require('./routes/index'));
app.use('/movies', require('./routes/movies'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// send the error
	res.status(err.status || 500);
	res.json(err);
});

module.exports = app;

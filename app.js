const http = require('http');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

var app = express();

/**
 * Set port
 */

const PORT = process.env.PORT || '8080';
app.set('port', PORT);

/**
 * Setup server and socket.io
 */

const server = http.createServer(app);
const io = require('socket.io')(server);

/**
 * Setup mongoose
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/bookthyshow');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("mongoDB connected");
});

/**
 * Setup middlewares
 */

app.use(logger('dev'), bodyParser.json(), bodyParser.urlencoded({ extended: false }), cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Routes used
 */

app.use('/', require('./routes/index'));
app.use('/api/movies', require('./routes/movies').configure(io));
app.use('/api/cities', require('./routes/cities').configure(io));
app.use('/api/theatres', require('./routes/theatres').configure(io));
app.use('/api/bookings', require('./routes/bookings').configure(io));
app.use('/api/mappings', require('./routes/mappings').configure(io));

/**
 *  404 and error handlers
 */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// send the error
	res.status(err.status || 500);
	return res.json(err);
});

/**
 * Listen to server 
 */

server.listen(PORT, function(){
	console.log('app running on port: ' + PORT);
});

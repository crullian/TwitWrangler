var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

// our custom routes---the behavior of our app
app.use(require('./routes'));

// if we made it this far, then there was nothing
// that sent a response
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// standard error handling middleware
app.use(function(err, req, res, next) {
	err.status = err.status || 500;
	console.log('error', err);
	res.status(err.status).end();
});

// setup the port
var port = 8000;
// note that because we're not using local login, there's no
// need for HTTPS
app.listen(port, function() {
	console.log('Fun happens on port', port);
});
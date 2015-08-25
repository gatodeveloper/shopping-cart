var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose');
var path = require('path');
var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var fs = require('fs');

var app = module.exports = express();
var env = process.env.NODE_ENV || 'development';
var config = require('./config/config')[env];

var connectDB = function () {
    var options = { server: { socketOptions: { keepAlive: 1 } } }
    mongoose.connect(config.db, options)
};
connectDB();

var models_path = __dirname + '/api';
fs.readdirSync(models_path).forEach(function( folder ) {
    var file = 'model.js',
        modelFile = models_path + '/' + folder + '/' + file;
    if ( fs.existsSync( modelFile ) ){ require( modelFile ) }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes/index');
var products = require('./api/products');

app.use('/', routes);
app.use('/api', products);


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.log(':: Handler Error::', err);
        res.status(err.status || 500);
        res.send( err );
        /*res.render('error', {
            message: err.message,
            error: err
        });*/
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    console.log('err')
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


var httpServer = http.createServer( app ).listen( 3000, function(){
    console.log("Express server listening on port " + 3000);
});


module.exports = app;

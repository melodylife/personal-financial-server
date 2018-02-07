#!/usr/bin/nodejs

var express = require('express');
var path = require('path');
var https = require('https');
var http = require('http');
var fs = require("fs");
//var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var routes = require('./routes/index');
var tblOperations = require('./routes/tblOps');
var appinit = require('./routes/appinit');
var finbook = require('./routes/finbook');
var healthcheckhandler = require('./routes/healthcheck');
var report = require('./routes/report');

//homebrew middleware
var jsonParser = require('./util/middleware/jsonParser');

//Here's the password to unpack the key file
var certpwd = require('./conf/certpwd.json');

var app = express();

//Confiuration
var conf = require('./conf/serConf.json');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(favicon());
app.use(logger('dev'));
//app.use(bodyParser.urlencoded());
app.use(jsonParser.base64ReqBodyParser);
app.use(bodyParser.raw());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/appinit', appinit);
app.use('/tblOps' , tblOperations);
app.use('/healthcheck' , healthcheckhandler);
app.use('/finbook' , finbook);
app.use('/report' , report);

/// catch 404 and forwarding to error handler
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
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


console.log('started@' + conf.port);

//app.listen(conf.port);

var options = {
  /*cert:fs.readFileSync('./conf/certs/2_changworkshop.com.crt'),
  key:fs.readFileSync('./conf/certs/test.key'),
  ca:fs.readFileSync('./conf/certs/root.crt'),
  passphrase: certpwd.pwd */
}

http.createServer(app).listen(conf.port);
//https.createServer(options, app).listen(conf.sslport);

module.exports = app;

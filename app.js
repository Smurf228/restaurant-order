var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const clientRouter = require('./routes/clientRoute');
const dishRouter = require('./routes/dishRoute');
const oderRouter = require('./routes/oderRoute');
const cApiRouter = require('./routes/api/ClientApiRoute');
const oApiRouter = require('./routes/api/OderApiRoute');
const dApiRouter = require('./routes/api/DishApiRoute');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/api/clients', cApiRouter);
app.use('/api/dishs', dApiRouter);
app.use('/api/oders', oApiRouter);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/clients', clientRouter);
app.use('/dishs', dishRouter);
app.use('/oders', oderRouter);


app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var qs = require('querystring');

var usersRouter = require('./routes/usersRoutes');
var careersRoutes = require('./routes/careersRoutes');
var levelsRoutes = require('./routes/levelsRoutes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('query parse', str => {
    return qs.parse(str);
});

app.use('/users', usersRouter);
app.use('/careers', careersRoutes);
app.use('/levels', levelsRoutes);

module.exports = app;

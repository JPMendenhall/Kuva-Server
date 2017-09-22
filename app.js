const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

const patrons = require('./api/patrons_api')
const trips = require('./api/trips_api')
const photos = require('./api/photos_api')
const patronstrips = require('./api/patronstrips_api')
const photostrips = require('./api/photostrips_api')
const userspws = require('./api/userspws_api')
const sidenav = require('./api/getSideNavBar_api')
const eventdata = require('./api/eventdata_api')
const login = require('./api/login_api')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/api/patrons', patrons)
app.use('/api/trips', trips)
app.use('/api/photos', photos)
app.use('/api/patronstrips', patronstrips)
app.use('/api/photostrips', photostrips)
app.use('/api/userspws', userspws)
app.use('/api/sidenav', sidenav)
app.use('/api/event', eventdata)
app.use('/api/login', login)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
  console.error(err);
});

module.exports = app;

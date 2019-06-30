var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const loginRouter = require('./api/login');
const threadRouter = require('./api/thread');
const config = require('./configs/config');
var app = express();

const MongoStore = require('connect-mongo');

process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception', err)
})

process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err)
})

// connect to the database
mongoose.connect(config.dbConnString); // connect to the database
const db = mongoose.connection;
/**
 * If we got the database connection 
 * then start the server
 */
db.then(conn =>{
  app.use(require('./middlewares/cors'));
  require('./authentication/passport');
  global.User = require('./models/user');
  global.Thread = require('./models/thread');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  // app.use(express.static(path.join(__dirname, 'public')));
  app.use(passport.initialize());

  /*
    unauthorized requests
    as anybody can try to login or register
  */
  app.use('/api',loginRouter);
  /*
    Middleware to authorize the requests
    threadRouter api's will be authenticated requests
    as only loggedIn user should make calls
  */
  app.use(require('./middlewares/TokenValidator'));
  app.use('/api',threadRouter)

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({Error:err.message,status:err.status});
  });
})
.catch(err =>{
  console.log("ERROR CONNECTING DATABASE,CHECK MONGO IS RUNNING ")
  process.exit(1);
})
// console.log("db" ,db)

module.exports = app;

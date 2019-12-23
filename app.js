var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwtValidator = require("./config/auth");
var cors = require('cors');
const passport = require("passport");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');

var app = express();
app.use(cors());
require("./config/db");
require("./config/passport");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Import Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/posts", jwtValidator, postsRouter);

// Google OAuth
app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile']
  }));

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/*
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Running on port " + PORT);
})
*/

module.exports = app;
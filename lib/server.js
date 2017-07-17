const path = 'D:/node/SEAT_2.0'
require('app-module-path').addPath(path);
const config = require('config');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const passport = require('passport');
const flash = require('connect-flash');
const busboy = require('connect-busboy');

module.exports = function () {
// configuration ===============================================================
// connect to our database
	config.passport(passport); // pass passport for configuration

  // set up our express application
  app.use(busboy());
  app.use(morgan('dev')); // log every request to the console
  app.use(cookieParser()); // read cookies (needed for auth)
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.use(express.static('public'));

  // required for passport
  app.use(session({
    secret: 'vidyapathaisalwaysrunning',
    resave: true,
    saveUninitialized: true
  })); 

  // session secret
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions
  app.use(flash()); // use connect-flash for flash messages stored in session

  // routes ======================================================================
  require('routes')(app, passport); // load our routes and pass in our app and fully configured passport

  return app;
};

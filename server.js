// REQUIREMENTS
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var expressSession = require('express-session')

var passport = require('passport');
var session = require('session');
var port = process.env.PORT || 3000;

require('./config/passport.js')(passport);

// MIDDLEWARE
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));


// PASSPORT STUFF
app.use(expressSession({ name: 'whut', secret: 'conventional wisdom', saveUninitialized: true, resave: true, proxy: true }))
app.use(passport.initialize());
app.use(passport.session());

// adds {login: true} to res.locals object
app.use(function(req, res, next) {
  res.locals.login = req.isAuthenticated();
  next();
});

// CONTROLLERS
var usersController = require('./controllers/usersController');
// var commentsController = require('./controllers/commentsController');


app.use('/users', usersController);
// app.use('/comments', commentsController);

// CONNECTION
//mongoose.connect('mongodb://localhost:27017/gifty');
var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/gifty';
mongoose.connect(mongoUri);


// LISTENING
mongoose.connection.once('open', function() {
	app.listen(port, function() {
		console.log('--------- LISTENING ---------');
	});
});


















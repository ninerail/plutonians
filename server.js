// REQUIREMENTS
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/gifty');

// CONTROLLERS
var usersController = require('./controllers/usersController');
// var commentsController = require('./controllers/commentsController');

// MIDDLEWARE
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.use('/users', usersController);
// app.use('/comments', commentsController);

// INDEX
app.get('/', function(req, res){
	res.render('index.ejs');
});


// LISTENING
mongoose.connection.once('open', function() {
	app.listen(3000, function() {
		console.log('--------- LISTENING ---------');
	});
});


















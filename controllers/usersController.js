// REQUIREMENTS
var express = require('express');
var router = express.Router();
var User = require('../models/users.js');
var passport = require('passport')


// SHOW ALL USERS

router.get('/', function(req, res) {
	User.find({}, function(err, data) {
		res.json(data);
	});
});

// SIGNUP
router.post('/signup', passport.authenticate('local-signup', {
    failureRedirect: '/index.html'}), function(req, res){
    console.log("did i just create a user???   " + req.user)

    return res.status(200)
})

// LOGIN
router.post('/login', passport.authenticate('local-login'), function(req, res){
    res.send(req.user)
});

router.get('/loggedin', function(req, res) { 
    res.send(req.isAuthenticated() ? req.user : '0'); 
});


// GET SINGLE USER
router.get('/:id', function(req, res) {
    // console.log(req.params.id);
    User.findById(req.params.id, function(err, data) {
        // console.log(data);
        res.json(data);
    });
});

// middleware to check login status
function isLoggedIn(req, res, next) {
    console.log('isLoggedIn middleware');

        
  if (req.isAuthenticated()) {
    
    console.log("successful login!")
    return next(); 
  } else {      
    console.log("BAD LOGIN")
    res.redirect('/users');
    return
  }
}

// Define a middleware function to be used for every secured routes 
var auth = function(req, res, next){ 
if (!req.isAuthenticated()) 
    res.send(401); 
    else next(); 
};



router.put('/:id', function(req, res) {
    // console.log(req.params.id);
    User.findById(req.params.id, function(err, data) {
        console.log(data);
        // var newImg = req.query.newUrl;
        // console.log(newImg);
    });      
});






module.exports = router;











// REQUIREMENTS
var express = require('express');
var router = express.Router();
var User = require('../models/users.js');
var Gif = require('../models/gifs.js')
;var passport = require('passport');



// SHOW ALL USERS
router.get('/', function(req, res) {
    // check if user is logged in
    res.locals.login = req.isAuthenticated();
    // find all users
	User.find({}, function(err, data) {
        // send back json
		res.json(data);
	});
});


// IS LOGGED IN
router.get('/isLoggedIn', function(req, res) {
    if (req.isAuthenticated() == true) {
        // console.log("IS LOGGED IN, BETCH: " + req.user);
        res.send(req.user);
    }
    else {
        console.log("not logged in");
    }
});


// SIGNUP
router.post('/signup', passport.authenticate('local-signup', {
    failureRedirect: '/'}), function(req, res){
    console.log("USER STUFF HERE   " + req.user);
    res.send(req.user);
});



// LOGIN
router.post('/login', passport.authenticate('local-login'), function(req, res){
    res.send(req.user);
});



// LOGOUT
router.get('/logout', function(req, res) {
    console.log("LOGGING OUT");
    // log user out
    req.session.destroy();
    req.user = null;
    res.send(req.user);
    // redirect to index
    // res.send(req.user);
});



// GET SINGLE USER
router.get('/:id', function(req, res) {
    // res.locals.usertrue = (req.user.id == req.params.id);
    // console.log(req.params.id);
    User.findById(req.params.id, function(err, data) {
        // console.log(data);
        res.json(data);
    });
});


// PUT ROUTE TO ADD IMG TO USER'S GIF ARRAY
router.put('/:id', function(req, res) {
    console.log('we hit the add route');
    // user control - get req.user from passport
    // console.log("REQ.USER: " + req.user);
    res.locals.usertrue = (req.user.id == req.params.id);

    //count all occurrences of this gif in gif model
    Gif.findOne({"gifUrl": req.body.images.original.url}, function(err, gif){
        if (gif) {
            gif.likes +=1 ;
            console.log('gif likes: ' + gif.likes);
            gif.save();

                User.findById(req.params.id, function(err, user) {
                console.log("REQ.BODY: " + req.body.images.original.url);
                console.log("DATA: " + user);
                user.gifs.push(gif);
                user.save();
                console.log(user);
                });

        } else {
            var newGif = new Gif()
                console.log("here should be the url we are pushing to GIF model:    " + req.body.images.original.url)
                newGif.gifUrl = req.body.images.original.url;
                newGif.save()
                newGif.likes += 1
                newGif.save()

                    User.findById(req.params.id, function(err, user) {
                    console.log("REQ.BODY: " + req.body.images.original.url);
                    console.log("DATA: " + user);
                    user.gifs.push(newGif);
                    user.save();
                    console.log(user);
                    });
                }
    })
});




// middleware to check login status
function isLoggedIn(req, res, next) {
    console.log('isLoggedIn middleware');     
    if (req.isAuthenticated()) {
        console.log("successful login!")
        return next(); 
    } else {      
        console.log("BAD LOGIN")
        res.redirect('/');
    }
};


module.exports = router; // <----------------------------- END OF ROUTER










// REQUIREMENTS
var express = require('express');
var router = express.Router();
var User = require('../models/users.js');



// GET ALL USERS
router.get('/', function(req, res) {
	User.find({}, function(err, data) {
		res.json(data);
	});
});


// GET SINGLE USER
router.get('/:id', function(req, res) {
    // console.log(req.params.id);
    User.findById(req.params.id, function(err, data) {
        // console.log(data);
        res.json(data);
    });
});


// SIGN UP / NEW USER 
// router.post('/', function(req, res){
//     //use req.body to get data of new target
//     var newUser = new User(req.body);
//     newUser.save(function(err, data){
//         //once save happens, send back saved object
//         res.send(data);
//     });
// });


// SEED
var userSeed = [
	{name: "andy"},
	{name: "joe"},
	{name: "matt"},
	{name: "thom"}
];


//SEED
router.get('/seed', function(req, res) {
    User.create(userSeed, function(err) {
        if (err) {
            console.log(err);
            res.send('Error seeding database');
        } else {
            console.log('SEED EXECUTED');
            res.redirect('/user')
        }
    });
});


// PUT route to add gif to user's array
router.put('/:id', function(req, res) {
    // console.log(req.params.id);
    User.findById(req.params.id, function(err, data) {
        console.log(req.body.url);
        console.log(data.gifs);
        data.gifs.push(req.body.url);
        data.save();
        // console.log(data);
    });
});






module.exports = router;











// REQUIREMENTS
var express = require('express');
var router = express.Router();
var User = require('../models/users.js');



// router.get('/:id', function(req, res) {
// 	User.findById(req.params.id, function(err, data) {
// 		res.render('index.html', {
// 			// variable users in ejs = user data
// 			user: data
// 		});
// 	});
// });

// SHOW ALL USERS
router.get('/', function(req, res){
    User.find({}, function(user, err){
        console.log(user)
        res.json(user)
    })
})



// SIGN UP / NEW USER 
router.post('/', function(req, res){
    //use req.body to get data of new target
    var newUser = new User(req.body);
    newUser.save(function(err, data){
        //once save happens, send back saved object
        res.send(data);
    });
});


// SEED
var userSeed = [
	{name: "andy"},
	{name: "joe"},
	{name: "matt"},
	{name: "thom"}
];


router.get('/seed', function(req, res) {
    User.create(userSeed, function(err) {
        if (err) {
            console.log(err);
            res.send('Error seeding database');
        } else {
            console.log('SEED EXECUTED');
            res.redirect('/users')
        }
    });
});






module.exports = router;
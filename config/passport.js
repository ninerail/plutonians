var User = require('../models/users.js')
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport')

console.log("talking to passport")

module.exports = function(passport){

	// used to serialize the user for the session
	passport.serializeUser(function(user, done) {
		console.log("====***** SERIALIZING *****====")
		console.log("this is the *user* object:  " + user)
    	done(null, user.id);
	});


	// used to deserialize the user
	passport.deserializeUser(function(id, done) {
    	User.findById(id, function(err, user) {
    		console.log("===deserializ-ing===")
        	done(err, user);
        	console.log("this happens in deserializer:    " + user)
    	});
	});


	passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },

    function(req, email, password, done) {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err) {return done(err)};
            // check to see if theres already a user with that email
            if (user) {return done(null, false);
            } else {
            	console.log("we are about to make a new user!")
                // if there is no user with that email
                // create the user
                var newUser = new User();

                // set the user's local credentials
                newUser.email = email;
                newUser.password = newUser.generateHash(password);
                newUser.name = req.body.name;
                newUser.save(function(err) {
                	if (err) {console.log(err); throw err}
                	else {return done(null, newUser)}
                });

                // save the user
                
                };
        });    
    }));

	
	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, email, password, done) {
		
		console.log("this is the req.body.email:    " + req.body.email)
		console.log("this is the req.body.password:    " + req.body.password)
		User.findOne({ 'email': email }, function(err, user) {
			console.log("FOUND THE USER" + user)
			if (err) { return done(err) }

			if (!user) {
				console.log('NO USER FOUND');
				return done(null, false);
			}

			if (!user.validPassword(password)) {
				console.log('++++wrong password++++++')
				return done(null, false);
			}

			return done(null, user);
		}); // end find user

	} // end localstrategy params

	)); 

} // this the last curly!!!!!
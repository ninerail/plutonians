var app = angular.module('podcastApp', ['ngAnimate']);


// GET USER DATA CONTROLLER
app.controller('getOurData', ['$http', '$scope', function($http, $scope){

	// VARIABLE FOR THIS
	var self = this;

	// DISPLAY FORM IS FALSE
	this.displayForm = false;

	// SEARCH BOX IS POSITIONED CORRECTLY BEFORE LOGIN
	this.searchPosition = false;

	// MYGIFS DON'T SHOW BEFORE LOGIN
	this.myGifs = false;

	// GIF CONTAINER AUTO-SHOWS
	this.gifContainer = false;

	// CREATE EMPTY OBJECT TO HOLD USER ID
	var userObj = {};

	// EDIT FORM NOT VISIBLE ON PAGE LOAD
	this.editProfile = false;

	// LOGIN ERROR IS FALSE ON PAGE LOAD
	this.loginError = false;

	// HIDE SIGNUP FORM ON PAGE LOAD
	this.moreInfo = false;

	// HIDE SEARCH GIFS ON PAGE LOAD
	this.closedOut = false;


	// FACEBOOK SHARE BUTTON
	this.shareMe = function(item) {
		console.log(item.gifUrl);
		FB.ui({
			method: 'share',
			href: item.gifUrl,
			}, function(response){});
	}


	// USER LOGGED IN VERIFICATION
	this.getUser = function() {
		$http({
			method: 'GET',
			url: '/users/isLoggedIn'
		}).then(
		// success
		function(response) {
			console.log(response.data);
			// if statement to determine whether user is logged in or not
			if (response.data.username != null) {
				// user is logged in
				self.user = true;
				// variable to call in template
				self.single = response.data;
				// searchBox position goes to login position
				self.searchPosition = true;
				// MYGIFS SHOW DEFUALT
				self.myGifs = true;
				// id needs to be defined if already logged in
				userObj.id = response.data._id;
			}
			else {
				// user is not logged in
				self.user = false;
			};
		});
	};


	// EVOKE GET USER FUNCTION ON PAGE LOAD
	this.getUser();


	// FORM FUNCTION FOR SIGN UP FORM
	this.moreForm = function() {
		console.log("more form button was clicked");
		self.moreInfo = !self.moreInfo;
	}


	// SIGNUP FUNCTION
	this.signUp = function(){
		// console.log(this.signUpData);
		$http({
			method: 'POST',
			url: '/users/signup',
			data: this.signUpData
		}).then(
		//success
		function(response){
			console.log(response);
			// hide the first form 
			self.moreInfo = false;
			// console.log(response.data._id);
			self.single = response.data;
			// self.user = true for logged in data
			self.user = true;
			// change positioning of searchBox
			self.searchPosition = !self.searchPosition;

			// reset form
			self.signUpData.email = undefined;
			self.signUpData.password = undefined;
			self.signUpData.username = undefined;
			self.signUpData.imgUrl = undefined;
			self.signUpData.bio = undefined;
		});
	};


	// LOGIN FUNCTION
	this.logIn = function(){
		console.log("LOGIN function firing in app.js");
		$http({
			method: 'post',
			url: '/users/login',
			data: this.loginData
		}).then(
		//success
		function(response){
			console.log(response);
			// hide the first form 
			self.moreInfo = false;
			// loginerror boxes go away if needed
			this.loginError = false;
			// add id to userObj to be used later
			userObj.id = response.data._id;
			// variable to call in template
			self.single = response.data;
			// self.user = true for logged in data
			self.user = true;
			// SHOW GIFS
			self.myGifs = true;
			// change positioning of searchBox
			self.searchPosition = !self.searchPosition;
			// reset form
			self.loginData.email = undefined;
			self.loginData.password = undefined;
		},
		function(err){
			// make login error true to change class
	    	self.loginError = true;
			// create variable for element with login-status id
			var box = document.getElementById('login-status');
			// add text to p tag
	    	box.innerHTML = "Incorrect login, please try again!";
		}
		);
	};



	// EDIT PROFILE BUTTON FUNCTION
	this.editMe = function() {
		self.editProfile = true;
	};



	// EDIT PROFILE SUBMIT FUNCTION
	this.submitEdit = function() {
		// keep this to hide the form again after submit
		self.editProfile = false;
		
		console.log("edit submit is working");
		console.log(this)

		$http({
			method: 'POST',
			url: '/users/edit',
			data: this // set ng-models on edit form
		}).then(
		// success
		function(response){
			console.log(response)
			console.log($scope)
			$scope.ctrl.single.bio = response.data.bio;
			$scope.ctrl.single.imgUrl = response.data.imgUrl;
			$scope.ctrl.single.username = response.data.username;
			$scope.ctrl.single.email = response.data.email;
		},
		// err
		function(err){
			console.log(err)
		}
		)
		
	};



	// NG-CLICK ON IMAGE TO ADD TO USER'S ARRAY
	self.addImg = function(item, index) {
		if (self.user) {
			console.log("The image was clicked!");
			console.log(item);
			console.log(userObj.id);

			// get index number to darken with class
			console.log(index);
			this.selectedIndex = index;
			console.log(this.selectedIndex);

			$http({
				method: "PUT",
				url: "/users/" + userObj.id,
				data: item
			}).then(
			// success
			function(results) {
				// console.log("NG-CLICK ADDED ITEM TO USER ARRAY!!");
			});
		}
		else {
			console.log("not logged in");
		}
	};




	// FUNCTION TO SHOW FORM BY CHANGING CLASS
	this.formShow = function() {
		self.displayForm = !self.displayForm;
		// make red buttons go away
		self.loginError = false;
	};


	// SEARCH FOR GIF BUTTON
	this.searchGifs = function() {
		// hide search gifs
		self.closedOut = true;
		// call get user function
		self.getUser();
		// change state of gifContainer
		self.gifContainer = true;
		// show my gifs
		// self.myGifs = true;
		// remove yellow borders
		self.selectedIndex = null;
	};



	// HIDE/SHOW GIF CONTAINERS
	this.hideGifs = function() {
		// hide search gifs
		self.closedOut = false;
		// call get user function
		self.getUser();
		// change state of gifContainer
		self.gifContainer = !self.gifContainer
		// show my gifs
		self.myGifs = true;
		// remove yellow borders
		self.selectedIndex = null;
	};



	// SEARCH FUNCTION FOR API GIF DATA FOR VIEW
	this.getData = function(input){
		var controller = this;
		var id = this.input;
		console.log(id);
	
		$http({
			method: 'get',
			url: 'https://api.giphy.com/v1/gifs/search?q=' + id + '&api_key=dc6zaTOxFJmzC'
		}).then(
		//success
		function(response) {
			// show search box
			self.closedOut = true;
			// hide user gifs
			self.myGifs = false;
			// console.log(response.data.data);
			controller.stuff = response.data.data;
			// clear the form
			self.input = null;
		});
	};



	// LOGOUT
	this.logout = function() {
		$http({
			method: "GET",
			url: "/users/logout"
		}).then(
		// success
		function(response) {
			console.log("logged out");
			// make red buttons go away
			self.loginError = false;
			// reset all user logged in state and template objects
			self.single = null;
			self.user = false;
			self.myGifs = false;
			// change positioning of searchBox
			self.searchPosition = !self.searchPosition;
		});
	};



// DELETE GIF (from user's collection) FUNCTION
    this.deleteGif = function(image, index){
        console.log("delete function firing in app.js");
        console.log("this is the id of image to delete:  " + image._id)
        $http({
            method: 'delete',
            url: '/users/delete/' + image._id,
            data: this
        }).then(
        //success
        function(response){
            console.log($scope)
            console.log($scope.ctrl.single.gifs[index])
            $scope.ctrl.single.gifs.splice(index, 1)
            
        },
        function(err){
            console.log(err)
        }
        )

        
    }

}]);  //<------------------------------------------------  END OF CONTROLLER



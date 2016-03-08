var app = angular.module('podcastApp', []);


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

			}
			else {
				self.user = false;
			}
		});
	};



	// EVOKE GET USER FUNCTION ON PAGE LOAD
	this.getUser();



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

			// NG-CLICK ON IMAGE TO ADD TO USER'S ARRAY
			self.addImg = function(item) {
				console.log(item);

				$http({
					method: "PUT",
					url: "/users/" + self.single._id,
					data: item
				}).then(
				// success
				function(results) {
					console.log("NG-CLICK ADDED ITEM TO USER ARRAY!!");
				});
			};
		});
	}



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
			// NG-CLICK ON IMAGE TO ADD TO USER'S ARRAY
			self.addImg = function(item) {
				console.log("The image was clicked!");
				console.log(item);
	
				$http({
					method: "PUT",
					url: "/users/" + self.single._id,
					data: item
				}).then(
				// success
				function(results) {
					console.log("NG-CLICK ADDED ITEM TO USER ARRAY!!");
				});
			};
		});
	}



	// FUNCTION TO SHOW FORM BY CHANGING CLASS
	this.formShow = function() {
		self.displayForm = !self.displayForm;
	};



	// HIDE GIF CONTAINER
	this.hideGifs = function() {
		// call get user function
		self.getUser();
		// change state of gifContainer
		self.gifContainer = !self.gifContainer
		// show my gifs
		self.myGifs = true;
	};



	// SEARCH FUNCTION FOR API GIF DATA FOR VIEW
	this.getData = function(input){
		var controller = this;
		var id = this.input;
		console.log(id);
		$http({
			method: 'get',
			url: 'http://api.giphy.com/v1/gifs/search?q=' + id + '&api_key=dc6zaTOxFJmzC'
		}).then(
		//success
		function(response) {
			// console.log(response.data.data);
			controller.stuff = response.data.data;
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
			// reset all user logged in state and template objects
			self.single = null;
			self.user = false;
			self.myGifs = false;
		});
	}


}]);  //<------------------------------------------------  END OF CONTROLLER



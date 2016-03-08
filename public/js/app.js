var app = angular.module('podcastApp', ['ngStorage']);


// GET USER DATA CONTROLLER
app.controller('getOurData', ['$http', '$scope', function($http, $scope){

	// VARIABLE FOR THIS
	var self = this;

	// FALSE WHEN USER IS NOT LOGGED IN
	this.user = false;


	// User LoggedIn verification
	$http({
		method: 'GET',
		url: '/users/isLoggedIn'
	}).then(
	// success
	function(response) {
		console.log(response.data);
		// console.log(self);
		self.single = response.data;
		self.user = true;
		console.log(self);
		// this.single = response.data;
	});



	this.signUp = function(){
		console.log("SIGNUP function firing in app.js");
		$http({
			method: 'POST',
			url: '/users/signup',
			data: this.signUpData
		}).then(
		//success
		function(response){
			console.log(response);
			console.log(response.data._id);
			self.single = response.data;
			// self.user = true for logged in data
			self.user = true;

			// reset form
			self.signUpData.email = undefined;
			self.signUpData.password = undefined;

			// NG-CLICK ON IMAGE TO ADD TO USER'S ARRAY
			self.addImg = function(item) {
				console.log("The image was clicked!");
				console.log(item);
				console.log(self.single);
				console.log(self.single._id);
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
			console.log($scope);
			self.single = response.data;
			// self.user = true for logged in data
			self.user = true;

			// reset form
			self.loginData.email = undefined;
			self.loginData.password = undefined;

			// NG-CLICK ON IMAGE TO ADD TO USER'S ARRAY
			self.addImg = function(item) {
				console.log("The image was clicked!");
				console.log(item);
				// var self = this;
				console.log(self.single);
				console.log(self.single._id);
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
			console.log($scope);
			// console.log(response.data.data[1].images);
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
			console.log(response);
			console.log("logged out");
			self.single = response.data;
		});
	}


}]);  //<------------------------------------------------  END OF CONTROLLER








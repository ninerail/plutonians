var app = angular.module('podcastApp', []);

app.config(function ($httpProvider){

$httpProvider.interceptors.push(function($q, $location) { 
return { 
	response: function(response) { 
	// do something on success 
	return response; 
}, 
	responseError: function(response) { 
		if (response.status === 401) 
			$location.url('/login'); 
		return $q.reject(response); 
	} 
}; 
});
	
})




app.controller('getOurData', ['$http', '$scope', function($http, $scope){

	var self = this;

	this.signUp = function(){
		console.log("SIGNUP function firing in app.js")

		$http({

			method: 'post',
			url: '/users/signup',
			data: this.signUpData
		}).then(
			//success
			function(response){
				console.log(response)
			},
			function(err){
				console.log(err)
			}
		)

	}

	this.logIn = function(){
		console.log("LOGIN function firing in app.js")
		$http({

			method: 'post',
			url: '/users/login',
			data: this.loginData
		}).then(
		//success
		function(response){
			console.log(response)

		},
		function(err){
			console.log(err)
		}
		)

	}
	// GET ALL USERS
	// $http.get('/users').then(
	// 	// success
	// 	function(result) {
	// 		console.log(result.data);
	// 		self.users = result.data;
	// });


	// pretend user id
	var id = "56dc691bb098765cbc9dc896";


	// GET SINGLE USER
	$http.get('/users/' + id).then(
		// success
		function(result) {
			console.log(result);
			self.single = result.data;
	});


	// getData function to have data from api show on view
	this.getData = function(input){
		var controller = this;
		var id = this.input;
		console.log(id);
		$http({
			method: 'get',
			url: 'http://api.giphy.com/v1/gifs/search?q=' + id + '&api_key=dc6zaTOxFJmzC'
		}).then(
		//success
		function(response){
			console.log($scope)
			// console.log(response.data.data[1].images);
			// console.log(response.data.data[2].images);
			// console.log(response.data.data);
			// for (var i = 0; i < response.data.data.length; i++) {
			// 	console.log(response.data.data[i].url);
				controller.stuff = response.data.data;
			// }
			// console.log(response.data.data);
		},
		//error
		function(err){
			console.log(err)
		}
		)};

		// console.log(this.hiddenUrl);

	// function for ng-click on the image 
	this.addImg = function(item) {
	
		console.log(item);
		// var self = this;
		console.log(id);
		// console.log(url);
		// // var newUrl = url;

		// console.log(urlData);
		
		// console.log("newURL: ", newUrl);
		$http({
			method: "PUT",
			url: "/users/" + id,
			data: item
		}).then(
		// success
		function(results) {
			console.log("This worked!");
		}),
		function() {
			console.log(err);
		}
	};



}]);

























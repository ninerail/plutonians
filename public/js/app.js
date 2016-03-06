var app = angular.module('podcastApp', []);


app.controller('getOurData', ['$http', '$scope', function($http, $scope){

	var self = this;

	// GET ALL USERS
	$http.get('/users').then(
		// success
		function(result) {
			console.log(result.data);
			self.users = result.data;
	});


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
	this.addImg = function(url) {
	
		console.log(this);
		var self = this;
		console.log(id);
		// console.log(url);
		// // var newUrl = url;
		var urlData = JSON.stringify(url);
		// console.log(urlData);
		
		// console.log("newURL: ", newUrl);
		$http({
			method: "PUT",
			url: "/users/" + id,
			data: urlData
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

























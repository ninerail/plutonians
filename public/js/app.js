var app = angular.module('podcastApp', [])

app.controller('getOurData', ['$http', '$scope', function($http, $scope){

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


		)
	}


}])
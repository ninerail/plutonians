var app = angular.module('podcastApp', [])

app.controller('getOurData', ['$http', '$scope', function($http, $scope){

	this.getData = function(){
		var controller = this
		$http({

			method: 'get',
			url: 'http://swapi.co/api/people/1/'
		}).then(
		//success
		function(response){
			console.log(response)
			controller.stuff = response.films
			
		},
		//error
		function(err){
			console.log(err)
		}


		)
	}


}])
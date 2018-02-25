var app = angular.module('quranApp',['ngRoute']);
app.config(function ($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl: 'editions.html',
		controller: 'editionsCtrl'
	})
	.when('/surahs/:identifier',{
		templateUrl: 'surahs.html',
		controller: 'surahsCtrl'
	})
	.when('/ayahs/:identifier/:surahNumber',{
		templateUrl: 'ayahs.html',
		controller: 'ayahsCtrl'
	})
	.otherwise({
		template: '<h1>None</h1><p>Nothing has been selected</p>'
	});
});
app.controller('mainCtrl',function ($scope,$http) {
	

	

	
	
});

app.controller('editionsCtrl',function ($scope,$http) {
	$scope.editions = [];

	//Get all Editions // This method is called by ng-init at the time of loading the app
	$scope.getEditions = function () {
		$http({
		  method: 'GET',
		  url: 'http://api.alquran.cloud/edition'
		}).then(function successCallback(response) {
			//Store the data array in $scope.editions
		    $scope.editions = response.data.data;
		  }, function errorCallback(response) {
		    console.log(response.error);
		  });
	};
});

app.controller('surahsCtrl',function ($scope,$http,$routeParams) {

	var identifier = $routeParams.identifier;
	$scope.getCompleteQuran = function () {
		console.log(identifier);
		$http({
		  method: 'GET',
		  url: 'http://api.alquran.cloud/quran/'+ identifier
		}).then(function successCallback(response) {
			//Store the data object in $scope.surahs
			console.log(response.data.data)
		    $scope.surahs = response.data.data.surahs;
		    $scope.identifier = identifier;
		    $scope.editions = [];
		  }, function errorCallback(response) {
		    console.log(response);
		  });

	}

	$scope.chooseSurah = function () {
		$http({
		  method: 'GET',
		  url: 'http://api.alquran.cloud/surah/'+ identifier + surahNumber
		}).then(function successCallback(response) {
			//Store the data object in $scope.surahs
			console.log(response.data.data)
		    $scope.surahs = response.data.data.surahs;
		    $scope.identifier = identifier;
		    $scope.editions = [];
		  }, function errorCallback(response) {
		    console.log(response);
		  });
	}
});


app.controller('ayahsCtrl',function ($scope,$http,$routeParams) {

	var identifier = $routeParams.identifier;
	var surahNumber = $routeParams.surahNumber;

	$scope.chooseSurah = function () {
		$http({
		  method: 'GET',
		  url: 'http://api.alquran.cloud/surah/'+ surahNumber + '/' + identifier
		}).then(function successCallback(response) {
			//Store the data object in $scope.ayahs
			console.log(response.data.data)
		    $scope.ayahs = response.data.data.ayahs;
		  }, function errorCallback(response) {
		    console.log(response);
		  });
	}
});
app.controller('navbarCtrl',function ($scope,$http,$rootScope,apiService) {
	if ($rootScope.identifier === undefined) {
		$rootScope.identifier = 'ar.muyassar';	
	};

	if ($rootScope.type === undefined) {
		$rootScope.type = 'all';	
	};

	apiService.editions(function(editions) {
		 $scope.editions = editions;
	});

	apiService.types(function(types) {
		$scope.types = [];
		$scope.types = types;
		$scope.types.unshift('all');
	});

	$scope.setType = function (type) {
		$rootScope.type = type;
	};

	$scope.saveIdentifier = function (identifier) {
		$rootScope.identifier = identifier;
	};
});

app.controller('editionsCtrl',function ($scope,$http,apiService) {
	$scope.editions = [];
	$scope.languages =[];

	// $scope.getEditionsLanguages = function () {
	// 	$http({
	// 	  method: 'GET',
	// 	  url: 'http://api.alquran.cloud/edition/language'
	// 	}).then(function successCallback(response) {
	// 		//Store the data array in $scope.editions
	// 	    $scope.languages = response.data.data;
	// 	    console.log($scope.languages);
	// 	  }, function errorCallback(response) {
	// 	    console.log(response.error);
	// 	  });
	// };

	apiService.editions(function(editions) {
		 $scope.editions = editions;
	});

	apiService.languages(function(languages) {
		 $scope.languages = languages;
	});
});

app.controller('listJuzCtrl',function ($scope,$rootScope) {
	$scope.juzNumbers = [];
	for (var i = 1; i <= 30; i++) {
		$scope.juzNumbers.push(i);
	};

	$scope.identifier = $rootScope.identifier;
})

app.controller('surahsCtrl',function ($scope,$http,$stateParams,apiService) {

	var identifier = $stateParams.identifier;
	$scope.identifier = identifier;

	apiService.quran(function(quran) {
		 $scope.surahs = quran;
	});

	// $scope.chooseSurah = function () {
	// 	$http({
	// 	  method: 'GET',
	// 	  url: 'http://api.alquran.cloud/surah/'+ identifier + surahNumber
	// 	}).then(function successCallback(response) {
	// 		//Store the data object in $scope.surahs
	// 		console.log(response.data.data)
	// 	    $scope.surahs = response.data.data.surahs;
	// 	    $scope.identifier = identifier;
	// 	    $scope.editions = [];
	// 	  }, function errorCallback(response) {
	// 	    console.log(response);
	// 	  });
	// };

	// apiService
	// 	.getSurah(identifier,surahNumber)
	// 	.then(function successCallback(response) {
	// 		//Store the data object in $scope.surahs
	// 		console.log(response.data.data)
	// 	    $scope.surahs = response.data.data.surahs;
	// 	    $scope.identifier = identifier;
	// 	    $scope.editions = [];
	// 	}, function errorCallback(response) {
	// 	    console.log(response);
	// 	});

});


app.controller('ayahsCtrl',function ($scope,$http,$stateParams,apiService) {

	var identifier = $stateParams.identifier;
	var surahNumber = $stateParams.surahNumber;

	apiService
		.getSurah(surahNumber,identifier)
		.then(function successCallback(response) {
			//Store the data object in $scope.ayahs
		    $scope.ayahs = response.data.data.ayahs;
		}, 	function errorCallback(response) {
		   	console.log(response);
		});
});

app.controller('juzCtrl',function ($scope,$http,$stateParams,apiService) {

	var identifier = $stateParams.identifier;
	var juzNumber = $stateParams.juzNumber;

	apiService
		.getJuz(juzNumber,identifier)
		.then(function successCallback(response) {
			//Store the data object in $scope.ayahs
			console.log(response.data.data)
		    $scope.ayahs = response.data.data.ayahs;
		  }, function errorCallback(response) {
		    console.log(response);
		  });
});

app.controller('resourcesCtrl',function ($scope,$http,$stateParams,apiService) {
	var type = $stateParams.type;
	// $scope.chooseResources = function () {
	// 	$http({
	// 	  method: 'GET',
	// 	  url: 'http://api.alquran.cloud/edition/type/' + type
	// 	}).then(function successCallback(response) {
	// 		//Store the data object in $scope.resources
	// 	    $scope.resources = response.data.data;
	// 	  }, function errorCallback(response) {
	// 	    console.log(response);
	// 	  });
	// };

	apiService
		.getType(type)
		.then(function successCallback(response) {
				//Store the data object in $scope.resources
			    $scope.resources = response.data.data;
			  }, function errorCallback(response) {
			    console.log(response);
			  });
});

app.service('apiService', function($http){
	this.editions = getEditions;
	this.types = getTypes;
	this.languages = getEditionsLanguages;
	this.quran = listSurah;

	function getEditions(callback) {
		$http({
		  method: 'GET',
		  url: 'http://api.alquran.cloud/edition'
		}).then(function successCallback(response) {
			//Store the data array in $scope.editions
		    callback(response.data.data);
		  }, function errorCallback(response) {
		    console.log(response.error);
		  });
	};

	function getTypes(callback) {
		$http({
		  method: 'GET',
		  url: 'http://api.alquran.cloud/edition/type'
		}).then(function successCallback(response) {
			//Store the data array in $scope.types
		    callback(response.data.data);
		  }, function errorCallback(response) {
		    console.log(response.error);
		  });
	};

	function getEditionsLanguages(callback) {
		$http({
		  method: 'GET',
		  url: 'http://api.alquran.cloud/edition/language'
		}).then(function successCallback(response) {
			//Store the data array in $scope.editions
		    callback(response.data.data);
		  }, function errorCallback(response) {
		    console.log(response.error);
		  });
	};

	function listSurah(callback) {
		$http({
		  method: 'GET',
		  url: 'http://api.alquran.cloud/surah'
		}).then(function successCallback(response) {
			//Store the data object in $scope.surahs
		    callback(response.data.data);
		  }, function errorCallback(response) {
		    console.log(response);
		  });
	};

	this.getSurah = function(surahNumber,identifier) {
		return 	$http({
				  method: 'GET',
				  url: 'http://api.alquran.cloud/surah/'+ surahNumber + '/' + identifier
				})
	};

	this.getJuz = function (juzNumber,identifier) {
		return  $http({
				  method: 'GET',
				  url: 'http://api.alquran.cloud/juz/'+ juzNumber + '/' + identifier
				})
	};

	this.getType = function (type) {
		return 	$http({
				  method: 'GET',
				  url: 'http://api.alquran.cloud/edition/type/' + type
				})
	};

	// this.getSurah = function (identifier,surahNumber) {
	// 	return $http({
	// 	  method: 'GET',
	// 	  url: 'http://api.alquran.cloud/surah/'+ identifier + surahNumber
	// 	})
	// };
})
app.controller('navbarCtrl',function ($scope,$http,$rootScope) {
	//Get all Editions // This method is called by ng-init at the time of loading the app
	if ($rootScope.identifier === undefined) {
		$rootScope.identifier = 'ar.muyassar';	
	}
	
	$scope.getEditions = function () {
		console.log('getEditions');
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

	$scope.saveIdentifier = function (identifier) {
		$rootScope.identifier = identifier;
	}
});

app.controller('editionsCtrl',function ($scope,$http) {
	$scope.editions = [];

	// //Get all Editions // This method is called by ng-init at the time of loading the app
	// $scope.getEditions = function () {
	// 	console.log('getEditions');
	// 	$http({
	// 	  method: 'GET',
	// 	  url: 'http://api.alquran.cloud/edition'
	// 	}).then(function successCallback(response) {
	// 		//Store the data array in $scope.editions
	// 	    $scope.editions = response.data.data;
	// 	  }, function errorCallback(response) {
	// 	    console.log(response.error);
	// 	  });
	// };

	$scope.getEditionsLanguages = function () {
		$http({
		  method: 'GET',
		  url: 'http://api.alquran.cloud/edition/language'
		}).then(function successCallback(response) {
			//Store the data array in $scope.editions
		    $scope.languages = response.data.data;
		    console.log($scope.languages);
		  }, function errorCallback(response) {
		    console.log(response.error);
		  });
	};
});

app.controller('listJuzCtrl',function ($scope) {
	$scope.juzNumbers = [];
	for (var i = 1; i <= 30; i++) {
		$scope.juzNumbers.push(i);
	}
})

app.controller('surahsCtrl',function ($scope,$http,$stateParams) {
	var identifier = $stateParams.identifier;
	$scope.getCompleteQuran = function () {
		console.log(identifier);
		$http({
		  method: 'GET',
		  url: 'http://api.alquran.cloud/surah'
		}).then(function successCallback(response) {
			//Store the data object in $scope.surahs
			console.log(response.data.data)
		    $scope.surahs = response.data.data;
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


app.controller('ayahsCtrl',function ($scope,$http,$stateParams) {
	console.log('ayahsCtrl');

	var identifier = $stateParams.identifier;
	var surahNumber = $stateParams.surahNumber;

	$scope.chooseAyah = function () {
		$http({
		  method: 'GET',
		  url: 'http://api.alquran.cloud/surah/'+ surahNumber + '/' + identifier
		}).then(function successCallback(response) {
			//Store the data object in $scope.ayahs
			console.log(response.data.data);
		    $scope.ayahs = response.data.data.ayahs;
		  }, function errorCallback(response) {
		    console.log(response);
		  });
	}
});

app.controller('juzCtrl',function ($scope,$http,$routeParams) {

	var identifier = $routeParams.identifier;
	var juzNumber = $routeParams.juzNumber;

	$scope.chooseJuz = function () {
		$http({
		  method: 'GET',
		  url: 'http://api.alquran.cloud/juz/'+ juzNumber + '/' + identifier
		}).then(function successCallback(response) {
			//Store the data object in $scope.ayahs
			console.log(response.data.data)
		    $scope.ayahs = response.data.data.ayahs;
		  }, function errorCallback(response) {
		    console.log(response);
		  });
	}
});
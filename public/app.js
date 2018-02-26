var app = angular.module('quranApp',['ngRoute']);

/* ------------ ROUTES -------------*/
app.config(function ($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl: '/html/homepage.html',
		controller: 'homeCtrl'
	})
	.when('/editions',{
		templateUrl: '/html/editions.html',
		controller: 'editionsCtrl'
	})
	.when('/surahs/:identifier',{
		templateUrl: '/html/surahs.html',
		controller: 'surahsCtrl'
	})
	.when('/ayahs/:identifier/:surahNumber',{
		templateUrl: '/html/ayahs.html',
		controller: 'ayahsCtrl'
	})
	.when('/juz/:identifier/:juzNumber',{
		templateUrl: '/html/juz.html',
		controller: 'juzCtrl'
	})
	.otherwise({
		template: '404 NOT FOUND'
	});
});

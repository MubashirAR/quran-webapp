var app = angular.module('quranApp',['ui.router']);

/* ------------ ROUTES -------------*/
app.config(function ($stateProvider) {
	$stateProvider
		.state('home',{
			url: '',
			views: {
				'navbar': {
					templateUrl: '/html/navbar.html',
					controller: 'navbarCtrl'
				}
			}
			
		})
		.state('editions',{
			url: '/editions',
			views: {
				'navbar': {
					templateUrl: '/html/navbar.html',
					controller: 'navbarCtrl'
				},
				'body': {
					templateUrl: '/html/editions.html',
					controller: 'editionsCtrl'
				}
			}
		})
		.state('surahs',{
			url: '/surahs/:identifier',
			views: {
				'navbar': {
					templateUrl: '/html/navbar.html',
					controller: 'navbarCtrl'
				},
				'body': {
					templateUrl: '/html/surahs.html',
					controller: 'surahsCtrl'
				}
			}
			
		})
		.state('ayahs',{
			url: '/ayahs/:identifier/:surahNumber',
			views: {
				'navbar': {
					templateUrl: '/html/navbar.html',
					controller: 'navbarCtrl'
				},
				'body': {
					templateUrl: '/html/ayahs.html',
					controller: 'ayahsCtrl'
				}
			}
			
		})
		.state('listJuz',{
			url: '/listJuz/:identifier',
			views: {
				'navbar': {
					templateUrl: '/html/navbar.html',
					controller: 'navbarCtrl'
				},
				'body': {
					templateUrl: '/html/juz.all.html',
					controller: 'listJuzCtrl'
				}
			}
		})
		.state('juz',{
			url: '/juz/:identifier/:juzNumber',
			views: {
				'navbar': {
					templateUrl: '/html/navbar.html',
					controller: 'navbarCtrl'
				},
				'body': {
					templateUrl: '/html/juz.html',
					controller: 'juzCtrl'
				}
			}
		})
		// .otherwise({
		// 	template: '404 NOT FOUND'
		// });
});

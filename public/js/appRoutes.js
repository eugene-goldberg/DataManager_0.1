angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/tabcontrol', {
			templateUrl: 'views/tabcontrol.html',
			controller: 'TabController'
		})

		.when('/geeks', {
			templateUrl: 'views/geek.html',
			controller: ''
		});

	$locationProvider.html5Mode(true);

}]);
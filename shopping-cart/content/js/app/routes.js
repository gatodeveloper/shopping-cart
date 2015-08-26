app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider
		.otherwise("/");
		$stateProvider
		.state('home', {
			url: "/",
			templateUrl: "partials/home/home.html",
			controller: 'HomeCtrl',
			//abstract : true ,
		})
		.decorator('$uiViewScroll', function ($delegate) {
		debugger;
	})
})
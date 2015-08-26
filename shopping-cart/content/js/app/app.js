var app = angular.module('shopping-cart', [
	/*'app.routes',*/
	'app.controllers',
	'app.models',
	'ui.router',
	'ui.bootstrap',
	'ngStorage',
])
.run(function($rootScope) {
    $rootScope.test = new Date();
})
app.value('Configurations', {
	server: 'http://localhost:3000/api/'
});
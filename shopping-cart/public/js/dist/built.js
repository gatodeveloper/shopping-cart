/**
 * expresion-front - expresion
 * @version v0.0.0
 * @link http://www.expresion.co
 * @license BSD-2-Clause
 */
/**
 * Find controllers at app/controllers
 */
angular.module('app.controllers', []);
/**
 * Find models at app/models
 */
angular.module('app.models', []);
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
angular.module('app.controllers')
  .controller('HomeCtrl', ['$scope', '$rootScope', 'Services',
    function ($scope, $rootScope, Services) {


    	$scope.init = function( data ){
    		var data = $rootScope.shoppingCart
    		debugger;
			Services.products.getAll( data ).success(function (data) {
	        	$scope.products = data.results;
	      	});
    	};
    	$scope.$on('deleteProductShoppingCart', function(event, data) {
			$scope.init();
		});
    	$scope.init();

      	$scope.addProduct = function( productId ){
      		var userId = 1;
      		Services.shoppingCart.postProduct( userId, productId ).success(function (data) {
      			var noProducts = $rootScope.shoppingCart || [];
      			noProducts.push( productId )
      			debugger;
      			$scope.init( noProducts );
      			$rootScope.$broadcast('addProductShoppingCart', data);
	      	});
      	};
    }
  ]);
angular.module('app.controllers')
  .controller('MainCtrl', ['$scope', '$rootScope', function($scope, $rootScope ) {
     $rootScope.globals = {}
     $rootScope.shoppingCart = [];
    $rootScope.$on('$stateChangeSuccess', function() {
       document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
  }])
app.factory('Services', [ '$http', '$rootScope', 'Configurations', 
  function ($http, $rootScope, Configurations ) {

    var server = Configurations.server;

    return {
      products: {
        getAll: function( data ){
          return $http.get(server + 'products', { params: { noProduct: data }})
        }
      },
      shoppingCart: {
        getProducts : function( userId, data ){
          return $http.get(server + 'cart/' + userId )
        },
        postProduct : function( userId, productId ){
          debugger;
          return $http.post(server + 'cart/' + userId, { product: productId })
        },
        deleteProduct : function( userId, productId ){
          return $http.delete(server + 'cart/' + userId + '/products/' + productId )
        }
      }
    };
  }
]);
angular.module('app.controllers')
	.controller('ShoppingCartCtrl', ['$scope', '$rootScope', '$timeout', 'Services', 
	    function ($scope, $rootScope, $timeout, Services) {

	    	$scope.init = function(){
		    	var userId = 1;
		 		Services.shoppingCart.getProducts( userId ).success(function (data) {
		        	$scope.products = data.products || [];
		        	var total = 0
		        	$scope.products.forEach(function( v, k ){
		        		total += v.price
		        	});
		        	$scope.total = total;
		        	var products = $scope.products || [];
		        	var noProducts = [];
		        	$rootScope.shoppingCart = products.filter( function( p ){
		        		noProducts.push( p._id );
		        	})
		        	$rootScope.shoppingCart = noProducts;
		      	});
	    	}
	    	$scope.init();

	    	$scope.$on('addProductShoppingCart', function(event, data) {
				$scope.init();
  			});
  			
	      	$scope.deleteProduct = function( productId ){
	      		var userId = 1;
	      		Services.shoppingCart.deleteProduct( userId, productId ).success(function (data) {
	      			var noProducts = $rootScope.shoppingCart.filter( function( p ){
		        		return (productId != p);
		        	})
		        	$rootScope.shoppingCart = noProducts;
	      			$scope.init();
	      			$rootScope.$broadcast('deleteProductShoppingCart', data);
		      	});
	      	};


		}
	]);
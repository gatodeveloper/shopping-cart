angular.module('app.controllers')
  .controller('HomeCtrl', ['$scope', '$rootScope', 'Services',
    function ($scope, $rootScope, Services) {


    	$scope.init = function( data ){
    		var data = $rootScope.shoppingCart
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
      			$scope.init( noProducts );
      			$rootScope.$broadcast('addProductShoppingCart', data);
	      	});
      	};
    }
  ]);
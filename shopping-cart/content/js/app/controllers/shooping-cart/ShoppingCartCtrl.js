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
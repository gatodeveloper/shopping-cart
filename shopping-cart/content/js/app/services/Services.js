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
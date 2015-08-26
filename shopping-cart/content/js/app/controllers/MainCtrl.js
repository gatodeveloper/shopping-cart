angular.module('app.controllers')
  .controller('MainCtrl', ['$scope', '$rootScope', function($scope, $rootScope ) {
     $rootScope.globals = {}
     $rootScope.shoppingCart = [];
    $rootScope.$on('$stateChangeSuccess', function() {
       document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
  }])
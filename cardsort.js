angular.module('cardSort', [])
  .controller('ListEntryCtrl', function($scope) {

    $scope.items = "a\nb\nc";
    $scope.splitItems = null;

    $scope.parseItems = function() {
      $scope.splitItems = $scope.items.trim().split("\n");
    }

  });

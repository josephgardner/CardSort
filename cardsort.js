angular.module('cardSort', [])
  .service('quickSort', function() {
    var splitItems = null;

    this.setText = function(items) {
      splitItems = items.trim().split("\n");
    };

    this.getSorted = function() {
      return splitItems;
    };

  })
  .controller('ListEntryCtrl', function($scope, quickSort) {

    $scope.items = "a\nb\nc";

    $scope.parseItems = function() {
      quickSort.setText($scope.items);
    };

    $scope.sortedItems = quickSort.getSorted;

  });

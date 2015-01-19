Array.prototype.unique = function() {
  return this.filter(function(v, i, a) {
    return a.indexOf(v) == i
  });
}

angular.module('cardSort', [])
  .service('quickSort', function() {
    var splitItems = null;

    this.setText = function(text) {
      splitItems = text.trim().split("\n").unique();
      quickSort(splitItems);
    };

    this.getSorted = function() {
      return splitItems;
    };

    function swap(items, firstIndex, secondIndex) {
      var temp = items[firstIndex];
      items[firstIndex] = items[secondIndex];
      items[secondIndex] = temp;
    }

    function partition(items, left, right) {

      var pivot = items[Math.floor((right + left) / 2)],
        i = left,
        j = right;


      while (i <= j) {

        while (items[i] < pivot) {
          i++;
        }

        while (items[j] > pivot) {
          j--;
        }

        if (i <= j) {
          swap(items, i, j);
          i++;
          j--;
        }
      }

      return i;
    }

    function quickSort(items, left, right) {

      var index;

      if (items.length > 1) {

        left = typeof left != "number" ? 0 : left;
        right = typeof right != "number" ? items.length - 1 : right;

        index = partition(items, left, right);

        if (left < index - 1) {
          quickSort(items, left, index - 1);
        }

        if (index < right) {
          quickSort(items, index, right);
        }

      }

      return items;
    }

  })
  .controller('ListEntryCtrl', function($scope, quickSort) {

    $scope.items = "a\nb\nc";

    $scope.parseItems = function() {
      quickSort.setText($scope.items);
      $scope.sortedItems = quickSort.getSorted;
    };
  });

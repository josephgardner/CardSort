Array.prototype.unique = function() {
    return this.filter(function(v, i, a) {
        return a.indexOf(v) == i
    });
}

angular.module('cardSort', [])
.service('quickSort', function() {

    this.startSort = function(items){
        return quickSort(items);
    }

    function swap(items, firstIndex, secondIndex) {
        var temp = items[firstIndex];
        items[firstIndex] = items[secondIndex];
        items[secondIndex] = temp;
    }

    function quickSort(items, left, right) {
        var pivot,
            i,
            j,
            sortLeft,
            sortRight,
            resumeQs;

        if (items.length > 1) {
            left = typeof left != "number" ? 0 : left;
            right = typeof right != "number" ? items.length - 1 : right;

            // capture values in the closure
            pivot = items[Math.floor((right + left) / 2)];
            i = left;
            j = right;
            leftSide = true;

            // perform another iteration of quick sort with new partitions
            resumeQs = function(){
                if (left < i - 1) {
                    return quickSort(items, left, i - 1);
                }
                else if (i < right) {
                    return quickSort(items, i, right);
                }
            }

            // sort the left hand side of an item partition. continues to
            // right hand side once the sort is finished
            sortLeft = function(itemLessThanPivot){
                if (i > j){
                    return resumeQs();
                }

                if(itemLessThanPivot == null) {
                    // do nothing. this will allow the user to
                    // compare the first two values
                }
                else if(itemLessThanPivot === true) {
                    i++;
                }
                else {
                    // start the right hand side
                    return sortRight(null);
                }

                return {
                    'left' : items[i],
                    'right' : pivot,
                    'cont' : sortLeft,
                    'isLessThanComp': true
                };
            }

            // sort the right hand side of an item partition. continues to
            // left hand side once the sort is finished
            sortRight = function(itemGreaterThanPivot){
                if(itemGreaterThanPivot == null) {
                    // do nothing. this will allow the user to
                    // compare the first two values
                }
                else if(itemGreaterThanPivot) {
                    j--;
                }
                else {
                    if (i <= j) {
                        swap(items, i, j);
                        i++,
                        j--;
                    }
                    return sortLeft(null);
                }

                return {
                    'left' : items[j],
                    'right' : pivot,
                    'cont' : sortRight,
                    'isLessThanComp': false
                };
            }

            return sortLeft(null);

        }
    }

})
.controller('ListEntryCtrl', function($scope, quickSort) {

    $scope.items = "a\nb\nc";

    $scope.sortState = null;

    $scope.cont = function(itemLessThanPivot){
        $scope.sortState = $scope.sortState.cont(itemLessThanPivot);
    };

    $scope.parseItems = function() {

        // set the sorted items here. Objects are pass by ref so any
        // sorting we do on this list gets reflected as the user sorts. Added
        // bonus is the list of sorted items updates in the ui as the user works
        // through them
        $scope.sortedItems = $scope.items.trim().split("\n").unique();

        $scope.sortState = quickSort.startSort($scope.sortedItems);
    };

});


// moved from app.js  to a its very own controller file!  best practice!
angular.module('app').controller('mvMainCtrl', ['$scope', function ($scope) {
    $scope.myVar = "Hello Angular";
}]);
angular.module('app').controller('mvNavBarLoginCtrl', ['$scope', function ($scope) {
    //$scope.email;
    //$scope.password;
    $scope.signin = function(email, password){
        //$scope.email = email;
        //$scope.password = password;
        alert("Password = " + password +
                " and email = " + email);
        console.log("I'm not done yet ");
    };
}]);

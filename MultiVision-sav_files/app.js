// create our app module with dependencies on the ngResource and ngRout modules
angular.module('app', ['ngResource', 'ngRoute']);

// config our app to use the route provider and the location provider
angular.module('app').config(function ($routeProvider, $locationProvider) {
    // turn on html5 mode for routing
    //https://docs.angularjs.org/api/ng/provider/$locationProvider
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    // define client routes
    $routeProvider
        .when('/', { templateUrl: 'partials/main/main', controller: 'mvMainCtrl'});
});


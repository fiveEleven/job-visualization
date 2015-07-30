app.config(function ($routeProvider) {
  $routeProvider
    .when('/',{
        templateUrl: '/partials/main.partial.html',
        controller: "MainController",
        controllerAs: "main"
    })
    .otherwise({
        redirectTo: '/',
    });
});
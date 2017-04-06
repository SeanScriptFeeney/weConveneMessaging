'use strict';

angular.module('acmeMessaging', ['ui.router','ngResource'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                    },
                    'content': {
                        templateUrl : 'views/login.html',
                        controller  : 'LoginController',
                        controllerAs: 'login'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }
            })

            // route for the aboutus page
            .state('app.dashboard', {
                url:'dashboard',
                views: {
                    'content@': {
                        templateUrl : 'views/dashboard.html',
                        controller  : 'MainController',
                        controllerAs: 'main'                  
                    }
                }
            })
    
        $urlRouterProvider.otherwise('/');
    })
;

'use strict';

angular.module('acmeMessaging', ['ui.router','ngResource'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'content': {
                        templateUrl : 'views/login.html',
                        controller  : 'LoginController'
                    }
                }
            })

            // route for the dashboard page
            .state('app.dashboard', {
                url:'dashboard',
                views: {
                    'header@':{
                        templateUrl : 'views/header.html',
                    },
                    'content@': {
                        templateUrl : 'views/dashboard.html',
                        controller  : 'MainController',
                        controllerAs: 'main'                  
                    },
                    'footer@': {
                        templateUrl : 'views/footer.html',
                    }
                }
            })
    
        $urlRouterProvider.otherwise('/');
    })
;

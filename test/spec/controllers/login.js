'use strict';

// testing controller
describe('LoginController', function() {
   var $httpBackend, $rootScope, createController;

   // Set up the module
   beforeEach(module('acmeMessaging'));

   beforeEach(inject(function($injector) {
     // Set up the mock http service responses
     $httpBackend = $injector.get('$httpBackend');

     // Get hold of a scope (i.e. the root scope)
     $rootScope = $injector.get('$rootScope');
     // The $controller service is used to create instances of controllers
     var $controller = $injector.get('$controller');

     createController = function() {
       return $controller('LoginController', {'$scope' : $rootScope });
     };
   }));

   afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });


   it('should get credentials', function() {
     var controller = createController();


     $rootScope.loginCredentials.username = "seanscriptfeeney@gmail.com";
     $rootScope.loginCredentials.password = "pass";

     $httpBackend.expectGET("http://localhost:3000/users").respond([
            {
                "username": "seanscriptfeeney@gmail.com",
                "password": "pass"
            }
        ]);


     $rootScope.login();
     $httpBackend.flush();
     expect($rootScope.users[0].username).toBe("seanscriptfeeney@gmail.com");
     expect($rootScope.users[0].password).toBe("pass");
     
   });


    it('should fail getting credentials', function() {
     var controller = createController();


     $rootScope.loginCredentials.username = "testing@gmail.com";
     $rootScope.loginCredentials.password = "testing";

     $httpBackend.expectGET("http://localhost:3000/users").respond([
            {
                "username": "seanscriptfeeney@gmail.com",
                "password": "pass"
            }
        ]);

     $rootScope.login();
     $httpBackend.flush();
     expect($rootScope.users.length).toBe(0);
     
   });
});
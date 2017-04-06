'use strict';

angular.module('acmeMessaging')
  .controller('LoginController', ['$scope', '$location', function ($scope, $location) {

    $scope.loginCredentials = { username: "seanscriptfeeney@gmail.com", password: "" };

    $scope.login = function () {

      if ($scope.loginCredentials.username === "seanscriptfeeney@gmail.com" && $scope.loginCredentials.password === "pass") {

        $location.path("/dashboard");

      } else {
        window.alert("Incorrect login credentials!!")
      }


    };

  }]);

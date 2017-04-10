
'use strict';

angular.module('acmeMessaging')
    .controller('LoginController', ['$scope', '$location', 'loginService', function ($scope, $location, loginService) {

        //added these to speed up login process
        $scope.loginCredentials = { username: "seanscriptfeeney@gmail.com", password: "pass" };
        $scope.users = [];

        $scope.login = function () {

            loginService.getUsers().query(
                function (response) {

                    angular.forEach(response, function (value, key) {
                        if (value.username === $scope.loginCredentials.username && value.password === $scope.loginCredentials.password) {
                            $location.path("/dashboard");
                            this.push(value);
                            return;
                        }
                    }, $scope.users);

                    if ($scope.users.length === 0) {
                        window.alert("Incorrect login credentials!!")
                        $location.path("/");
                    }

                },
                function (response) {
                    $scope.errMessage = "Error: " + response.status + " " + response.statusText;
                });
        }

    }]);

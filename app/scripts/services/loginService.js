'use strict';

angular.module('acmeMessaging')
    .constant("baseURL", "http://localhost:3000/")
    .service('loginService', ['$resource', 'baseURL', function ($resource, baseURL) {

        this.getUsers = function () {
            return $resource(baseURL + "users", null, { 'get': { method: 'GET' } });
        };

    }]);
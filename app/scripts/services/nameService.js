'use strict';

angular.module('acmeMessaging')
    .constant("baseURL", "http://localhost:3000/")
    .service('nameService', ['$resource', 'baseURL', function ($resource, baseURL) {

        this.getNames = function () {
            return $resource(baseURL + "babynames/:id", null, { 'get': { method: 'GET' } });
        };

    }]);
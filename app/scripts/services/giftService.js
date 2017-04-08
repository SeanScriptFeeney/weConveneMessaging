'use strict';

angular.module('acmeMessaging')
    .constant("baseURL", "http://localhost:3000/")
    .service('giftService', ['$resource', 'baseURL', function ($resource, baseURL) {

        this.getGifts = function () {
            return $resource(baseURL + "gifts/:id", null, { 'get': { method: 'GET' } });
        };

    }]);
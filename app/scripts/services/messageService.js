'use strict';

angular.module('acmeMessaging')
    .constant("baseURL", "http://localhost:3000/")
    .service('messageService', ['$resource', 'baseURL', function ($resource, baseURL) {

        this.getMessages = function () {
            return $resource(baseURL + "messages/:id", null, { 'get': { method: 'GET' } });
        };

        this.updateMessage = function () {
            return $resource(baseURL + "messages/:id", null, { 'update': { method: 'PUT' } });
        };

        this.deleteMessage = function () {
            return $resource(baseURL + "messages/:id", null, { 'delete': { method: 'DELETE' } });
        };

    }]);
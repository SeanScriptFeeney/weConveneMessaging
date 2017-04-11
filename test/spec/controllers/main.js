'use strict';

// testing controller
describe('MainController', function () {
    var $httpBackend, $rootScope, createController;

    // Set up the module
    beforeEach(module('acmeMessaging'));

    beforeEach(inject(function ($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');

        // Get hold of a scope (i.e. the root scope)
        $rootScope = $injector.get('$rootScope');
        // The $controller service is used to create instances of controllers
        var $controller = $injector.get('$controller');

        $httpBackend.expectGET("http://localhost:3000/messages").respond(
            [
                {
                    "id": 3,
                    "index": 0,
                    "name": "Sean Feeney",
                    "title": "Congradulations on your new born! No3",
                    "type": "newborn",
                    "babyName": {
                        "id": 0,
                        "name": "Hugo"
                    },
                    "selectedDate": "2017-04-09T16:00:00.000Z"
                },
                {
                    "id": 4,
                    "index": 1,
                    "name": "John Feeney",
                    "title": "Happy Birthday to you! Testiing 2",
                    "type": "birthday"
                },
                {
                    "id": 5,
                    "index": 2,
                    "name": "John Smith",
                    "title": "Happy Birthday to you!",
                    "type": "birthday",
                    "giftType": "special",
                    "gift": {
                        "id": 1,
                        "title": "Rolex",
                        "image": "images/rolex.jpg",
                        "type": "special"
                    },
                    "selectedDate": "2017-04-09T16:00:00.000Z"
                },
                {
                    "id": 6,
                    "index": 1,
                    "name": "Peter Taylor",
                    "title": "Congradulations on your new born!",
                    "type": "newborn"
                }
            ]);

        var MainController = $controller('MainController', { '$scope': $rootScope });
        $httpBackend.flush();
       
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('tab should be 1 ', function () {
        expect($rootScope.tab).toBe(1);
    });

    it('scope.messages.length should be 4 ', function () {
        expect($rootScope.messages.length).toBe(4);
    });

    it('scope.messages first message name should be Sean Feeney', function () {
        expect($rootScope.messages.length).toBe(4);
    });

    it('should check $scope.tab value is selected', function () {

        var isSelected = $rootScope.isSelected(1);
        expect(isSelected).toBeTruthy();
    });

    it('should check $scope.tab value is not selected', function () {

        var isSelected = $rootScope.isSelected(2);
        expect(isSelected).toBeFalsy();
    });

    it('should change the tab value', function () {

        $rootScope.select(2);
        expect($rootScope.tab).toBe(2);
    });

    it('should change the name of the baby selected', function () {

        $rootScope.selectedName = '{ "id": 11, "name": "Aoife" }';
        $rootScope.selectedNameChanged();
        expect($rootScope.messageToProccess.babyName).toBe($rootScope.childNameSelected);
    });

    it('should get gifts and set $scope.gifts', function () {

        $httpBackend.expectGET("http://localhost:3000/gifts").respond([
            {
                "id": 0,
                "title": "Teddy Bear",
                "image": "images/teddy.jpg",
                "type": "normal"
            },
            {
                "id": 1,
                "title": "Rolex",
                "image": "images/rolex.jpg",
                "type": "special"
            },
            {
                "id": 2,
                "title": "Holday to Rome!",
                "image": "images/rome.jpg",
                "type": "special"
            }]);

        $rootScope.selectedGiftTypeChanged();
        
        $httpBackend.flush();

        expect($rootScope.gifts.length).toBe(3);
    });

    it('should get a specific birthday related messages', function () {

        var id = 4;
        var type = "birthday";

        $httpBackend.expectGET("http://localhost:3000/messages/"+id).respond(
            {
                "id": 4,
                "index": 1,
                "name": "John Feeney",
                "title": "Happy Birthday to you! Testiing 2",
                "type": "birthday"
            });

        $rootScope.completeMessage(id, type);
        
        $httpBackend.flush();

        expect($rootScope.messageToProccess.id).toBe(4);
    });

    it('should get a specific newborn related messages', function () {

        var id = 3;
        var type = "newborn";

        $httpBackend.expectGET("http://localhost:3000/messages/"+id).respond(
            {
            "id": 3,
            "index": 0,
            "name": "Sean Feeney",
            "title": "Congradulations on your new born! No3",
            "type": "newborn",
            "babyName": {
                "id": 0,
                "name": "Hugo"
            },
            "selectedDate": "2017-04-09T16:00:00.000Z"
            }
        );

        $rootScope.completeMessage(id, type);
        
        $httpBackend.flush();

        expect($rootScope.messageToProccess.id).toBe(3);
    });

    it('should remove a message from messages', function () {

        var id = 6;
        var initialMessageSize = $rootScope.messages.length;

        $httpBackend.expectDELETE("http://localhost:3000/messages/"+id).respond({});

        $httpBackend.expectGET("http://localhost:3000/messages").respond(
            [
                {
                    "id": 3,
                    "index": 0,
                    "name": "Sean Feeney",
                    "title": "Congradulations on your new born! No3",
                    "type": "newborn",
                    "babyName": {
                        "id": 0,
                        "name": "Hugo"
                    },
                    "selectedDate": "2017-04-09T16:00:00.000Z"
                },
                {
                    "id": 4,
                    "index": 1,
                    "name": "John Feeney",
                    "title": "Happy Birthday to you! Testiing 2",
                    "type": "birthday"
                },
                {
                    "id": 5,
                    "index": 2,
                    "name": "John Smith",
                    "title": "Happy Birthday to you!",
                    "type": "birthday",
                    "giftType": "special",
                    "gift": {
                        "id": 1,
                        "title": "Rolex",
                        "image": "images/rolex.jpg",
                        "type": "special"
                    },
                    "selectedDate": "2017-04-09T16:00:00.000Z"
                }
            ]);

        $rootScope.deleteMessage(id);
        
        $httpBackend.flush();

        expect($rootScope.messages.length).toBe(initialMessageSize - 1);
    });

    it('should preview a birthday message from messages', function () {

        var id = 5;
        var type = "birthday";

        $httpBackend.expectGET("http://localhost:3000/messages/"+id).respond(
                {
                "id": 5,
                "index": 2,
                "name": "John Smith",
                "title": "Happy Birthday to you!",
                "type": "birthday",
                "giftType": "special",
                "gift": {
                    "id": 1,
                    "title": "Rolex",
                    "image": "images/rolex.jpg",
                    "type": "special"
                },
                "selectedDate": "2017-04-09T16:00:00.000Z"
                }
        );

        $rootScope.previewMessage(id, type);

        $httpBackend.flush();
    
        expect($rootScope.name).toBe("John Smith");
    });

    it('should preview a new born message from messages', function () {

        var id = 5;
        var type = "newborn";

        $httpBackend.expectGET("http://localhost:3000/messages/"+id).respond(
                {
                    "id": 3,
                    "index": 0,
                    "name": "Sean Feeney",
                    "title": "Congradulations on your new born! No3",
                    "type": "newborn",
                    "babyName": {
                        "id": 0,
                        "name": "Hugo"
                    },
                    "selectedDate": "2017-04-09T16:00:00.000Z"
                }
        );

        $rootScope.previewMessage(id, type);

        $httpBackend.flush();
    
        expect($rootScope.selectedDate).toBe("2017-04-09T16:00:00.000Z");
    });


    

});
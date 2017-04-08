'use strict';
const maxNumberOfMessages = 5;

angular.module('acmeMessaging')
    .controller('MainController', ['$scope', 'messageService', 'giftService', function ($scope, messageService, giftService) {

        $scope.messageQueueCount = 5;
        $scope.tab = 1;
        $scope.showButtons = false;
        $scope.filtText = '';
        $scope.messages = {};
        $scope.showMessages = false;

        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };

        $scope.select = function (setTab) {
            $scope.tab = setTab;

            if (setTab === 2) {
                $scope.filtText = 'birthday';
            }
            else if (setTab === 3) {
                $scope.filtText = 'newborn';
            }
            else {
                $scope.filtText = '';
            }
        };


        $scope.showMessages = false;
        $scope.loadingMessages = "Loading ...";

        $scope.messages = messageService.getMessages().query(
            function (response) {

                if (Object.keys(response) > 0)
                    showMessages = true;

                $scope.messages = response;
                $scope.showMessages = true;
                Object.keys($scope.messages).length;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            });
        $scope.giftTypeSelected = false;
        $scope.giftSelected = false;

        $scope.selectedGiftTypeChanged = function () {
            
            giftService.getGifts().query(
            function (response) {

                $scope.gifts = response;
                $scope.giftTypeSelected = true
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            });
        };

        $scope.giftOptionChanged = function () {
            $scope.giftSelected = true;
        };   

        $scope.messageProcessing = function () {
            console.log("Processing Message");
            $("#bdayModal").modal('toggle');
        };   

        $scope.proccessMessage = function (id, type) {

            if (type === "birthday") {

                messageService.getMessages().get({ id: id })
                    .$promise.then(
                    function (response) {

                        $scope.name = "Sean";
                        $("#bdayModal").modal();

                    },
                    function (response) {
                        //$scope.dishMessage = "Error: " + response.status + " " + response.statusText;
                    }
                    );


            }
            else if (type === "newborn") {
                $("#newbornModal").modal();
            }

            console.log("This is the message id: " + id + " type is: " + type)
        };

        $scope.deleteMessage = function (id) {

            messageService.deleteMessage().delete({ id: id })
                .$promise.then(
                function (response) {
                    console.log("Deleted the message id: " + id)

                    $scope.messages = messageService.getMessages().query(
                        function (response) {
                            $scope.messages = response;
                            $scope.showMessages = true;
                        },
                        function (response) {
                            $scope.message = "Error: " + response.status + " " + response.statusText;
                        });

                },
                function (response) {
                    //$scope.dishMessage = "Error: " + response.status + " " + response.statusText;
                }
                );
        };

    }]).directive('bdayMessage', function () {
        return {
            templateUrl: '/views/directives/bday-message.html'
        };
    }).directive('newbornMessage', function () {
        return {
            templateUrl: '/views/directives/newborn-message.html'
        };
    }).filter('messageFilter', function () {
        return function (items, messageType, messagesNumber, processed) {


            if(messageType === "" && !processed){
                return items.slice(0, maxNumberOfMessages);
            }

            if (messageType === "" && processed) {

                var filtered = [];
                angular.forEach(items, function (value, key) {
                    if (value.gift !== undefined) {
                        this.push(value);
                    }
                }, filtered);

                return filtered.slice(0, maxNumberOfMessages);

            }


            if(messageType === "birthday" && !processed){

                var filtered = [];
                angular.forEach(items, function (value, key) {
                    if (value.type === "birthday") {
                        this.push(value);
                    }
                }, filtered);

                return filtered.slice(0, maxNumberOfMessages);

            }

            if(messageType === "birthday" && processed){

                var filtered = [];
                angular.forEach(items, function (value, key) {
                    if (value.type === "birthday" && value.gift !== undefined) {
                        this.push(value);
                    }
                }, filtered);

                return filtered.slice(0, maxNumberOfMessages);

            }

            if(messageType === "newborn" && !processed){

                var filtered = [];
                angular.forEach(items, function (value, key) {
                    if (value.type === "newborn") {
                        this.push(value);
                    }
                }, filtered);

                return filtered.slice(0, maxNumberOfMessages);

            }

            if(messageType === "newborn" && processed){

                var filtered = [];
                angular.forEach(items, function (value, key) {
                    if (value.type === "newborn"  && value.gift !== undefined) {
                        this.push(value);
                    }
                }, filtered);

                return filtered.slice(0, maxNumberOfMessages);

            }


    }});


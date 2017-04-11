'use strict';

angular.module('acmeMessaging')
    .controller('MainController', ['$scope', 'messageService', 'giftService', 'nameService', function ($scope, messageService, giftService, nameService) {

        $scope.tab = 1;
        $scope.filtText = '';
        $scope.messages = {};
        $scope.messageToProccess = {};
        $scope.showMessages = true;
        $scope.showNewBornMessage = false;
        $scope.giftTypeSelected = false;
        $scope.giftSelected = false;

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

        messageService.getMessages().query(
            function (response) {

                if (Object.keys(response) > 0)
                    showMessages = true;

                $scope.messages = response;
            },
            function (response) {
                //$scope.message = "Error: " + response.status + " " + response.statusText;
            });

        $scope.selectedNameChanged = function () {

            var selectedname = JSON.parse($scope.selectedName);

            $scope.childNameSelected = selectedname;
            $scope.messageToProccess.babyName = selectedname;
        };


        $scope.selectedGiftTypeChanged = function () {

            $scope.messageToProccess.giftType = $scope.selectedGiftType;

            giftService.getGifts().query(
                function (response) {

                    $scope.gifts = response;
                    $scope.giftTypeSelected = true
                },
                function (response) {
                    //$scope.message = "Error: " + response.status + " " + response.statusText;
                });
        };

        $scope.giftOptionChanged = function () {
            $scope.giftSelected = true;

            var gift = JSON.parse($scope.selectedGift);

            $scope.messageToProccess.gift = gift;
            $scope.selectedGiftTitle = gift.title;
            $scope.selectedGiftName = gift.name;
            $scope.selectedGiftImage = gift.image;
        };

        $scope.proccessMessage = function () {
            console.log("Processing Message");
            $scope.messageToProccess.selectedDate = $scope.selectedDate;

            messageService.updateMessage().update({ id: $scope.messageToProccess.id }, $scope.messageToProccess);
            $scope.messages[$scope.messageToProccess.index] = $scope.messageToProccess;

            if ($scope.messageToProccess.type === "birthday") {
                $("#birthdayModal").modal('toggle');
            } else {
                $("#newbornModal").modal('toggle');
            }

            $scope.messageToProccess = {};
            $scope.showNewBornMessage = false;

        };

        $scope.completeMessage = function (id, type) {


            if (type === "newborn") {
                nameService.getNames().query(
                    function (response) {
                        $scope.childNames = response;
                    },
                    function (response) {
                    }
                );
            }

            messageService.getMessages().get({ id: id })
                .$promise.then(
                function (response) {

                    $scope.messageToProccess.id = response.id;
                    $scope.messageToProccess.index = $scope.messages.map(function (d) { return d['id']; }).indexOf(response.id);
                    $scope.messageToProccess.name = response.name;
                    $scope.messageToProccess.title = response.title;
                    $scope.messageToProccess.type = response.type;
                    $scope.name = response.name;
                    $("#"+ type + "modal").modal();

                },
                function (response) {
                }
                );

        };

        $scope.deleteMessage = function (id) {

            messageService.deleteMessage().delete({ id: id })
                .$promise.then(
                function (response) {
                    messageService.getMessages().query(
                        function (response) {
                            $scope.messages = response;
                        },
                        function (response) {
                        });
                },
                function (response) {
                }
                );
        };


        $scope.previewMessage = function (id, type) {

            messageService.getMessages().get({ id: id })
                .$promise.then(
                function (response) {
                    $scope.name = response.name;

                    if (type === "newborn") {
                        $scope.selectedDate = response.selectedDate;
                        $scope.babyName = response.babyName;
                        $("#readNewbornModal").modal();
                    } else {
                        $scope.gift = response.gift;
                        $("#birthdayreadModal").modal();
                    }

                },
                function (response) {
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
    }).directive('newbornReadMessage', function () {
        return {
            templateUrl: '/views/directives/newborn-read.html'
        };
    }).directive('birthdayReadMessage', function () {
        return {
            templateUrl: '/views/directives/bday-read.html'
        };
    }).filter('messageFilter', function () {
        return function (items, messageType, messagesNumber, processed) {

            if (messageType === "" && !processed) {
                var filtered = [];
                angular.forEach(items, function (value, key) {
                    if (value.gift === undefined && value.babyName === undefined) {
                        this.push(value);
                    }
                }, filtered);

                return filtered.slice(0, 5);
            }

            if (messageType === "" && processed) {

                var filtered = [];
                angular.forEach(items, function (value, key) {
                    if (value.gift !== undefined || value.babyName !== undefined) {
                        this.push(value);
                    }
                }, filtered);

                return filtered.slice(0, 5);
            }


            if (messageType === "birthday" && !processed) {

                var filtered = [];
                angular.forEach(items, function (value, key) {
                    if (value.type === "birthday" && value.gift === undefined) {
                        this.push(value);
                    }
                }, filtered);

                return filtered.slice(0, 5);
            }

            if (messageType === "birthday" && processed) {

                var filtered = [];
                angular.forEach(items, function (value, key) {
                    if (value.type === "birthday" && (value.gift !== undefined || value.babyName !== undefined)) {
                        this.push(value);
                    }
                }, filtered);

                return filtered.slice(0, 5);
            }

            if (messageType === "newborn" && !processed) {

                var filtered = [];
                angular.forEach(items, function (value, key) {
                    if (value.type === "newborn" && (value.gift === undefined || value.babyName === undefined)) {
                        this.push(value);
                    }
                }, filtered);

                return filtered.slice(0, 5);
            }

            if (messageType === "newborn" && processed) {

                var filtered = [];
                angular.forEach(items, function (value, key) {
                    if (value.type === "newborn" && (value.gift !== undefined || value.babyName !== undefined)) {
                        this.push(value);
                    }
                }, filtered);

                return filtered.slice(0, 5);

            }
        }
    });


'use strict';

angular.module('acmeMessaging')
    .controller('MainController', ['$scope', 'messageService', 'giftService', 'nameService', function ($scope, messageService, giftService, nameService) {

        $scope.tab = 1;
        $scope.filtText = '';
        $scope.messages = {};
        $scope.messageToProcess = {};
        $scope.noMessages = true;
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

                if (response.length > 0)
                        $scope.noMessages = false;

                $scope.messages = response;
            },
            function (response) {
                $scope.noMessages = true;
            });

        $scope.selectedNameChanged = function () {

            let selectedname = JSON.parse($scope.selectedName);

            $scope.childNameSelected = selectedname;
            $scope.messageToProcess.babyName = selectedname;
        };


        $scope.selectedGiftTypeChanged = function () {

            $scope.messageToProcess.giftType = $scope.selectedGiftType;

            giftService.getGifts().query(
                function (response) {

                    $scope.gifts = response;
                    $scope.giftTypeSelected = true
                },
                function (response) {
                });
        };

        $scope.giftOptionChanged = function () {
            $scope.giftSelected = true;

            let gift = JSON.parse($scope.selectedGift);

            $scope.messageToProcess.gift = gift;
            $scope.selectedGiftTitle = gift.title;
            $scope.selectedGiftName = gift.name;
            $scope.selectedGiftImage = gift.image;
        };

        $scope.proccessMessage = function () {
            console.log("Processing Message");
            $scope.messageToProcess.selectedDate = $scope.selectedDate;

            messageService.updateMessage().update({ id: $scope.messageToProcess.id }, $scope.messageToProcess);
            $scope.messages[$scope.messageToProcess.index] = $scope.messageToProcess;

            if ($scope.messageToProcess.type === "birthday") {
                $("#birthdayModal").modal('toggle');
            } else {
                $("#newbornModal").modal('toggle');
            }

            $scope.messageToProcess = {};
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

                    $scope.messageToProcess.id = response.id;
                    $scope.messageToProcess.index = $scope.messages.map(function (d) { return d['id']; }).indexOf(response.id);
                    $scope.messageToProcess.name = response.name;
                    $scope.messageToProcess.title = response.title;
                    $scope.messageToProcess.type = response.type;
                    $scope.name = response.name;
                    $("#"+ type + "Modal").modal();

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
                let filtered = [];
                angular.forEach(items, function (value, key) {
                    if (value.gift === undefined && value.babyName === undefined) {
                        this.push(value);
                    }
                }, filtered);

                return filtered.slice(0, 5);
            }

            if (messageType === "" && processed) {

                let filtered = [];
                angular.forEach(items, function (value, key) {
                    if (value.gift !== undefined || value.babyName !== undefined) {
                        this.push(value);
                    }
                }, filtered);

                return filtered.slice(0, 5);
            }


            if (messageType === "birthday" && !processed) {

                let filtered = [];
                angular.forEach(items, function (value, key) {
                    if (value.type === "birthday" && value.gift === undefined) {
                        this.push(value);
                    }
                }, filtered);

                return filtered.slice(0, 5);
            }

            if (messageType === "birthday" && processed) {

                let filtered = [];
                angular.forEach(items, function (value, key) {
                    if (value.type === "birthday" && value.gift !== undefined) {
                        this.push(value);
                    }
                }, filtered);
                return filtered.slice(0, 5);
            }

            if (messageType === "newborn" && !processed) {

                let filtered = [];
                angular.forEach(items, function (value, key) {
                    if (value.type === "newborn" && value.babyName !== undefined) {
                        this.push(value);
                    }
                }, filtered);

                return filtered.slice(0, 5);
            }

            if (messageType === "newborn" && processed) {

                let filtered = [];
                angular.forEach(items, function (value, key) {
                    if (value.type === "newborn" && value.babyName !== undefined) {
                        this.push(value);
                    }
                }, filtered);

                return filtered.slice(0, 5);

            }
        }
    });


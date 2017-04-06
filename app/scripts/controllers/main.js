'use strict';
const messageQueueCount = 5;

angular.module('acmeMessaging')
    .controller('MainController', ['$scope', 'menuService', function ($scope, menuService) {

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

        $scope.messages = menuService.getMessages().query(
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


        $scope.proccessMessage = function (id, type) {

            if(type === "birthday"){
                $("#messageModal").modal();
            }
            else if(type === "newborn"){
                $("#newbornModal").modal();
            }
            
            console.log("This is the message id: " + id + " type is: " + type)
        };

        $scope.deleteMessage = function (id) {

            menuService.deleteMessage().delete({ id: id })
                .$promise.then(
                function (response) {
                    console.log("Deleted the message id: " + id)

                    $scope.messages = menuService.getMessages().query(
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

    }]).directive('bdayMessage', function() {
    return {
        templateUrl: '/views/directives/bday-message.html'
    };
  }).directive('newbornMessage', function() {
    return {
        templateUrl: '/views/directives/newborn-message.html'
    };
  }).filter('messageFilter', function () {
  return function (items, messageType, messagesNumber) {

    var filtered = [];

    angular.forEach(items, function (value, key) {
        if(value.type === messageType){
            this.push(value);
        }
    }, filtered);

    if (messageType === '') {
        return items.slice(0, messageQueueCount);
    }

    if (messagesNumber > messageQueueCount) {
        return filtered.slice(0, messageQueueCount);
    }
    else if (messagesNumber > 0 && messagesNumber <= messageQueueCount) {
        return filtered.slice(0, messageQueueCount);
    } 
        
        
    return filtered;

  };
});
  
  
//   .filter('messageFilter', function() {
//   return function(messageType) {
    
//     var filtered = [];
//     angular.forEach(items, function(item) {
//       if(messageType === item.type) {
//         filtered.push(item);
//       }
//     });

//     if(messageType === ''){
//         return filtered.slice(0, messageQueueCount-1);
//     }

//     if(messagesNumber > messageQueueCount)
//     {
//         return filtered.slice(0, messageQueueCount-1);
//     } 
//     else if(messagesNumber > 0 && messagesNumber <= messageQueueCount)
//     {
//         return filtered.slice(0, messageQueueCount-1);
//     }else{
//         return;
//     }

//     return filtered;
//   };
// });

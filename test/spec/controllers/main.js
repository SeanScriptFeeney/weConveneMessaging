// describe('Controller: MenuController', function () {

//   // load the controller's module
//   beforeEach(module('acmeMessaging'));

//   var MainController, scope, $httpBackend;

//   // Initialize the controller and a mock scope
//   beforeEach(inject(function ($controller, _$httpBackend_,  $rootScope, messageService) {

//           // place here mocked dependencies
//       $httpBackend = _$httpBackend_;

//       $httpBackend.expectGET("http://localhost:3000/dishes").respond([
//   {
//     "id": 3,
//     "index": 0,
//     "name": "Sean Feeney",
//     "title": "Congradulations on your new born! No3",
//     "type": "newborn",
//     "babyName": {
//       "id": 0,
//       "name": "Hugo"
//     },
//     "selectedDate": "2017-04-09T16:00:00.000Z"
//   },
//   {
//     "id": 4,
//     "index": 1,
//     "name": "John Feeney",
//     "title": "Happy Birthday to you! Testiing 2",
//     "type": "birthday"
//   },
//   {
//     "id": 5,
//     "index": 2,
//     "name": "John Smith",
//     "title": "Happy Birthday to you!",
//     "type": "birthday",
//     "giftType": "special",
//     "gift": {
//       "id": 1,
//       "title": "Rolex",
//       "image": "images/rolex.jpg",
//       "type": "special"
//     },
//     "selectedDate": "2017-04-09T16:00:00.000Z"
//   },
//   {
//     "id": 6,
//     "index": 1,
//     "name": "Peter Taylor",
//     "title": "Congradulations on your new born!",
//     "type": "newborn"
//   },
//   {
//     "id": 8,
//     "index": 4,
//     "name": "Peter Quinn",
//     "title": "Congrats on the birth of your child!",
//     "type": "newborn"
//   },
//   {
//     "id": 9,
//     "name": "Tim Donellan",
//     "title": "Happy Birthday to you!",
//     "type": "birthday"
//   },
//   {
//     "id": 11,
//     "name": "Bernadette Feeney",
//     "title": "Congrats on the birth of your child!",
//     "type": "newborn"
//   },
//   {
//     "id": 12,
//     "name": "Stephen Feeney",
//     "title": "Congrats on the birth of your child!",
//     "type": "newborn"
//   },
//   {
//     "id": 13,
//     "index": 8,
//     "name": "Michael Feeney",
//     "title": "Happy Birthday to you!",
//     "type": "birthday"
//   },
//   {
//     "id": 14,
//     "name": "John Doe",
//     "title": "Happy Birthday!",
//     "type": "birthday"
//   },
//   {
//     "id": 15,
//     "name": "James Fathery",
//     "title": "Congrats on the birth of your child!",
//     "type": "newborn"
//   },
//   {
//     "id": 16,
//     "name": "Sean Curran",
//     "title": "Happy Birthday!",
//     "type": "birthday"
//   }
// ]);

//     scope = $rootScope.$new();
//     MainController = $controller('MainController', {
//       $scope: scope, messageService: messageService
//     });
//             $httpBackend.flush();

//   }));

//   it('should have 12 messages', function () {

//     expect(scope.messages.length).toBe(12);

//   });

//   // it('should create "dishes" with 2 dishes fetched from xhr', function(){

//   //     expect(scope.showMenu).toBeTruthy();
//   //     expect(scope.dishes).toBeDefined();
//   //     expect(scope.dishes.length).toBe(2);

//   // });

//   // it('should have the correct data order in the dishes', function() {

//   //     expect(scope.dishes[0].name).toBe("Uthapizza");
//   //     expect(scope.dishes[1].label).toBe("New");

//   // });

//   // it('should change the tab selected based on tab clicked', function(){

//   //     expect(scope.tab).toEqual(1);

//   //     scope.select(3);

//   //     expect(scope.tab).toEqual(3);
//   //     expect(scope.filtText).toEqual('mains');

//   // });

// });
describe('Testing messageFilter', function () {
  'use strict'; 

  var $filter;

  beforeEach(function () {
    module('acmeMessaging');

    inject(function (_$filter_) {
      $filter = _$filter_;
    });
  });

  it('should check for all filter scenarios', function () {
    // Arrange.
    var messages = [
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
  
  ], result;

    // Get all messages that are not processed
    result = $filter('messageFilter')(messages, '' , '5', false);

    // Assert.
    expect(result.length).toEqual(1);

    // Gett all messages that are processed
    result = $filter('messageFilter')(messages, '' , '5', true);

    // Assert.
    expect(result.length).toEqual(2);


    // Get birthday messages that are not processed
    result = $filter('messageFilter')(messages, 'birthday' , '5', false);

    // Assert.
    expect(result.length).toEqual(0);

    // Get all birthday messages that are processed
    result = $filter('messageFilter')(messages, 'birthday' , '5', true);

    // Assert.
    expect(result.length).toEqual(1);

    // get all newborn messages that are not processed
    result = $filter('messageFilter')(messages, 'newborn' , '5', false);

    // Assert.
    expect(result.length).toEqual(1);

    //get all newborn messages that are processed
    result = $filter('messageFilter')(messages, 'newborn' , '5', true);

    // Assert.
    expect(result.length).toEqual(1);
  });
});
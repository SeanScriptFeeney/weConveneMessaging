describe('acmeMessaging homepage', function () {
  it('should login to main dashboard', function () {
    browser.get('http://localhost:9000/');

    expect(element(by.id('signIn')).getText()).toEqual("Sign in");
    element(by.css('.btn-block')).click();

  });
});

describe('acmeMessaging dashboard', function () {

  it('should have the nav bar title set', function () {
    expect(element(by.id('appTitle')).getText()).toEqual("Acme Messaging App");
  });

  it('should count the messages', function () {
    var messages = element.all(by.repeater('message in messages'));
    expect(messages.count()).toEqual(9);

  });

  it('should find values of the first message', function () {

    var message = element.all(by.repeater('message in messages'))
      .first().element(by.binding('message.name'));

    expect(message.getText()).toContain('Peter Quinn');

  });

  it('should find values of the last message', function () {

    var message = element.all(by.repeater('message in messages'))
      .last().element(by.binding('message.name'));

    expect(message.getText()).toContain('Tim Donellan');

  });

  it('should only show birthday messages', function () {

    element(by.id('birthdaytab')).click();

    expect(element.all(by.repeater('message in messages')).count()).toEqual(5);

  });

  it('should only show newborn messages', function () {

    element(by.id('newBornTab')).click();

    expect(element.all(by.repeater('message in messages')).count()).toEqual(4);

  });

});

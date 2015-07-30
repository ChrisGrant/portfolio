'use strict';

describe('my app', function() {

  it('should have a title', function() {
    browser.get('');
    expect(browser.getTitle()).toEqual('Portfolio');
  });

  it('should automatically redirect to /login when location hash/fragment is empty', function() {
    browser.get('');
    expect(browser.getLocationAbsUrl()).toMatch("/login");
  });

  describe('- The login page', function() {

    it('should allow the user to log in if they use valid authentication details', function() {
      browser.get('');

      var username = element(by.model('credentials.username'));
      var password = element(by.model('credentials.password'));

      username.sendKeys('Chris');
      password.sendKeys('chris');
      password.submit();

      browser.wait(function() {
        return browser.getLocationAbsUrl().then(function (url) {
            return url === "/contacts"
        });
      }, 5000, 'page has not changed to contacts yet');

      expect(browser.getLocationAbsUrl()).toMatch("/contacts");
    });

    it('should stop the user logging in if they do not enter authentication details', function() {
      browser.get('');

      var username = element(by.model('credentials.username'));
      var password = element(by.model('credentials.password'));

      password.submit();

      var alert = element(by.css('.alert-danger'));
      expect(alert.isDisplayed()).toBeTruthy();
    });

  });

});

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

  describe('s login system', function() {

    it('should render view1 when user navigates to /view1', function() {
      browser.get('');
      browser.pause();
      element.by('credentials.username').first().sendKeys('Chris');
      element.by('credentials.password').first().sendKeys('chris');
      element.by('credentials.password').first().submit();
      expect(browser.getLocationAbsUrl()).toMatch("/contacts");
    });

  });

});

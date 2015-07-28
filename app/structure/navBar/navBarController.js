'use strict';

define(['Parse'], function(Parse) {
  return function($state, $rootScope, authenticationService, AUTH_EVENTS) {

    this.logOut = function() {
      authenticationService.logOut();
    };

    this.classFor = function(link) {
      if ($state.current.name.startsWith('app.' + link)) {
        return 'active';
      }
      return "";
    };

    this.username = function() {
      return Parse.User.current().attributes.username;
    };

    this.showLinkRequiringRole = function(roles) {
      if (roles === "*") {
        return true;
      }

      return roles.indexOf(Parse.User.current().attributes.role) !== -1;
    };

  };
});
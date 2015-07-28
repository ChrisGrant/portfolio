'use strict';

define(['Parse'], function(Parse) {
  return function($rootScope, AUTH_EVENTS) {
    var authService = {};

    authService.login = function (credentials) {

      if (!credentials) {
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed, {"reason": "Please enter a username and password"});
        return;
      }

      Parse.User.logIn(credentials.username, credentials.password).then(
        function() {
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
          $rootScope.$digest();
        },
        function(error) {
          $rootScope.$broadcast(AUTH_EVENTS.loginFailed, {"reason": "Incorrect details"});
          $rootScope.$digest();
        });
    };

    authService.logOut = function () {
      Parse.User.logOut().then(function() {
        $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        $rootScope.$digest();
      });
    };
   
    authService.isAuthenticated = function () {
      return Parse.User.current() !== null;
    };
   
    authService.isAuthorized = function (authorizedRoles) {
      if (authorizedRoles === undefined || authorizedRoles.length === 0) {
        console.warn("Route with no authorizedRoles specified. Defaulting to isAuthenticated for now.");
        return authService.isAuthenticated();
      }

      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }

      for (var i = 0; i < authorizedRoles.length; i++) {
        if (authorizedRoles[i] === "*") {
          return authService.isAuthenticated();
        }
      }

      return (authService.isAuthenticated() && 
        authorizedRoles.indexOf(Parse.User.current().attributes.role) !== -1);
    };

    return authService;
  };
});

// TODO. Is this more of a provider than a service?

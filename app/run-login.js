'use strict';

define([
    'app',
  ], function(app, routeController, contactDetailResolves) {

  // Check to see if the user is logged in on every state change. Otherwise don't let them navigate.
  app.run([
    '$rootScope',
    '$state',
    'AUTH_EVENTS',
    'authenticationService',
    function ($rootScope, $state, AUTH_EVENTS, authenticationService) {

      $rootScope.$on(AUTH_EVENTS.loginSuccess, function() {
        $state.go('app.contacts.placeholder');
      });

      $rootScope.$on(AUTH_EVENTS.logoutSuccess, function() {
        $state.go('login');
      });

      $rootScope.$on('$stateChangeStart', function (event, next) {

        var authorizedRoles;
        if (next.data) {
          if (next.data.authorizedRoles) {
            authorizedRoles = next.data.authorizedRoles;
          }
        }

        if (next.name === "login" && authenticationService.isAuthenticated()) {
          // Stop the user from getting to the login page if they are signed in.
          event.preventDefault();
          return;
        }

        if (!authenticationService.isAuthorized(authorizedRoles)) {
        
          if (authenticationService.isAuthenticated(authorizedRoles)) {
            // user is not allowed
            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
            console.error('User is not allowed to see this page. ' + next);
            event.preventDefault();

            authenticationService.logOut();

            return;
          }
          else if (next.name !== 'login') {
            // user is not logged in and not already on the login page.
            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            event.preventDefault();
            $state.go('login');
          }
        }
                
      });
    }
  ]);

  return app;

});

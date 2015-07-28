'use strict';

define([], function() {
    return function($scope, $state, contactsService, corporationsService) {

      var self = this;

      self.user = {};

      contactsService.getContactById($state.params.id).then(function(user) {
        self.setParseUser(user);
        $scope.$apply();
      });

      this.setParseUser = function(parseUser) {
        self.user = {};
        self.user.userId = parseUser.id;
        self.user.firstName = parseUser.attributes.firstName;
        self.user.lastName = parseUser.attributes.lastName;
        self.user.username = parseUser.attributes.username;
        self.user.email = parseUser.attributes.email;
      };

      this.updateUser = function(user) {
        self.showError = false;

        contactsService.updateUser(user).then(function() {
          $state.go("app.admin.users");
        },
        function(error){
          self.showError = true;
          self.errorMessage = error.message;
          $scope.$apply();
        });
      };

    };
});

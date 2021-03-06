'use strict';

define([], function() {
    return function($scope, $state, contactsService, corporationsService) {

      this.user = {};
      this.showError = false;

      var self = this;

      corporationsService.getCorporationPage(0, 999999, "name").then(function(results) {
        self.corporations = results;
        $scope.$apply();
      }, 
      function(error) {
        self.showError = true;
        self.errorMessage = "Could not load corporations. Please refresh the page to try again.";
        $scope.$apply();
      });

      this.createUser = function(user) {
        self.showError = false;

        contactsService.createNewUser(user).then(function() {
          $state.go("app.admin.users.detail", {"id": user.username});
        },
        function(error){
          self.showError = true;
          self.errorMessage = error.message;
          $scope.$apply();
        });
      };

    };
});

'use strict';

define(['text!./deleteModal/userDetailDeleteModal.html', './deleteModal/userDetailDeleteModalController.js'], function(template, userDetailDeleteModalController) {
    return function($scope, $state, $modal, contactsService) {

      var self = this;
      contactsService.getContactById($state.params.id).then(function(user) {
        self.user = user;
        $scope.$apply();
      });

      this.delete = function() {

        var modalInstance = $modal.open({
          animation: true,
          template: template,
          controller: ['$scope', '$modalInstance', userDetailDeleteModalController],
          controllerAs: 'userDetailDeleteModalController'
        });

        modalInstance.result.then(function(selectedIndex) {
          if (selectedIndex === 0) {
            contactsService.deleteUser(self.user).then(function() {
              $state.go('app.admin.users');
            },
            function(error) {
              console.error('Could not delete user - ' + error.message);
            });
          }
        });

      };

    };
});

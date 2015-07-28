'use strict';

define([], function() {
  return function($scope, $state, corporationsService) {

    var self = this;

    this.corporations = [];

    corporationsService.getCorporationPage(0, 9999, 'name', false).then(function(corporations) {
      self.corporations = corporations;
      $scope.$apply();
    });

    this.addNewClicked = function(e) {
      $state.go('app.admin.corporations.new');
    };

    this.corporationClicked = function(corporation) {
      $state.go('app.admin.corporations.detail', {"id": corporation.attributes.name});
    };

  };
});
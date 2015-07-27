'use strict';

define([], function() {
  return function($scope, $state, corporationsService) {

    var self = this;
    corporationsService.getCorporationWithName($state.params.id).then(function(corporation) {
      self.corporation = corporation;
      $scope.$apply();
    });

  };
});
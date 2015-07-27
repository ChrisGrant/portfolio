'use strict';

define(['./newCorporationController', 'text!./newCorporation.html'], function(newCorporationController, template) {
  return function() {
    return {
      restrict: 'E',
      replace: true,
      template: template,
      controllerAs: 'newCorporationController',
      controller: ['$scope', '$state', 'corporationsService', newCorporationController]
    };
  };
});

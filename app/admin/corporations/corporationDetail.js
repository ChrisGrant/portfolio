'use strict';

define(['./corporationDetailController', 'text!./corporationDetail.html'], function(corporationDetailController, template) {
  return function() {
    return {
      restrict: 'E',
      replace: true,
      template: template,
      controllerAs: 'corporationDetailController',
      controller: ['$scope', '$state', 'corporationsService', corporationDetailController]
    };
  };
});

'use strict';

define(['./corporationsController', 'text!./corporations.html'], function(corporationsController, template) {
  return function() {
    return {
      restrict: 'E',
      replace: true,
      template: template,
      controllerAs: 'corporationsController',
      controller: ['$scope', '$state', 'corporationsService', corporationsController]
    };
  };
});

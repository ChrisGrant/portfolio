'use strict';

define([], function() {
    return function($scope, $modalInstance) {

      this.ok = function() {
        $modalInstance.close(0);
      };

      this.cancel = function() {
        $modalInstance.dismiss('cancel');
      };

    };
});

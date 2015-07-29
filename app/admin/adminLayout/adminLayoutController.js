'use strict';

define([''], function() {
  return function($state) {

    this.currentUserDetailPathId = function() {
      return $state.params.id;
    };

    this.classFor = function(link) {
      if ($state.current.name.startsWith('app.admin.' + link)) {
        return 'active';
      }
      return "";
    };

    this.showPath = function(path) {
      if ($state.current.name.startsWith('app.admin.' + path)) {
        return true;
      }
      return false;
    };

  };
});
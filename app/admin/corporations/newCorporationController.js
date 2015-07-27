'use strict';

define(['Parse'], function(Parse) {
  return function($scope, $state, corporationsService) {

    var self = this;

    this.save = function(corp) {

      var Corporation = Parse.Object.extend("Corporation");
      var corporation = new Corporation();
      corporation.set("name", corp.name);
      corporation.set("description", corp.description);

      corporationsService.save(corporation).then(function() {
        $state.go('app.admin.corporations.detail', {"id": corporation.get("name")});
      });
    };

  };
});
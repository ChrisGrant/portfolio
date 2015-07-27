'use strict';

define(['Parse'], function(Parse) {

    return function() {

      var Corporation = Parse.Object.extend("Corporation");

      var getCorporationPage = function(pageNumber, pageCount, sortKey, descending, searchTerm) {
          var query = new Parse.Query(Corporation);
          query.limit(pageCount);
          
          // Sorting
          if (sortKey !== undefined) {
            if (descending) {
              query.descending(sortKey);
            }
            else {
              query.ascending(sortKey);
            }
          }

          // Filtering
          if (searchTerm !== undefined && searchTerm.length > 0) {
            query.startsWith("name", searchTerm);
          }

          query.skip(pageNumber * pageCount);
          return query.find();
      };

      var getNumberOfCorporations = function(searchTerm) {
          var query = new Parse.Query(Corporation);

          if (searchTerm !== undefined && searchTerm.length > 0) {
              query.startsWith("name", searchTerm);
          }

          return query.count();
      };

      var save = function(corporation) {
        return corporation.save();
      };

      var removeCorporation = function(corporation) {
        return corporation.destroy();
      };

      var getCorporationWithName = function(name) {
        var query = new Parse.Query(Corporation);
        query.equalTo("name", name);
        return query.first();
      };

      return {
          getCorporationPage: getCorporationPage,
          getNumberOfCorporations: getNumberOfCorporations,
          save: save,
          getCorporationWithName: getCorporationWithName
      };
    };

});

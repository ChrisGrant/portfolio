'use strict';

define(['Parse'], function(Parse) {
    return function($q) {
		var getContacts = function() {
          	var query = new Parse.Query(Parse.User);
          	return query.find();
        };

        var getContactById = function(id) {
            var query = new Parse.Query(Parse.User);
            query.equalTo("username", id);
            return query.first();
        };

        var getContactsListPage = function(pageNumber, pageCount, sortKey, descending, searchTerm) {
            var query = new Parse.Query(Parse.User);
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
                query.startsWith("username", searchTerm);
            }

            query.skip(pageNumber * pageCount);
            return query.find();
        };

        var getNumberOfContacts = function(searchTerm) {
            var query = new Parse.Query(Parse.User);

            if (searchTerm !== undefined && searchTerm.length > 0) {
                query.startsWith("username", searchTerm);
            }

            return query.count();
        };

        var createNewUser = function(user) {
            // Need to do this in the cloud for security reasons.
            return Parse.Cloud.run('createNewUser', user);
        };

        return {
            getContacts: getContacts,
            getContactById: getContactById,
            getContactsListPage: getContactsListPage,
            getNumberOfContacts: getNumberOfContacts,
            createNewUser: createNewUser
        };
    };
});
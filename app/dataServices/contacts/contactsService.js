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
            query.include("corporation");
            return query.first();
        };

        var deleteUser = function(user) {
            // Need to do this in the cloud for security reasons.
            return Parse.Cloud.run('deleteUser', {"userId": user.id});
        };

        var getContactsListPage = function(pageNumber, pageCount, sortKey, descending, searchTerm, corporation) {
            var query = new Parse.Query(Parse.User);
            query.limit(pageCount);
            query.include("corporation");
            
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

            if (corporation !== undefined) {
              query.equalTo("corporation", corporation);
            }

            query.skip(pageNumber * pageCount);
            return query.find();
        };

        var getNumberOfContacts = function(searchTerm, corporation) {
            var query = new Parse.Query(Parse.User);

            if (searchTerm !== undefined && searchTerm.length > 0) {
              query.startsWith("username", searchTerm);
            }

            if (corporation !== undefined) {
              query.equalTo("corporation", corporation);
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
            createNewUser: createNewUser,
            deleteUser: deleteUser
        };
    };
});
'use strict';

define(['./usersController', 'text!./users.html'], function(usersController, template) {
    return function() {
        return {
            restrict: 'E',
            template: template,
            scope: {},
            controller: ['$scope', 'contactsService', usersController],
            controllerAs: 'usersController'
        };
    };
});

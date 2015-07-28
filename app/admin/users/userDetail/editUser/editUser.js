'use strict';

define(['./editUserController', 'text!./editUser.html'], function(editUserController, template) {
    return function() {
        return {
            restrict: 'E',
            template: template,
            scope: {},
            controller: ['$scope', '$state', 'contactsService', 'corporationsService', editUserController],
            controllerAs: 'editUserController'
        };
    };
});

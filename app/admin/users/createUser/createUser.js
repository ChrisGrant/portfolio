'use strict';

define(['./createUserController', 'text!./createUser.html'], function(createUserController, template) {
    return function() {
        return {
            restrict: 'E',
            template: template,
            scope: {},
            controller: ['$scope', 'contactsService', 'corporationsService', createUserController],
            controllerAs: 'createUserController'
        };
    };
});

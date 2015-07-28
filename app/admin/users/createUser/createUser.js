'use strict';

define(['./createUserController', 'text!./createUser.html'], function(createUserController, template) {
    return function() {
        return {
            restrict: 'E',
            template: template,
            scope: {},
            controller: ['$scope', '$state', 'contactsService', 'corporationsService', createUserController],
            controllerAs: 'createUserController'
        };
    };
});

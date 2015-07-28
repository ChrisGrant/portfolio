'use strict';

define(['./userDetailController', 'text!./userDetail.html'], function(userDetailController, template) {
    return function() {
        return {
            restrict: 'E',
            template: template,
            scope: {},
            controller: ['$scope', '$state', '$modal', 'contactsService', userDetailController],
            controllerAs: 'userDetailController'
        };
    };
});

// Manually bootstrap AngularJS.
'use strict';

define([
    'angular',
    'app',
    'authentication/authenticationRouteObserver',
    'parse-bootstrap'
], function (angular) {
    var $html = angular.element(document.getElementsByTagName('html')[0]);
    angular.element().ready(function() {
        angular.bootstrap(document, ['portfolio'], {
            strictDi: true
        });
    });
});

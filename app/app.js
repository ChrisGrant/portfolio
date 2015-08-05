'use strict';

if (typeof String.prototype.startsWith != 'function') {
  // see below for better implementation!
  String.prototype.startsWith = function (str){
    return this.indexOf(str) === 0;
  };
}

define([
  'angular',
  'uiRouter',
  'angularAnimate',
  'structure/structureModule',
  'contacts/contactsModule',
  'login/loginModule',
  'authentication/authenticationModule',
  'admin/adminModule',
], function(angular) {

  return angular.module('portfolio', [
    'ui.router',
    'portfolio.structure',
    'portfolio.contacts',
    'portfolio.login',
    'portfolio.authentication',
    'portfolio.admin'
  ])

  .config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

      $stateProvider.state('app', {
        abstract: true,
        views: {
          '': {
            template: '<layout><layout/>'
          }
        }
      });

      $urlRouterProvider.otherwise('/contacts');
    }
  ]);

});

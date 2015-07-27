'use strict';

define([
    'angular',
    './adminLayout/adminLayout',
    './users/users',
    './corporations/corporations',
    './corporations/newCorporation',
    './corporations/corporationDetail',
    'dataServices/dataServicesModule',
], function(angular, adminLayout, users, corporations, newCorporation, corporationDetail) {
    return angular
    .module('portfolio.admin', [
        'portfolio.dataServices',
        'portfolio.common'
    ])

    .directive('adminLayout', [adminLayout])
    .directive('users', [users])
    .directive('corporations', [corporations])
    .directive('newCorporation', [newCorporation])
    .directive('corporationDetail', [corporationDetail])

    .config([
      '$stateProvider',
      function($stateProvider) {
        $stateProvider.state('app.admin', {
            url: '/admin',
            data: {
              authorizedRoles: ['admin']
            },
            views: {
              'content@app': {
                template: '<admin-layout></admin-layout>'
              },
            }
        })
        .state('app.admin.users', {
          url: '/users',
          views: {
            'admin-content@app.admin': {
              template: '<users></users>'
            }
          }
        })
        .state('app.admin.corporations', {
          url: '/corporations',
          views: {
            'admin-content@app.admin': {
              template: '<corporations></corporations>'
            }
          }
        })
        .state('app.admin.corporations.new', {
          url: '/new',
          views: {
            'admin-content@app.admin': {
              template: '<new-corporation></new-corporation>'
            }
          }
        })
        .state('app.admin.corporations.detail', {
          url: '/:id',
          views: {
            'admin-content@app.admin': {
              template: '<corporation-detail></corporation-detail>'
            }
          }
        });
      }]);

});

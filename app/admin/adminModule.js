'use strict';

define([
    'angular',
    '../../node_modules/angular-ui-bootstrap/ui-bootstrap-tpls',
    './adminLayout/adminLayout',
    './users/users',
    './users/createUser/createUser',
    './corporations/corporations',
    './corporations/newCorporation',
    './corporations/corporationDetail',
    'dataServices/dataServicesModule',
], function(angular, uibootstrap, adminLayout, users, createUser, corporations, newCorporation, corporationDetail) {
    return angular
    .module('portfolio.admin', [
        'portfolio.dataServices',
        'portfolio.common',
        'ui.bootstrap'
    ])

    .directive('adminLayout', [adminLayout])
    .directive('users', [users])
    .directive('createUser', [createUser])
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
        .state('app.admin.users.create', {
          url: '/create',
          views: {
            'admin-content@app.admin': {
              template: '<create-user></create-user>'
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

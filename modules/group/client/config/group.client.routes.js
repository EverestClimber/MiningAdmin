(function () {
  'use strict';

  angular
    .module('group.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {

    $stateProvider
      .state('home.create-group', {
        url: 'create-group',
        templateUrl: '/modules/group/client/views/create-group.client.view.html',
        controller: 'CreateGroupController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Create Group'
        }
      })
      .state('home.manage-group', {
        url: 'manage-group',
        templateUrl: '/modules/group/client/views/manage-group.client.view.html',
        controller: 'ManageGroupController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Manage Group'
        }
      });
  }
}());

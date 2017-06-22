(function () {
  'use strict';

  angular
    .module('machines.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {

    $stateProvider
      .state('home.machines', {
        url: 'machines/:state',
        templateUrl: '/modules/machines/client/views/machines.client.view.html',
        controller: 'MachinesController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Machines'
        }
      });
  }
}());

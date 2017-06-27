(function () {
  'use strict';

  angular
    .module('machines.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {

    $stateProvider
      .state('home.miner-settings', {
        url: 'miner-settings/:state',
        templateUrl: '/modules/settings/client/views/miner-settings.client.view.html',
        controller: 'MinerSettingsController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Global Miner Settings'
        }
      })
      .state('home.pool-settings', {
        url: 'pool-settings/:state',
        templateUrl: '/modules/settings/client/views/pool-settings.client.view.html',
        controller: 'PoolSettingsController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Global Pool Settings'
        }
      })
      .state('home.flag-settings', {
        url: 'flag-settings/:state',
        templateUrl: '/modules/settings/client/views/flag-settings.client.view.html',
        controller: 'FlagSettingsController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Sgminer Flags Settings'
        }
      })
      .state('home.claymore-settings', {
        url: 'claymore-settings/:state',
        templateUrl: '/modules/settings/client/views/claymore-settings.client.view.html',
        controller: 'ClaymoreSettingsController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Claymore Settings'
        }
      })
      .state('home.rig-settings', {
        url: 'rig-settings/:state?mac&gpus&miner',
        templateUrl: '/modules/settings/client/views/rig-settings.client.view.html',
        controller: 'RigSettingsController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Rig Settings'
        }
      })
      .state('home.ip-settings', {
        url: 'ip-settings/:state?mac&name',
        templateUrl: '/modules/settings/client/views/ip-settings.client.view.html',
        controller: 'IPSettingsController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'IP Settings'
        }
      });
  }
}());

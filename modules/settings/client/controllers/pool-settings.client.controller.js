(function () {
  'use strict';

  angular
    .module('settings')
    .controller('PoolSettingsController', PoolSettingsController);

  PoolSettingsController.$inject = ['$scope', '$state', '$location', 'SettingsService', 'Authentication', 'Notification'];

  function PoolSettingsController($scope, $state, $location, SettingsService, Authentication, Notification) {
    var vm = this;

    vm.user = Authentication.user;

    /* vm.state = function() {
      return $state.params.state;
    };*/

    vm.state = $state.params.state;
    // vm.setState(vm.state);

    vm.init = function() {
      $(`#${vm.state}-link`).click();

      $('#wallet-form').validator();
      $('#pool-form').validator();
      $('#miner-form').validator();
    };

    $scope.$on('$viewContentLoaded', function (event) {
      // code that will be executed ...
      // every time this view is loaded
      vm.init();

    });

    vm.settings = {
      info: {}
    };

    vm.input = {};

    SettingsService.getSetting(vm.user.username)
      .then(function(settings) {
        vm.settings = settings;
      })
      .catch(function(err) {
        Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> No Setting!' });
      });

    vm.changeSettings = function(message) {
      SettingsService.updateSetting(vm.user.username, vm.settings.info)
        .then(function(settings) {
          vm.settings = settings;
          Notification.success({ message: `<i class="glyphicon glyphicon-ok"></i> ${message}`, title: '<i class="glyphicon glyphicon-ok"></i> Success!', delay: 6000 });
        })
        .catch(function(err) {
          Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Error!' });
        });
    };

    vm.setState = function(state) {
      $state.go('home.pool-settings', { state: state }).then(function() {

      });
    };

    vm.wallet = function() {
      return vm.settings.info.proxy_wallet;
    };

    vm.setWallet = function($valid) {
      if ($valid !== true) return;

      vm.settings.info.proxy_wallet = vm.input.wallet;
      vm.changeSettings('You have successfully changed global wallet.<br />To apply changes, please trigger a mass reboot.');
    };

    vm.globalPool = function() {
      return vm.settings.info.proxy_pool1;
    };

    vm.backupPool = function() {
      return vm.settings.info.proxy_pool2;
    };

    vm.setPool = function($valid) {
      if ($valid !== true) return;

      vm.settings.info.proxy_pool1 = vm.input.globalPool;
      vm.settings.info.proxy_pool2 = vm.input.backupPool;
      vm.changeSettings('You have successfully changed global pool.<br />To apply changes, please trigger a mass reboot.');
    };

    vm.globalMiner = function() {
      var globalMiner = vm.settings.info.global_miner;
      var pattern = ['claymore-zec', 'sgminer-gm-xmr', 'sgminer-gm', 'claymore', 'optiminer-zcash', 'claymore-xmr'];
      var replace = ['Claymore Zcash', 'Sgminer XMR', 'Sgminer Ethereum', 'Claymore Ethereum', 'Optiminer Zcash', 'Claymore XMR'];
      for (var i = 0; i < pattern.length; i++) {
        if (globalMiner === pattern[i]) {
          return replace[i];
        }
      }
    };

    vm.pass1 = function() {
      return vm.settings.info.pool_pass1;
    };

    vm.pass2 = function() {
      return vm.settings.info.pool_pass2;
    };

    vm.setGlobalMiner = function($valid) {
      if ($valid !== true) return;
      
      vm.settings.info.proxy_pool1 = vm.input.globalPool;
      vm.settings.info.proxy_pool2 = vm.input.backupPool;
      vm.settings.info.proxy_wallet = vm.input.wallet;
      vm.settings.info.pool_pass1 = vm.input.poolPass1;
      vm.settings.info.pool_pass2 = vm.input.poolPass2;
      vm.settings.info.global_miner = vm.input.globalMiner;
      vm.changeSettings('You have successfully changed global miner.<br />To apply changes, please trigger a mass reboot.');
    };
  }
}());

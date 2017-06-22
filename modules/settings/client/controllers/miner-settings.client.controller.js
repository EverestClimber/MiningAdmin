(function () {
  'use strict';

  angular
    .module('settings')
    .controller('MinerSettingsController', MinerSettingsController);

  MinerSettingsController.$inject = ['$scope', '$state', 'SettingsService', 'Authentication', 'Notification'];

  function MinerSettingsController($scope, $state, SettingsService, Authentication, Notification) {
    var vm = this;

    vm.user = Authentication.user;

    /* vm.state = function() {
      return $state.params.state;
    };*/

    vm.state = $state.params.state;
    // vm.setState(vm.state);

    vm.init = function() {
      $(`#${vm.state}-link`).click();

      $('#core-clock-form').validator();
      $('#memory-clock-form').validator();
      $('#fan-speed-form').validator();
      $('#power-form').validator();
      $('#mass-reboot-form').validator();

    };

    $scope.$on('$viewContentLoaded', function (event) {
      // code that will be executed ...
      // every time this view is loaded
      vm.init();

    });

    vm.setState = function(state) {
      $state.go('home.miner-settings', { state: state }).then(function() {

      });
    };

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
          Notification.success({ message: `<i class="glyphicon glyphicon-ok"></i> ${message}`, title: '<i class="glyphicon glyphicon-ok"></i> Success!', delay: 20000 });
        })
        .catch(function(err) {
          Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Error!' });
        });
    };

    vm.coreClock = function() {
      return vm.settings.info.global_core ? vm.settings.info.global_core : 'Not Set';
    };

    vm.setCoreClock = function() {
      vm.settings.info.global_core = vm.input.coreClock;
      vm.changeSettings('You have successfully changed global core clock.<br />To apply changes, please trigger a mass reboot.');
    };

    vm.memoryClock = function() {
      return vm.settings.info.global_mem ? vm.settings.info.global_mem : 'Not Set';
    };

    vm.setMemoryClock = function() {
      vm.settings.info.global_mem = vm.input.memoryClock;
      vm.changeSettings('You have successfully changed global memory clock.</br>To apply changes, please trigger a mass reboot.');
    };

    vm.fanSpeed = function() {
      return vm.settings.info.global_fan;
    };

    vm.setFanSpeed = function() {
      vm.settings.info.global_fan = vm.input.fanSpeed;
      vm.changeSettings('You have successfully changed your global fan settings.</br>To apply changes, please trigger a mass reboot.');
    };

    vm.power = function() {
      return vm.settings.info.global_power_tune ? vm.settings.info.global_power_tune : 'Not Set';
    };

    vm.setPower = function() {
      vm.settings.info.global_power_tune = vm.input.power;
      vm.changeSettings('You have successfully changed your global power tune settings.</br>To apply changes, please trigger a mass reboot.');
    };

    vm.massReboot = function() {
      return vm.settings.info.mass_reboot ? vm.settings.info.mass_reboot : 0;
    };

    vm.setMassReboot = function() {
      if (vm.settings.info.mass_reboot) {
        vm.settings.info.mass_reboot++;
      } else {
        vm.settings.info.mass_reboot = 1;
      }
      vm.changeSettings('<p>Hang tight! Systems will reboot in a few seconds!</p>');
    };
  }
}());

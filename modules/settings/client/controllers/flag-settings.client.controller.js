(function () {
  'use strict';

  angular
    .module('settings')
    .controller('FlagSettingsController', FlagSettingsController);

  FlagSettingsController.$inject = ['$scope', '$state', 'SettingsService', 'Authentication', 'Notification'];

  function FlagSettingsController($scope, $state, SettingsService, Authentication, Notification) {
    var vm = this;

    vm.user = Authentication.user;

    /* vm.state = function() {
      return $state.params.state;
    };*/

    vm.state = $state.params.state;
    // vm.setState(vm.state);

    vm.init = function() {
      $(`#${vm.state}-link`).click();

      $('#worksize-form').validator();
      $('#intensity-form').validator();
      $('#threads-form').validator();
    };

    $scope.$on('$viewContentLoaded', function (event) {
      // code that will be executed ...
      // every time this view is loaded
      vm.init();

    });

    vm.setState = function(state) {
      $state.go('home.flag-settings', { state: state }).then(function() {
        // $location.hash = state;

      });
    };

    vm.input = {};
    vm.settings = {
      info: {}
    };

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

    SettingsService.getSetting(vm.user.username)
      .then(function(settings) {
        vm.settings = settings;
      })
      .catch(function(err) {
        Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> No Setting!' });
      });

    vm.sgminerWorksize = function() {
      return vm.settings.info.worksize ? vm.settings.info.worksize : 'Not yet manually set';
    };

    vm.sgminerXMRWorkSize = function() {
      return vm.settings.info.xmr_worksize ? vm.settings.info.xmr_worksize : 'Not yet manually set';
    };

    vm.setWorkSize = function($valid) {
      if ($valid !== true) return;

      vm.settings.info.worksize = vm.input.worksize;
      vm.settings.info.xmr_worksize = vm.input.xmrWorksize;
      vm.changeSettings('You have successfully changed your worksize settings for sgminer.<br />To apply changes, please trigger a mass reboot.');
    };

    vm.sgminerIntensity = function() {
      return vm.settings.info.intensity ? vm.settings.info.intensity : 'Not yet manually set';
    };

    vm.sgminerXMRIntensity = function() {
      return vm.settings.info.xmr_intensity ? vm.settings.info.xmr_intensity : 'Not yet manually set';
    };

    vm.setIntensity = function($valid) {
      if ($valid !== true) return;

      vm.settings.info.intensity = vm.input.intensity;
      vm.settings.info.xmr_intensity = vm.input.xmrIntensity;
      vm.changeSettings('You have successfully changed your intensity settings for sgminer.<br />To apply changes, please trigger a mass reboot.');
    };

    vm.sgminerThreads = function() {
      return vm.settings.info.gpu_threads ? vm.settings.info.gpu_threads : 'Not yet manually set';
    };

    vm.sgminerXMRThreads = function() {
      return vm.settings.info.xmr_gpu_threads ? vm.settings.info.xmr_gpu_threads : 'Not yet manually set';
    };

    vm.setThreads = function($valid) {
      if ($valid !== true) return;

      vm.settings.info.gpu_threads = vm.input.threads;
      vm.settings.info.xmr_gpu_threads = vm.input.xmrThreads;
      vm.changeSettings('You have successfully changed your threads settings for sgminer.<br />To apply changes, please trigger a mass reboot.');
    };
  }
}());

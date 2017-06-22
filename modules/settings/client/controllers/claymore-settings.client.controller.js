(function () {
  'use strict';

  angular
    .module('settings')
    .controller('ClaymoreSettingsController', ClaymoreSettingsController);

  ClaymoreSettingsController.$inject = ['$scope', '$state', '$location', 'SettingsService', 'Authentication', 'Notification'];

  function ClaymoreSettingsController($scope, $state, $location, SettingsService, Authentication, Notification) {
    var vm = this;

    vm.user = Authentication.user;

    /* vm.state = function() {
      return $state.params.state;
    };*/

    vm.state = $state.params.state;
    // vm.setState(vm.state);

    vm.init = function() {
      $(`#${vm.state}-link`).click();

      $('#zec-mode-form').validator();
      $('#intensity-form').validator();
    };

    $scope.$on('$viewContentLoaded', function (event) {
      // code that will be executed ...
      // every time this view is loaded
      vm.init();

    });

    vm.setState = function(state) {
      $state.go('home.claymore-settings', { state: state }).then(function() {

      });
    };

    vm.input = {};
    vm.settings = {
      info: {}
    };

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

    vm.clayZecMode = function() {
      return vm.settings.info.clay_zec_mode ? vm.settings.info.clay_zec_mode : 0;
    };

    vm.setClayZecMode = function() {
      vm.settings.info.clay_zec_mode = `mode ${vm.input.clayZecMode}`;
      vm.changeSettings('You have successfully changed claymore zec mode settings.</br>To apply changes, please trigger a mass reboot.');
    };

    vm.intensity = function() {
      return vm.settings.info.clay_intensity ? vm.settings.info.clay_intensity : 'Not yet manually set';
    };

    vm.zecIntensity = function() {
      return vm.settings.info.clay_zec_intensity ? vm.settings.info.clay_zec_intensity : 'Not yet manually set';
    };

    vm.setIntensity = function() {
      vm.settings.info.clay_intensity = vm.input.intensity;
      vm.settings.info.clay_zec_intensity = vm.input.zecIntensity;
      vm.changeSettings('You have successfully changed your intensity settings.</br>To apply changes, please trigger a mass reboot.');
    };

  }
}());

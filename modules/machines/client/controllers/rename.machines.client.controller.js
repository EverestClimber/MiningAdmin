(function () {
  'use strict';

  angular
    .module('machines')
    .controller('RenameController', RenameController);

  RenameController.$inject = ['Authentication', '$uibModalInstance', 'params', 'SettingsService', 'MachinesService', 'Notification'];

  function RenameController(Authentication, $uibModalInstance, params, SettingsService, MachinesService, Notification) {
    var vm = this;

    vm.machine = params.machine;
    vm.user = Authentication.user;

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

    vm.changeSettings = function() {
      SettingsService.updateSetting(vm.user.username, vm.settings.info)
        .then(function(settings) {
          vm.settings = settings;
          vm.ok('Machine name is changed successfully!');
        })
        .catch(function(err) {
          Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Error!' });
        });
    };

    vm.changeMachine = function() {
      MachinesService.updateMachine(vm.user.username, vm.machine.host, vm.machine.info, vm.input.name, true)
        .then(function(machine) {
          vm.machine.host = vm.input.name;
          vm.machine.info.hostname = vm.input.name;
          vm.changeSettings();

        })
        .catch(function(err) {
          Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Error!' });
        });
    };

    vm.ok = function (result) {
      $uibModalInstance.close(result);
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    vm.rename = function($valid) {
      if ($valid !== true) return;

      vm.input.name = vm.input.name.replace(' ', '');
      var newName = vm.input.name;
      var miner = vm.machine.host;
      var mac = vm.machine.info.mac;
      var patt = new RegExp(`${mac}(.*)`);

      if (!vm.settings.info.name) {
        vm.settings.info.name = [];
      }
      var name = vm.settings.info.name;

      var i;
      for (i = 0; i < name.length; i++) {
        if (name[i].match(patt)) {
          break;
        }
      }

      name[i] = `${mac} ${newName}`;

      vm.changeMachine();
    };

    vm.init = function() {
      // $('#rename-form').validator();
    };

    vm.init();

  }
}());

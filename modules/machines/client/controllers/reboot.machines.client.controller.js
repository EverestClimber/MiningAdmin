(function () {
  'use strict';

  angular
    .module('machines')
    .controller('RebootController', RebootController);

  RebootController.$inject = ['Authentication', '$uibModalInstance', 'params', 'SettingsService', 'Notification'];

  function RebootController(Authentication, $uibModalInstance, params, SettingsService, Notification) {
    var vm = this;

    vm.mac = params.mac;
    vm.rig = params.rig;
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
          vm.ok('Successfully sent reboot trigger!');
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

    vm.getReboots = function() {
      var reb = vm.settings.info.reb;
      var name = vm.mac;

      if (!reb) return 0;

      var patt = new RegExp(`^${name}(.*)`);
      var i;
      for (i = 0; i < reb.length; i++) {
        if (reb[i].match(patt)) {
          break;
        }
      }

      if (i === reb.length) {
        return 0;
      } else {
        var repPatt = new RegExp(`^${name}`);
        return reb[i].replace(repPatt, '');
      }
    };

    vm.reboot = function($valid) {
      if ($valid !== true) return;

      var mac = vm.mac;
      var patt = new RegExp(`${mac}(.*)`);

      if (!vm.settings.info.reb) {
        vm.settings.info.reb = [];
      }
      var reb = vm.settings.info.reb;

      var i;
      for (i = 0; i < reb.length; i++) {
        if (reb[i].match(patt)) {
          break;
        }
      }

      var count = 0;
      if (i !== reb.length) {
        var repPatt = new RegExp(`${mac}`);
        count = parseInt(reb[i].replace(repPatt, ''), 10);
      }
      count++;
      reb[i] = `${mac} ${count}`;

      vm.changeSettings();
    };

    vm.init = function() {
      // $('#rename-form').validator();
    };

    vm.init();

  }
}());

(function () {
  'use strict';

  angular
    .module('settings')
    .controller('RigSettingsController', RigSettingsController);

  RigSettingsController.$inject = ['$scope', '$stateParams', '$state', 'SettingsService', 'Authentication', 'Notification'];

  function RigSettingsController($scope, $stateParams, $state, SettingsService, Authentication, Notification) {
    var vm = this;

    vm.user = Authentication.user;

    vm.state = $stateParams.state;
    vm.params = $stateParams;

    vm.getName = function() {
      if (vm.params.miner) {
        return vm.params.miner;
      } else {
        return vm.params.rig;
      }
    };

    vm.getNumber = function(num) {
      return new Array(num);
    };

    vm.init = function() {
      $(`#${vm.state}-link`).click();

      $('#wallet-form').validator();
      $('#pool-form').validator();
      $('#miner-form').validator();

      if (vm.params.gpus) vm.params.gpus = parseInt(vm.params.gpus, 10);
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

    vm.reboots = function() {
      var reb = vm.settings.reb;
      var name = vm.params.mac;
      if (!name) {
        name = vm.params.miner;
      }

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

    vm.coreRig = function() {
      var miner = vm.params.miner;
      var cor = vm.settings.cor;
      var patt = new RegExp(`^${miner}(.*)`);

      if (!cor) return '';

      var i;
      for (i = 0; i < cor.length; i++) {
        if (cor[i].match(patt)) {
          break;
        }
      }

      if (i === cor.length) {
        return '';
      } else {
        var repPatt = new RegExp(`^${miner}`);
        return cor[i].replace(repPatt, '');
      }
    };

    vm.memRig = function() {
      var miner = vm.params.miner;
      var mem = vm.settings.mem;
      var patt = new RegExp(`${miner}(.*)`);

      if (!mem) return '';

      var i;
      for (i = 0; i < mem.length; i++) {
        if (mem[i].match(patt)) {
          break;
        }
      }

      if (i === mem.length) {
        return '';
      } else {
        var repPatt = new RegExp(`${miner}`);
        return mem[i].replace(repPatt, '');
      }
    };

    vm.fanRig = function() {
      var miner = vm.params.miner;
      var fan = vm.settings.fan;
      var patt = new RegExp(`${miner}(.*)`);

      if (!fan) return '';

      var i;
      for (i = 0; i < fan.length; i++) {
        if (fan[i].match(patt)) {
          break;
        }
      }

      if (i === fan.length) {
        return '';
      } else {
        var repPatt = new RegExp(`${miner}`);
        return fan[i].replace(repPatt, '');
      }
    };

    vm.pwrRig = function() {
      var miner = vm.params.miner;
      var pwr = vm.settings.pwr;
      var patt = new RegExp(`${miner}(.*)`);

      if (!pwr) return '';

      var i;
      for (i = 0; i < pwr.length; i++) {
        if (pwr[i].match(patt)) {
          break;
        }
      }

      if (i === pwr.length) {
        return '';
      } else {
        var repPatt = new RegExp(`${miner}`);
        return pwr[i].replace(repPatt, '');
      }
    };

    vm.setReboots = function($valid) {
      if ($valid !== true) return;

      vm.settings.info.proxy_wallet = vm.input.wallet;
      vm.changeSettings('You have successfully changed global wallet.<br />To apply changes, please trigger a mass reboot.');
    };

  }
}());

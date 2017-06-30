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

    vm.input = {};

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

    vm.settings = {
      info: {}
    };

    SettingsService.getSetting(vm.user.username)
      .then(function(settings) {
        vm.settings = settings;
        vm.init();
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
      var reb = vm.settings.info.reb;
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
      var cor = vm.settings.info.cor;
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

    vm.setCoreRig = function() {
      var miner = vm.params.miner;
      var patt = new RegExp(`^${miner}(.*)`);

      if (!vm.settings.info.cor) {
        vm.settings.info.cor = [];
      }
      var cor = vm.settings.info.cor;

      var i;
      for (i = 0; i < cor.length; i++) {
        if (cor[i].match(patt)) {
          break;
        }
      }

      cor[i] = `${miner} ${vm.input.core.join(' ')}`;
    };

    vm.memRig = function() {
      var miner = vm.params.miner;
      var mem = vm.settings.info.mem;
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

    vm.setMemRig = function() {
      var miner = vm.params.miner;
      var patt = new RegExp(`^${miner}(.*)`);

      if (!vm.settings.info.mem) {
        vm.settings.info.mem = [];
      }
      var mem = vm.settings.info.mem;

      var i;
      for (i = 0; i < mem.length; i++) {
        if (mem[i].match(patt)) {
          break;
        }
      }

      mem[i] = `${miner} ${vm.input.mem.join(' ')}`;
    };

    vm.fanRig = function() {
      var miner = vm.params.miner;
      var fan = vm.settings.info.fan;
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

    vm.setFanRig = function() {
      var miner = vm.params.miner;
      var patt = new RegExp(`^${miner}(.*)`);

      if (!vm.settings.info.fan) {
        vm.settings.info.fan = [];
      }
      var fan = vm.settings.info.fan;

      var i;
      for (i = 0; i < fan.length; i++) {
        if (fan[i].match(patt)) {
          break;
        }
      }

      fan[i] = `${miner} ${vm.input.fan.join(' ')}`;
    };

    vm.pwrRig = function() {
      var miner = vm.params.miner;
      var pwr = vm.settings.info.pwr;
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

    vm.setPowerRig = function() {
      var miner = vm.params.miner;
      var patt = new RegExp(`^${miner}(.*)`);

      if (!vm.settings.info.pwr) {
        vm.settings.info.pwr = [];
      }
      var pwr = vm.settings.info.pwr;

      var i;
      for (i = 0; i < pwr.length; i++) {
        if (pwr[i].match(patt)) {
          break;
        }
      }

      pwr[i] = `${miner} ${vm.input.power.join(' ')}`;
    };

    vm.setSettings = function($valid) {
      // alert('settings');
      vm.setCoreRig();
      vm.setMemRig();
      vm.setFanRig();
      vm.setPowerRig();

      vm.changeSettings('You have successfully changed settings.<br />To apply changes, please trigger a mass reboot.');
    };

    vm.setReboots = function($valid) {
      if ($valid !== true) return;

      vm.settings.info.proxy_wallet = vm.input.wallet;
      vm.changeSettings('You have successfully changed global wallet.<br />To apply changes, please trigger a mass reboot.');
    };

    vm.init = function() {
      $(`#${vm.state}-link`).click();

      $('#settings-form').validator();

      if (vm.params.gpus) vm.params.gpus = parseInt(vm.params.gpus, 10);
      console.log(vm.params.gpus);
      console.log(vm.coreRig());
      var cor = vm.coreRig().trim().split(' ');
      console.log(cor);
      var mem = vm.memRig().trim().split(' ');
      var fan = vm.fanRig().trim().split(' ');
      var power = vm.pwrRig().trim().split(' ');
      vm.input.core = [];
      vm.input.mem = [];
      vm.input.fan = [];
      vm.input.power = [];
      for (let i = 0; i < vm.params.gpus; i++) {
        vm.input.core[i] = cor[i];
        vm.input.mem[i] = mem[i];
        vm.input.fan[i] = fan[i];
        vm.input.power[i] = power[i];
      }
    };

    $scope.$on('$viewContentLoaded', function (event) {
      // code that will be executed ...
      // every time this view is loaded
      // vm.init();
    });

  }
}());

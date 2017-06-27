(function () {
  'use strict';

  angular
    .module('settings')
    .controller('IPSettingsController', IPSettingsController);

  IPSettingsController.$inject = ['$scope', '$state', 'SettingsService', 'Authentication', 'Notification'];

  function IPSettingsController($scope, $state, SettingsService, Authentication, Notification) {
    var vm = this;

    vm.user = Authentication.user;

    vm.state = $state.params.state;
    vm.mac = $state.params.mac;
    vm.name = $state.params.name;

    vm.init = function() {
      $(`#${vm.state}-link`).click();

      $('#ip-form').validator();
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

    vm.fixed = function() {
      var mac = vm.mac;
      var fixedIP = vm.settings.info.fixed_ip;
      var patt = new RegExp(`${mac}(.*)`);

      if (!fixedIP) return '';

      var i;
      for (i = 0; i < fixedIP.length; i++) {
        if (fixedIP[i].match(patt)) {
          break;
        }
      }

      if (i === fixedIP.length) {
        return '';
      } else {
        var repPatt = new RegExp(`${mac}`);
        return fixedIP[i].replace(repPatt, '');
      }
    };

    vm.setFixed = function() {

      var mac = vm.mac;
      var patt = new RegExp(`${mac}(.*)`);

      if (!vm.settings.info.fixed_ip) {
        vm.settings.info.fixed_ip = [];
      }
      var fixedIP = vm.settings.info.fixed_ip;

      var i;
      for (i = 0; i < fixedIP.length; i++) {
        if (fixedIP[i].match(patt)) {
          break;
        }
      }

      fixedIP[i] = `${mac} ${vm.input.ip}`;
    };

    vm.netMask = function() {
      var mac = vm.mac;
      var netMask = vm.settings.info.net_mask;
      var patt = new RegExp(`${mac}(.*)`);

      if (!netMask) return '';

      var i;
      for (i = 0; i < netMask.length; i++) {
        if (netMask[i].match(patt)) {
          break;
        }
      }

      if (i === netMask.length) {
        return '';
      } else {
        var repPatt = new RegExp(`${mac}`);
        return netMask[i].replace(repPatt, '');
      }
    };

    vm.setNetMask = function() {
      var mac = vm.mac;
      var patt = new RegExp(`${mac}(.*)`);

      if (!vm.settings.info.net_mask) {
        vm.settings.info.net_mask = [];
      }
      var netMask = vm.settings.info.net_mask;

      var i;
      for (i = 0; i < netMask.length; i++) {
        if (netMask[i].match(patt)) {
          break;
        }
      }

      netMask[i] = `${mac} ${vm.input.netMask}`;
    };

    vm.gateway = function() {
      var mac = vm.mac;
      var gateway = vm.settings.info.gateway;
      var patt = new RegExp(`${mac}(.*)`);

      if (!gateway) return '';

      var i;
      for (i = 0; i < gateway.length; i++) {
        if (gateway[i].match(patt)) {
          break;
        }
      }

      if (i === gateway.length) {
        return '';
      } else {
        var repPatt = new RegExp(`${mac}`);
        return gateway[i].replace(repPatt, '');
      }
    };

    vm.setGateway = function() {
      var mac = vm.mac;
      var patt = new RegExp(`${mac}(.*)`);

      if (!vm.settings.info.gateway) {
        vm.settings.info.gateway = [];
      }
      var gateway = vm.settings.info.gateway;

      var i;
      for (i = 0; i < gateway.length; i++) {
        if (gateway[i].match(patt)) {
          break;
        }
      }

      gateway[i] = `${mac} ${vm.input.gateway}`;
    };

    vm.dhcp = function() {
      var mac = vm.mac;
      var dhcp = vm.settings.info.dhcp;
      var patt = new RegExp(`${mac}(.*)`);

      if (!dhcp) return '';

      var i;
      for (i = 0; i < dhcp.length; i++) {
        if (dhcp[i].match(patt)) {
          break;
        }
      }

      if (i === dhcp.length) {
        return false;
      } else {
        var repPatt = new RegExp(`${mac}`);
        var result = dhcp[i].replace(repPatt, '');
        return result.trim() === 'enabled';
      }
    };

    vm.setdhcp = function() {
      var mac = vm.mac;
      var patt = new RegExp(`${mac}(.*)`);

      if (!vm.settings.info.dhcp) {
        vm.settings.info.dhcp = [];
      }
      var dhcp = vm.settings.info.dhcp;

      var i;
      for (i = 0; i < dhcp.length; i++) {
        if (dhcp[i].match(patt)) {
          break;
        }
      }

      dhcp[i] = `${mac} ${vm.input.dhcp === true ? 'enabled' : 'disabled'}`;
    };

    vm.setIP = function($valid) {
      /*if ($valid !== true) return;

      vm.settings.info.proxy_wallet = vm.input.wallet;
      */

      if (vm.input.dhcp === true) {
        vm.setFixed();
        vm.setNetMask();
        vm.setGateway();
        vm.setdhcp();
      } else {
        vm.setdhcp();
      }

      vm.changeSettings('You have successfully set a fixed IP.<br />Reboot your system for changes to take effect.');

    };

  }
}());

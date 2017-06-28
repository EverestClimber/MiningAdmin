(function () {
  'use strict';

  angular
    .module('group')
    .controller('CreateGroupController', CreateGroupController);

  CreateGroupController.$inject = ['$scope', '$timeout', '$state', 'SettingsService', 'GroupsService', 'Authentication', 'Notification'];

  function CreateGroupController($scope, $timeout, $state, SettingsService, GroupsService, Authentication, Notification) {
    var vm = this;

    vm.user = Authentication.user;

    /* vm.state = function() {
      return $state.params.state;
    };*/

    vm.state = $state.params.state;
    // vm.setState(vm.state);

    vm.init = function() {
      // $('#create-form').validator();
    };

    vm.setTooltip = function() {
      // Initialize Tooltips
      $('.tooltip.top.in').remove();
      $timeout(function() {
        $('[data-toggle="tooltip"], .enable-tooltip').tooltip({ container: 'body', animation: false });
      }, 100);
    };

    $scope.$on('$viewContentLoaded', function (event) {
      // code that will be executed ...
      // every time this view is loaded
      vm.init();

      vm.setTooltip();
    });

    vm.input = {};
    vm.settings = {
      info: {}
    };

    SettingsService.getSetting(vm.user.username)
      .then(function(settings) {
        vm.settings = settings;
      })
      .catch(function(err) {
        // Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> No Setting!' });
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

    vm.createGroup = function($valid) {
      if ($valid !== true) return;

      var input = vm.input;
      if (!input.grouppool2) {
        input.grouppool2 = input.grouppool;
      }
      if (!input.grouppass) {
        input.grouppass = 'x';
      }
      if (!input.grouppass2) {
        input.grouppass2 = 'x';
      }

      GroupsService.createGroup(vm.user.username, input)
        .then(function(g) {
          var settings = vm.settings.info;
          var group = {};
          group.group = `${input.groupname} ${input.grouprange}`;
          group.miner = input.groupminer;
          group.pool = input.grouppool;
          group.proxypool1 = input.grouppool;
          group.proxypool2 = input.grouppool2;
          group.proxywallet = input.groupwallet;
          group.poolpass = input.grouppass;
          group.poolpass2 = input.grouppass2;
          group.core = input.core;
          group.mem = input.mem;
          group.pwr = input.power;
          group.fan = input.fan;
          group.maxgputemp = input.maxtemp;
          group.intensity = input.sgintensity;
          group.xmrintensity = input.sgxmrintensity;
          group.worksize = input.sgworksize;
          group.xmrworksize = input.sgxmrworksize;
          group.gputhreads = input.sgthreads;
          group.xmrgputhreads = input.sgxmrthreads;
          group.clayintensity = input.clayintensity;
          group.clayzecintensity = input.clayzecintensity;
          group.clayzecmode = `mode ${input.clayzecmode}`;

          if (!settings.group) settings.group = [];
          settings.group.push(group);
          vm.changeSettings('You have successfully added a new group');
        })
        .catch(function(err) {
          Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Error!' });
        });

    };
  }
}());

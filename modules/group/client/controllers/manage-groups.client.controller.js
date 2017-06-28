(function () {
  'use strict';

  angular
    .module('group')
    .controller('ManageGroupController', ManageGroupController);

  ManageGroupController.$inject = ['$scope', '$state', '$timeout', 'SettingsService', 'GroupsService', 'Authentication', 'Notification'];

  function ManageGroupController($scope, $state, $timeout, SettingsService, GroupsService, Authentication, Notification) {
    var vm = this;

    vm.user = Authentication.user;

    vm.state = $state.params.state;

    vm.settings = {
      info: {}
    };

    vm.setTooltip = function() {
      // Initialize Tooltips
      $('.tooltip.top.in').remove();
      $timeout(function() {
        $('[data-toggle="tooltip"], .enable-tooltip').tooltip({ container: 'body', animation: false });
      }, 100);
    };

    vm.init = function() {
      // $('#create-form').validator();
      vm.setTooltip();

      vm.minerValue = ['claymore-zec', 'sgminer-gm-xmr', 'sgminer-gm', 'claymore', 'optiminer-zcash', 'claymore-xmr'];
      vm.minerName = ['Claymore Zcash', 'Sgminer XMR', 'Sgminer Ethereum', 'Claymore Ethereum', 'Optiminer Zcash', 'Claymore XMR'];
    };

    $scope.$on('$viewContentLoaded', function (event) {
      // code that will be executed ...
      // every time this view is loaded
      vm.init();

    });

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

    GroupsService.getGroups(vm.user.username)
      .then(function(groups) {
        vm.groups = groups;
      })
      .catch(function(err) {
        Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Error!' });
      });

    vm.deleteGroup = function(index) {
      GroupsService.deleteGroup(vm.user.username, vm.groups[index].name)
        .then(function() {
          var pat = new RegExp(`^${vm.groups[index].name}`);
          for (let i = 0; i < vm.settings.info.group.length; i++) {
            if (vm.settings.info.group[i].group.match(pat)) {
              vm.settings.info.group.splice(i, 1);
              break;
            }
          }
          vm.groups.splice(index, 1);
          vm.changeSettings('Delete the group successfully');
          vm.setTooltip();
        })
        .catch(function(err) {
          Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Error!' });
        });
    };

    vm.modifyGroup = function($valid, index) {
      if ($valid !== true) return;

      GroupsService.modifyGroup(vm.user.username, vm.groups[index].name, vm.groups[index].info)
        .then(function() {
          var pat = new RegExp(`^${vm.groups[index].name}`);
          var i;
          for (i = 0; i < vm.settings.info.group.length; i++) {
            if (vm.settings.info.group[i].group.match(pat)) {

              break;
            }
          }
          var group = vm.settings.info.group[i];
          var input = vm.groups[index].info;
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

          vm.changeSettings('Successfully modified');
        })
        .catch(function(err) {
          Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Error!' });
        });
    };
  }
}());

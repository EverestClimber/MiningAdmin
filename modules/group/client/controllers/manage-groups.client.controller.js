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
          vm.groups.splice(index, 1);
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Delete the group successfully.', title: '<i class="glyphicon glyphicon-ok"></i> Delete Group', delay: 6000 });
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
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Successfully modified.', title: '<i class="glyphicon glyphicon-ok"></i> Modify Group', delay: 6000 });
        })
        .catch(function(err) {
          Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Error!' });
        });
    };
  }
}());

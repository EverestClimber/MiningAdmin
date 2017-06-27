(function () {
  'use strict';

  angular
    .module('machines')
    .controller('LogsController', LogsController);

  LogsController.$inject = ['Authentication', '$uibModalInstance', 'params', 'LogsService', 'Notification'];

  function LogsController(Authentication, $uibModalInstance, params, LogsService, Notification) {
    var vm = this;

    vm.miner = params.miner;
    vm.user = Authentication.user;

    vm.logs = {};

    LogsService.getLogs(vm.user.username, vm.miner)
      .then(function(logs) {
        if (!logs.log) {
          vm.logs = [];
        } else {
          vm.logs = logs.log.split('\n');
          if (vm.logs.length > 10) {
            vm.logs = vm.logs.slice(0, 9);
          }
        }
      })
      .catch(function(err) {
        Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Error!' });
      });

    vm.ok = function (result) {
      $uibModalInstance.close(result);
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    vm.latestLog = function() {
      var result = '';
      if (vm.logs.length !== 0) {
        result = vm.logs[0];
      } else {
        result = 'No log for this machine!';
      }
      return result;
    };

    vm.clear = function() {
      LogsService.clearLogs(vm.user.username, vm.miner)
        .then(function() {
          vm.logs = {};
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Log is cleared.', title: '<i class="glyphicon glyphicon-ok"></i> Success', delay: 6000 });
        })
        .catch(function(err) {
          Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Error!' });
        });
    };

    vm.init = function() {
      // $('#rename-form').validator();
    };

    vm.init();

  }
}());

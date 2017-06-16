(function () {
  'use strict';

  angular
    .module('core')
    .controller('MachinesController', MachinesController);

  MachinesController.$inject = ['$scope', '$stateParams', 'MachinesService', 'Authentication', 'Notification'];

  function MachinesController($scope, $stateParams, MachinesService, Authentication, Notification) {
    var vm = this;
    vm.user = Authentication.user;
    vm.machineState = $stateParams.state;

    vm.init = function() {
      if (!vm.machineState) {
        vm.machineState = 'all';
      }

      MachinesService.getMachine('snowsea', 'host')
        .then(function(machine) {
          vm.machines = machine;
          console.log(machine);
        })
        .catch(function(err) {
          // console.log(err);
          Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> No Machine!' });
        });

    };

    vm.init();
  }
}());

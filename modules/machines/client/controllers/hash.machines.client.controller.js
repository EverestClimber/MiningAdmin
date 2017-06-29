(function () {
  'use strict';

  angular
    .module('machines')
    .controller('HashController', HashController);

  HashController.$inject = ['$scope', '$timeout', 'Authentication', '$uibModalInstance', 'params', 'HashService', 'Notification'];

  function HashController($scope, $timeout, Authentication, $uibModalInstance, params, HashService, Notification) {
    var vm = this;

    vm.user = Authentication.user;
    vm.miner = params.miner;

    vm.logs = {};

    vm.ok = function (result) {
      $uibModalInstance.close(result);
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    vm.options = {
      elements: {
        point: {
          radius: 0
        }
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: false
            }
          }
        ]
      }
    };

    vm.init = function() {
      // $('#rename-form').validator();

      vm.labels = [];
      vm.series = [''];
      vm.data = [
        [0, 0]
      ];
      vm.onClick = function (points, evt) {
        // console.log(points, evt);
      };

      // Simulate async data update
      $timeout(function () {
        vm.data = [
          vm.hashes
        ];
      }, 300);
    };


    HashService.readHashes(vm.user.username, vm.miner)
      .then(function(hashes) {
        vm.hashes = [];

        for (let i = 0; i < hashes.length; i++) {
          vm.hashes[i] = hashes[i].hash;
          vm.labels[i] = '';
        }
      })
      .catch(function(err) {
        Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Error!' });
      });

    vm.init();

  }
}());

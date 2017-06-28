(function () {
  'use strict';

  angular
    .module('machines')
    .controller('MachinesController', MachinesController);

  MachinesController.$inject = ['$scope', '$stateParams', '$timeout', 'MachinesService', 'LogsService', 'HashService', 'Authentication', 'Notification', '$uibModal', '$document'];

  function MachinesController($scope, $stateParams, $timeout, MachinesService, LogsService, HashService, Authentication, Notification, $uibModal, $document) {
    var vm = this;

    vm.timeLimit = 300 * 1000; // 300 seconds

    vm.user = Authentication.user;
    vm.machineState = $stateParams.state;
    if (vm.machineState === 'dashboard') vm.machineState = 'online';
    if (vm.machineState !== 'offline' && vm.machineState !== 'online') {
      vm.machineState = 'all';
    }

    vm.getInformation = function(machines) {
      vm.dashboard.rig.onlineCount = 0;
      vm.dashboard.rig.offlineCount = 0;
      vm.dashboard.rig.totalCount = 0;
      vm.dashboard.gpu.onlineCount = 0;
      vm.dashboard.gpu.offlineCount = 0;
      vm.dashboard.gpu.totalCount = 0;
      vm.dashboard.hash.onlineCount = 0;
      vm.dashboard.hash.offlineCount = 0;
      vm.dashboard.hash.totalCount = 0;

      var now = Date.now();

      for (var i = 0; i < machines.length; i++) {
        if (!machines[i].gpu) machines[i].gpu = 0;
        if (!machines[i].hash) machines[i].hash = 0;

        if ((now - machines[i].updated) < vm.timeLimit) {
          // online
          vm.dashboard.rig.onlineCount++;
          vm.dashboard.gpu.onlineCount += machines[i].gpu;
          vm.dashboard.hash.onlineCount += machines[i].hash;
          machines[i].online = true;
          vm.saveLog(machines[i]);
          vm.saveHash(machines[i]);

        } else {
          // offline
          // vm.dashboard.rig.onlineCount++;
          vm.dashboard.gpu.offlineCount += machines[i].gpu;
          vm.dashboard.hash.offlineCount += machines[i].hash;
          machines[i].online = false;
        }

        machines[i].display = vm.getDisplayInformation(machines[i]);
      }

      vm.dashboard.rig.totalCount = machines.length;
      vm.dashboard.rig.offlineCount = vm.dashboard.rig.totalCount - vm.dashboard.rig.onlineCount;

      vm.dashboard.gpu.totalCount = vm.dashboard.gpu.onlineCount + vm.dashboard.gpu.offlineCount;
      vm.dashboard.hash.totalCount = vm.dashboard.hash.onlineCount + vm.dashboard.hash.offlineCount;

    };

    vm.getDisplayInformation = function(machine) {
      var info = machine.info;
      var display = {};

      var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];

      var updated = new Date(machine.updated);
      display.updated = `${monthNames[updated.getMonth()]} ${updated.getDate()} ${updated.getHours()}:${updated.getMinutes()}:${updated.getSeconds()}`;

      if (machine.online === true) {
        if (!info.hash) {
          display.trclass = 'warning';
        } else if (info.overheat === 1) {
          display.trClass = 'danger';
        } else if (!info.temp) {
          display.trClass = 'warning';
        } else {
          display.trClass = 'success';
        }
      } else {
        display.trClass = 'danger';
      }

      // Name
      if (info.miner === 'silentarmy') { display.miner = 'Silent Army'; }
      if (info.miner === 'optiminer-zcash') { display.miner = 'Optiminer Zcash'; }
      if (info.miner === 'sgminer-gm') { display.miner = 'Sgminer ETH'; }
      if (info.miner === 'sgminer-gm-xmr') { display.miner = 'Sgminer XMR'; }
      if (info.miner === 'claymore') { display.miner = 'Claymore ETH'; }
      if (info.miner === 'claymore-zec') { display.miner = 'Claymore Zcash'; }
      if (info.miner === 'ethminer') { display.miner = 'Genoil ETH'; }

      display.wallet = '';
      display.pool1 = '';
      display.pool2 = '';


      var pool_info = info.pool_info.split('\n');
      var pattWallet;
      var pattPool1;
      var pattPool2;
      var i;
      if (info.group) {
        display.group = info.group;

        pattWallet = new RegExp(`(${display.group} proxywallet)(.*)`);
        pattPool1 = new RegExp(`(${display.group} proxypool1)(.*)`);
        pattPool2 = new RegExp(`(${display.group} proxypool2)(.*)`);

        for (i = 0; i < pool_info.length; i++) {
          if (pattWallet.test(pool_info[i])) {
            display.wallet = pool_info[i];
            display.wallet = display.wallet.replace(new RegExp(`${display.group} proxywallet `), '');
          } else if (pattPool1.test(pool_info[i])) {
            display.pool1 = pool_info[i];
            display.pool1 = display.pool1.replace(new RegExp(`${display.group} proxypool1 `), '');
          } else if (pattPool2.test(pool_info[i])) {
            display.pool2 = pool_info[i];
            display.pool2 = display.pool2.replace(new RegExp(`${display.group} proxypool2 `), '');
          }
        }
      } else {
        display.group = 'N/A';

        pattWallet = /(^proxywallet)(.*)/;
        pattPool1 = /(^proxypool1)(.*)/;
        pattPool2 = /(^proxypool2)(.*)/;

        for (i = 0; i < pool_info.length; i++) {
          if (pattWallet.test(pool_info[i])) {
            display.wallet = pool_info[i];
            display.wallet = display.wallet.replace(/proxywallet /, '');
          } else if (pattPool1.test(pool_info[i])) {
            display.pool1 = pool_info[i];
            display.pool1 = display.pool1.replace(/proxypool1 /, '');
          } else if (pattPool2.test(pool_info[i])) {
            display.pool2 = pool_info[i];
            display.pool2 = display.pool2.replace(/proxypool2 /, '');
          }
        }
      }

      // Status
      if (info.cpu_miner_active) {
        display.cpuMiner = 'Active';
      } else {
        display.cpuMiner = 'Not Active';
      }

      var hashes = info.miner_hashes.split(' ');
      var isHashEmpty = false;

      for (i = 0; i < hashes.length; i++) {
        if (hashes[i] === '00.00') {
          isHashEmpty = true;
        }
      }

      if (machine.online === true) {

        if (info.overheat !== 1 && isHashEmpty !== true && info.temp && info.hash) {
          display.statusClass = 'label-success';
          display.status = 'Healthy!';
        } else if (info.overheat === 1) {
          display.statusClass = 'label-danger';
          display.status = 'Overheating!';
        } else if (!info.gpus) {
          display.statusClass = 'label-warning';
          display.status = 'HW Issues!';
        } else if (!info.temp || !info.hash) {
          display.statusClass = 'label-warning';
          display.status = 'Issues!';
        } else {
          display.statusClass = 'label-success';
          display.status = 'OK!';
        }
      } else {
        display.statusClass = 'label-danger';

        if (info.overheat !== 1 && isHashEmpty !== true) {
          display.status = 'Offline!';
        } else if (info.overheat === 1) {
          display.status = 'Overheated!';
        } else if (!info.gpus) {
          display.status = 'HW Issues!';
        } else if (isHashEmpty) {
          display.status = 'GPU(s) Failed!';
        } else {
          display.status = 'Offline!';
        }
      }

      if (info.miner === 'sgminer-gm-xmr') {
        display.hashUnit = 'Kh/s';
      } else if ((info.miner === 'optiminer-zcash') || (info.miner === 'claymore-zec')) {
        display.hashUnit = 'h/s';
      } else if ((info.miner === 'claymore') || (info.miner === 'sgminer')) {
        display.hashUnit = 'Mh/s';
      } else {
        display.hashUnit = '';
      }

      // Uptime
      var uptime = info.uptime ? info.uptime : 0;
      var sec = uptime % 60;
      uptime -= sec;
      var min = (uptime % 3600) / 60;
      uptime -= uptime % 3600;
      var hour = (uptime % 86400) / 3600;
      uptime -= uptime % 86400;
      var date = uptime / 86400;
      display.uptime = `${date}:${hour}:${min}:${sec}`;

      // Model

      display.model = info.models;
      display.model = display.model.replace(/(Advanced Micro Devices, Inc.|Device|rec c7|rev cf)/g, '');
      display.model = display.model.replace(/\n/g, '<br />');

      return display;
    };

    vm.reloadInterval = 5000; // 5s

    vm.init = function() {
      if (!vm.machineState) {
        vm.machineState = 'all';
      }

      vm.reloadData();
    };

    vm.loadData = function() {
      vm.dashboard = {
        rig: {},
        gpu: {},
        hash: {}
      };

      vm.dashboard.rig.ethCount = 0;
      vm.dashboard.rig.xmrCount = 0;
      vm.dashboard.rig.zecCount = 0;

      vm.dashboard.hash.ethCount = 0;
      vm.dashboard.hash.xmrCount = 0;
      vm.dashboard.hash.zecCount = 0;

      MachinesService.getUserMachines(vm.user.username)
        .then(function(machines) {
          vm.machines = machines;
          vm.getInformation(machines);
        })
        .catch(function(err) {
          // console.log(err);
          Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> No Machine!' });
        });
    };

    vm.reloadData = function() {
      vm.loadData();

      vm.timer = $timeout(vm.reloadData, vm.reloadInterval);
      vm.setTooltip();
    };

    $scope.$on('$destroy', function() {
      if (vm.timer) {
        $timeout.cancel(vm.timer);
      }
    });

    vm.deleteMachine = function(user, host) {

      MachinesService.deleteMachine(user, host)
        .then(function(machines) {
          Notification.success({ message: 'Dead entry successfully deleted.', title: '<i class="glyphicon glyphicon-remove"></i> Delete Machine!', delay: 6000 });
          vm.loadData();
        })
        .catch(function(err) {
          // console.log(err);
          Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> No Machine!', delay: 6000 });
        });
    };

    vm.saveLog = function(machine) {
      LogsService.newLogs(vm.user.username, machine.info.hostname, machine.info.miner_log);
    };

    vm.saveHash = function(machine) {
      HashService.addHash(vm.user.username, machine.info.hostname, machine.info.hash);
    };

    vm.setTooltip = function() {
      // Initialize Tooltips
      $('.tooltip.top.in').remove();
      $timeout(function() {
        $('[data-toggle="tooltip"], .enable-tooltip').tooltip({ container: 'body', animation: false });
      }, 100);
    };

    vm.openDialog = function (size, parentSelector, templateUrl, controller, params) {
      var parentElem = parentSelector ?
      angular.element($document[0].querySelector('.modal-group ' + parentSelector)) : undefined;
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: templateUrl,
        controller: controller,
        controllerAs: '$ctrl',
        size: size,
        appendTo: parentElem,
        resolve: {
          params: function() {
            return params;
          }
        }
      });

      modalInstance.result.then(function (message) {
        Notification.success({ message: `<i class="glyphicon glyphicon-ok"></i> ${message}`, title: '<i class="glyphicon glyphicon-ok"></i> Success', delay: 6000 });
        vm.loadData();
      }, function () {

      });
    };

    $scope.$on('$viewContentLoaded', function (event) {
      // code that will be executed ...
      // every time this view is loaded
      vm.init();

    });
  }
}());

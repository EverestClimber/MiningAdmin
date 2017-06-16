(function () {
  'use strict';

  // Users service used for communicating with the users REST endpoint
  angular
    .module('machines.services')
    .factory('MachinesService', MachinesService);

  MachinesService.$inject = ['$resource'];

  function MachinesService($resource) {
    var Machines = $resource('/api/machines', {}, {
      userMachines: {
        method: 'GET',
        url: '/api/machines/:userName',
        isArray: true,
        params: {
          userName: '@userName'
        }
      },
      machine: {
        method: 'GET',
        url: '/api/machines/:userName/:hostName',
        params: {
          userName: '@userName',
          hostName: '@hostName'
        }
      },
      updateMachine: {
        method: 'POST',
        url: '/api/machines/:userName/:hostName',
        params: {
          userName: '@userName',
          hostName: '@hostName'
        }
      }
    });

    angular.extend(Machines, {
      getUserMachines: function (userName) {
        return this.userMachines({ userName: userName }).$promise;
      },
      getMachine: function(userName, hostName) {
        return this.machine({ userName: userName, hostName: hostName }).$promise;
      },
      updateMachine: function(userName, hostName) {
        return this.updateMachine({ userName: userName, hostName: hostName }).$promise;
      }
    });

    return Machines;
  }
}());

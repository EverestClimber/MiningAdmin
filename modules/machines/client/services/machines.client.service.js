(function () {
  'use strict';

  // Machines service used for communicating with the machines REST endpoint
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
      update: {
        method: 'POST',
        url: '/api/machines/:userName/:hostName',
        params: {
          userName: '@userName',
          hostName: '@hostName'
        }
      },
      delete: {
        method: 'DELETE',
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
      updateMachine: function(userName, hostName, info, newHost = undefined, setting = undefined) {
        return this.update({ userName: userName, hostName: hostName }, { info: info, host: newHost, setting: setting }).$promise;
      },
      deleteMachine: function(userName, hostName) {
        return this.delete({ userName: userName, hostName: hostName }).$promise;
      }
    });

    return Machines;
  }
}());

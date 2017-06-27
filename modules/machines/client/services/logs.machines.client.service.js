(function () {
  'use strict';

  // Logs service used for communicating with the logs REST endpoint
  angular
    .module('machines.services')
    .factory('LogsService', LogsService);

  LogsService.$inject = ['$resource'];

  function LogsService($resource) {
    var Logs = $resource('/api/logs', {}, {
      log: {
        method: 'GET',
        url: '/api/logs/:userName/:hostName',
        params: {
          userName: '@userName',
          hostName: '@hostName'
        }
      },
      update: {
        method: 'POST',
        url: '/api/logs/:userName/:hostName',
        params: {
          userName: '@userName',
          hostName: '@hostName'
        }
      },
      delete: {
        method: 'DELETE',
        url: '/api/logs/:userName/:hostName',
        params: {
          userName: '@userName',
          hostName: '@hostName'
        }
      }
    });

    angular.extend(Logs, {
      getLogs: function (userName, hostName) {
        return this.log({ userName: userName, hostName: hostName }).$promise;
      },
      newLogs: function(userName, hostName, log) {
        return this.update({ userName: userName, hostName: hostName }, { log: log }).$promise;
      },
      clearLogs: function(userName, hostName) {
        return this.delete({ userName: userName, hostName: hostName }).$promise;
      }
    });

    return Logs;
  }
}());

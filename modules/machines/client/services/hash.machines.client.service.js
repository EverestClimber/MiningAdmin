(function () {
  'use strict';

  // Logs service used for communicating with the logs REST endpoint
  angular
    .module('machines.services')
    .factory('HashService', HashService);

  HashService.$inject = ['$resource'];

  function HashService($resource) {
    var Logs = $resource('/api/hashes', {}, {
      read: {
        method: 'GET',
        url: '/api/hashes/:userName/:hostName',
        isArray: true,
        params: {
          userName: '@userName',
          hostName: '@hostName'
        }
      },
      add: {
        method: 'POST',
        url: '/api/hashes/:userName/:hostName',
        params: {
          userName: '@userName',
          hostName: '@hostName'
        }
      }
    });

    angular.extend(Logs, {
      readHashes: function (userName, hostName) {
        return this.read({ userName: userName, hostName: hostName }).$promise;
      },
      addHash: function(userName, hostName, hash) {
        return this.add({ userName: userName, hostName: hostName }, { hash: hash }).$promise;
      }
    });

    return Logs;
  }
}());

(function () {
  'use strict';

  // Settings service used for communicating with the settings REST endpoint
  angular
    .module('group.services')
    .factory('GroupsService', GroupsService);

  GroupsService.$inject = ['$resource'];

  function GroupsService($resource) {
    var Groups = $resource('/api/groups', {}, {
      groups: {
        method: 'GET',
        url: '/api/groups/:userName',
        isArray: true,
        params: {
          userName: '@userName'
        }
      },
      del: {
        method: 'DELETE',
        url: '/api/groups/:userName/:groupName',
        params: {
          userName: '@userName',
          groupName: '@groupName'
        }
      },
      create: {
        method: 'POST',
        url: '/api/groups/:userName',
        params: {
          userName: '@userName'
        }
      },
      modify: {
        method: 'POST',
        url: '/api/groups/:userName/:groupName',
        params: {
          userName: '@userName',
          groupName: '@groupName'
        }
      }
    });

    angular.extend(Groups, {
      getGroups: function(userName) {
        return this.groups({ userName: userName }).$promise;
      },
      createGroup: function(userName, info) {
        return this.create({ userName: userName }, { info: info }).$promise;
      },
      deleteGroup: function(userName, groupName) {
        return this.del({ userName: userName, groupName: groupName }).$promise;
      },
      modifyGroup: function(userName, groupName, info) {
        return this.modify({ userName: userName, groupName: groupName }, { info: info }).$promise;
      }
    });

    return Groups;
  }
}());

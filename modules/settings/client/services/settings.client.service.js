(function () {
  'use strict';

  // Settings service used for communicating with the settings REST endpoint
  angular
    .module('settings.services')
    .factory('SettingsService', SettingsService);

  SettingsService.$inject = ['$resource'];

  function SettingsService($resource) {
    var Settings = $resource('/api/settings', {}, {
      machine: {
        method: 'GET',
        url: '/api/settings/:userName',
        params: {
          userName: '@userName'
        }
      },
      updateMachine: {
        method: 'POST',
        url: '/api/settings/:userName',
        params: {
          userName: '@userName'
        }
      }
    });

    angular.extend(Settings, {
      getSetting: function(userName) {
        return this.machine({ userName: userName }).$promise;
      },
      updateSetting: function(userName, info) {
        return this.updateMachine({ userName: userName }, { info: info }).$promise;
      }
    });

    return Settings;
  }
}());

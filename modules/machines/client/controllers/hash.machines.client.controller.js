(function () {
  'use strict';

  angular
    .module('machines')
    .controller('HashController', HashController);

  HashController.$inject = ['Authentication', 'HashService', 'Notification'];

  function LogsController(Authentication, HashService, Notification) {
    var vm = this;

    vm.user = Authentication.user;

    vm.logs = {};

    vm.init = function() {

    };

    vm.init();

  }
}());

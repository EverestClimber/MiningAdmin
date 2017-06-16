(function () {
  'use strict';

  angular
    .module('users')
    .controller('LockController', LockController);

  LockController.$inject = ['$scope', '$state', 'Authentication', 'PasswordValidator', 'Notification'];

  function LockController($scope, $state, Authentication, PasswordValidator, Notification) {
    var vm = this;

    vm.authentication = Authentication;

    // If user is signed in then redirect back home
    if (vm.authentication.user) {
      vm.authentication.user.lock = true;
      console.log('set');
    }

/*    function onUserSignupError(response) {
      Notification.error({ message: response.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Signup Error!', delay: 6000 });
    }

    function onUserSigninSuccess(response) {
      // If successful we assign the response to the global user model
      vm.authentication.user = response;
      Notification.info({ message: 'Welcome ' + response.firstName });
      // And redirect to the previous or home page
      $state.go($state.previous.state.name || 'home', $state.previous.params);
    }

    function onUserSigninError(response) {
      Notification.error({ message: response.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Signin Error!', delay: 6000 });
    } */
  }
}());

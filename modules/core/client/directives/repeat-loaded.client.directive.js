(function () {
  'use strict';

  // Focus the element on page load
  // Unless the user is on a small device, because this could obscure the page with a keyboard

  angular.module('core')
    .directive('repeatLoaded', repeatLoaded);

  repeatLoaded.$inject = ['$timeout'];

  function repeatLoaded($timeout) {
    var directive = {
      restrict: 'A',
      link: link
    };

    return directive;

    function link(scope, element, attrs) {
      if (scope.$last === true) {
        $timeout(function () {
          scope.$emit(attrs.repeatLoaded);
        });
      }
    }
  }
}());

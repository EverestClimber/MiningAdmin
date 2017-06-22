(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', '$timeout', 'Authentication', '$state'];

  function HomeController($scope, $timeout, Authentication, $state) {
    var vm = this;
    vm.user = Authentication.user;

    vm.template = {
      // true                         enable page preloader
      // false                        disable page preloader
      page_preloader: true,
      // 'navbar-default'             for a light header
      // 'navbar-inverse'             for a dark header
      header_navbar: 'navbar-inverse',
      // ''                           empty for a static header/main sidebar
      // 'navbar-fixed-top'           for a top fixed header/sidebars
      // 'navbar-fixed-bottom'        for a bottom fixed header/sidebars
      header: 'navbar-fixed-top',
      // ''                           empty for the default full width layout
      // 'fixed-width'                for a fixed width layout (can only be used with a static header/main sidebar)
      layout: '',
      // 'sidebar-visible-lg-mini'    main sidebar condensed - Mini Navigation (> 991px)
      // 'sidebar-visible-lg-full'    main sidebar full - Full Navigation (> 991px)
      // 'sidebar-alt-visible-lg'     alternative sidebar visible by default (> 991px) (You can add it along with another class - leaving a space between)
      // 'sidebar-light'              for a light main sidebar (You can add it along with another class - leaving a space between)
      sidebar: 'sidebar-visible-lg-full',
      // ''                           Disable cookies (best for setting an active color theme from the next variable)
      // 'enable-cookies'             Enables cookies for remembering active color theme when changed from the sidebar links (the next color theme variable will be ignored)
      cookies: '',

      // Used as the text for the header link - You can set a value in each page if you like to enable it in the header
      header_link: '',
      // The name of the files in the inc/ folder to be included in page_head.php - Can be changed per page if you
      // would like to have a different file included (eg a different alternative sidebar)
      inc_sidebar: 'sidebar',
      inc_sidebar_alt: 'sidebar_alt',
      inc_header: 'header'
    };

    vm.page_classes = '';
    vm.sidebar = [];

    vm.initViewVariable = function() {
      var template = vm.template;
      var page_classes = '';

      if (template.header === 'navbar-fixed-top') {
        page_classes = 'header-fixed-top';
      } else if (template.header === 'navbar-fixed-bottom') {
        page_classes = 'header-fixed-bottom';
      }

      if (template.sidebar) {
        page_classes += ((page_classes === '') ? '' : ' ') + template.sidebar;
      }

      if (template.layout === 'fixed-width' && template.header === '') {
        page_classes += ((page_classes === '') ? '' : ' ') + template.layout;
      }

      if (template.cookies === 'enable-cookies') {
        page_classes += ((page_classes === '') ? '' : ' ') + template.cookies;
      }

      vm.page_classes = page_classes;
    };

    vm.initSideMenu = function() {
      vm.sidebar = [
        {
          name: 'Dashboard',
          state: 'home.machines({ state: "dashboard" })',
          icon: 'gi gi-compass'
        },
        {
          name: 'Toggle Status',
          icon: 'gi gi-stats',
          sub: [
            {
              name: 'Online',
              state: 'home.machines({ state: "online" })'
            },
            {
              name: 'Offline',
              state: 'home.machines({ state: "offline" })'
            },
            {
              name: 'All',
              state: 'home.machines({ state: "all" })'
            }
          ]
        },
        {
          state: 'separator'
        },
        {
          name: 'Global Miner Settings',
          icon: 'fa fa-share-alt',
          sub: [
            {
              name: 'Global Core Clock',
              state: 'home.miner-settings({ state: "core-clock" })'
            },
            {
              name: 'Global Memory Clock',
              state: 'home.miner-settings({ state: "memory-clock" })'
            },
            {
              name: 'Global Fan Speed',
              state: 'home.miner-settings({ state: "fan-speed" })'
            },
            {
              name: 'Global Power Settings',
              state: 'home.miner-settings({ state: "power" })'
            },
            {
              name: 'Mass Reboot',
              state: 'home.miner-settings({ state: "mass-reboot" })'
            }
          ]
        },
        {
          name: 'Global Pool Settings',
          icon: 'gi gi-inbox',
          sub: [
            {
              name: 'Global Wallet',
              state: 'home.pool-settings({ state: "wallet" })'
            },
            {
              name: 'Global Pool',
              state: 'home.pool-settings({ state: "pool" })'
            },
            {
              name: 'Global Miner',
              state: 'home.pool-settings({ state: "miner" })'
            }
          ]
        },
        {
          name: 'Grouping',
          icon: 'gi gi-more_items',
          sub: [
            {
              name: 'Create Groups',
              state: 'creategroups.php'
            },
            {
              name: 'Manage Groups',
              state: 'managegroups.php'
            }
          ]
        },
        {
          name: 'Sgminer Flags',
          icon: 'fa fa-flag',
          sub: [
            {
              name: 'Worksize',
              state: 'home.flag-settings({ state: "worksize" })'
            },
            {
              name: 'Intensity',
              state: 'home.flag-settings({ state: "intensity" })'
            },
            {
              name: 'Threads',
              state: 'home.flag-settings({ state: "threads" })'
            }
          ]
        },
        {
          name: 'Claymore Settings',
          icon: 'fa fa-flag',
          sub: [
            {
              name: 'Claymore Zec Mode',
              state: 'home.claymore-settings({ state: "zec-mode" })'
            },
            {
              name: 'Intensity',
              state: 'home.claymore-settings({ state: "intensity" })'
            }
          ]
        }
      ];
    };

    vm.menuState = function() {
      if ($state.params.state) {
        return `${$state.current.name}({ state: "${$state.params.state}" })`;
      } else {
        return `${$state.current.name}`;
      }
    };

    vm.init = function() {
      vm.initViewVariable();
      vm.initSideMenu();
    };

    vm.init();

    angular.element(document).ready(function () {
      $timeout(App.init, 300);
    });

  }
}());

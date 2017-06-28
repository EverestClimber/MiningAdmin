(function (app) {
  'use strict';

  app.registerModule('machines', ['core', 'ui.bootstrap', 'chart.js']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('machines.services');
  app.registerModule('machines.routes', ['ui.router', 'core.routes', 'machines.services']);
}(ApplicationConfiguration));

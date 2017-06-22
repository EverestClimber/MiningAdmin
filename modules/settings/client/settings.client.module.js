(function (app) {
  'use strict';

  app.registerModule('settings', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('settings.services');
  app.registerModule('settings.routes', ['ui.router', 'core.routes', 'settings.services']);
}(ApplicationConfiguration));

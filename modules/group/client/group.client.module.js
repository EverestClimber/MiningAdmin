(function (app) {
  'use strict';

  app.registerModule('group', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('group.services');
  app.registerModule('group.routes', ['ui.router', 'core.routes', 'group.services']);
}(ApplicationConfiguration));

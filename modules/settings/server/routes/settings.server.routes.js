'use strict';

/**
 * Module dependencies
 */
var settings = require('../controllers/settings.server.controller');

module.exports = function (app) {

  // Settings routes
  app.route('/api/settings/:userName')
    .get(settings.read)
    .post(settings.update);

};

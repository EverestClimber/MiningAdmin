'use strict';

/**
 * Module dependencies
 */
var machines = require('../controllers/machines.server.controller');

module.exports = function (app) {

  // Machines collection routes
  app.route('/api/machines/:userName')
    .get(machines.list);

  app.route('/api/machines/:userName/:hostName')
    .get(machines.read)
    .post(machines.update);

};

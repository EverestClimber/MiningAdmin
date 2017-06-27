'use strict';

/**
 * Module dependencies
 */
var logs = require('../controllers/logs.machines.server.controller');

module.exports = function (app) {

  app.route('/api/logs/:userName/:hostName')
    .get(logs.read)
    .post(logs.update)
    .delete(logs.clear);
};

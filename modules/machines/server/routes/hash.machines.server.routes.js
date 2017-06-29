'use strict';

/**
 * Module dependencies
 */
var hashes = require('../controllers/hash.machines.server.controller');

module.exports = function (app) {

  app.route('/api/hashes/:userName/:hostName')
    .get(hashes.read)
    .post(hashes.create)
    .delete(hashes.clear);
};

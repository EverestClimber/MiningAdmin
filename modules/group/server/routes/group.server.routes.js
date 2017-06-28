'use strict';

/**
 * Module dependencies
 */
var groups = require('../controllers/group.server.controller');

module.exports = function (app) {

  // Settings routes
  app.route('/api/groups/:userName')
    .get(groups.read)
    .post(groups.create);

  app.route('/api/groups/:userName/:groupName')
    .delete(groups.delete)
    .post(groups.update);
};

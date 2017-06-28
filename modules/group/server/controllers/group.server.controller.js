'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Group = mongoose.model('Group'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an article
 */
exports.create = function (req, res) {
  var userName = req.params.userName;
  var info = req.body.info;

  var group = new Group({
    user: userName,
    name: info.groupname,
    updated: Date.now(),
    info: info
  });

  group.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(group);
    }
  });
};

/**
 * Read the Group with userName
 */
exports.read = function (req, res) {
  var userName = req.params.userName;

  Group.find({ user: userName })
    .then(groups => {
      if (!groups) {
        res.status(404).send({
          message: 'No group with that user name has been found.'
        });
      } else {
        res.json(groups);
      }
    })
    .catch(err => {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
};

/**
 * Update a group
 */
exports.update = function (req, res) {
  var userName = req.params.userName;
  var groupName = req.params.groupName;
  var info = req.body.info;

  Group.findOne({ user: userName, name: groupName })
    .then(group => {
      group.updated = Date.now();
      group.info = req.body.info;
      return group.save();
    })
    .then(group => {
      res.json(group.toJSON());
    })
    .catch(err => {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
};

/**
 * Delete an group
 */
exports.delete = function (req, res) {
  var userName = req.params.userName;
  var groupName = req.params.groupName;

  Group.findOne({ user: userName, name: groupName })
    .then(group => {
      return group.remove();
    })
    .then(() => {
      res.json({ message: 'The machine is deleted successfully.' });
    })
    .catch(err => {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
};

'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Machine = mongoose.model('Machine'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an article
 */
exports.create = function (req, res) {
  /* var article = new Article(req.body);
  article.user = req.user;

  article.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  }); */
};

/**
 * Read the machine with userName and hostName
 */
exports.read = function (req, res) {
  var userName = req.params.userName;
  var hostName = req.params.hostName;

  Machine.findOne({ user: userName, host: hostName })
    .then(machine => {
      if (!machine) {
        res.status(404).send({
          message: 'No machine with that host name has been found'
        });
      } else {
        res.json(machine.toJSON());
      }
    })
    .catch(err => {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
};

/**
 * Update an machine
 */
exports.update = function (req, res) {
  var userName = req.params.userName;
  var hostName = req.params.hostName;
  var newHostName = req.body.host;
  var info = req.body.info;
  var setting = req.body.setting;

  if (!newHostName) newHostName = hostName;
  info.hostname = newHostName;

  Machine.findOne({ user: userName, host: hostName })
    .then(machine => {
      if (!machine) {
        var newMachine = new Machine({
          user: userName,
          host: newHostName,
          updated: Date.now(),
          info: info
        });
        return newMachine.save();
      } else {
        machine.host = newHostName;
        if (!setting) machine.updated = Date.now();
        machine.info = req.body.info;
        return machine.save();
      }
    })
    .then(machine => {
      res.json(machine.toJSON());
    })
    .catch(err => {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });

};

/**
 * Delete an Machine
 */
exports.delete = function (req, res) {
  var userName = req.params.userName;
  var hostName = req.params.hostName;

  Machine.findOne({ user: userName, host: hostName })
    .then(machine => {
      return machine.remove();
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

/**
 * List of Machines of User
 */
exports.list = function (req, res) {
  var userName = req.params.userName;

  Machine.find({ user: userName }).sort('host')
    .then(machines => res.json(machines))
    .catch(err => {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
};

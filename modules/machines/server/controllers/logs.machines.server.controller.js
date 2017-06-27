'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Log = mongoose.model('Log'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an Log
 */
exports.update = function (req, res) {
  var userName = req.params.userName;
  var hostName = req.params.hostName;
  var content = req.body.log;

  Log.findOne({ user: userName, host: hostName })
   .then(log => {
     if (!log) {
       var newLog = new Log({
         user: userName,
         host: hostName,
         updated: Date.now(),
         log: content
       });
       return newLog.save();
     } else {
       log.log = content;
       log.updated = Date.now();
       return log.save();
     }
   })
   .then(log => {
     res.json(log.toJSON());
   })
   .catch(err => {
     return res.status(422).send({
       message: errorHandler.getErrorMessage(err)
     });
   });
};

/**
 * Read the Log with userName and hostName
 */
exports.read = function (req, res) {
  var userName = req.params.userName;
  var hostName = req.params.hostName;

  Log.findOne({ user: userName, host: hostName })
    .then(log => {
      if (!log) {
        res.json({});
      } else {
        res.json(log.toJSON());
      }
    })
    .catch(err => {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
};

/**
 * Clear an logs
 */
exports.clear = function (req, res) {
  var userName = req.params.userName;
  var hostName = req.params.hostName;

  Log.remove({ user: userName, host: hostName })
    .then(() => res.json({ message: 'Logs are cleared.' }))
    .catch(err => {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
};

/**
 * List of logs of User
 */
exports.list = function (req, res) {
  var userName = req.params.userName;
  var hostName = req.params.hostName;

  Log.find({ user: userName, host: hostName }).sort({ updated: -1 })
    .then(logs => res.json(logs))
    .catch(err => {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
};

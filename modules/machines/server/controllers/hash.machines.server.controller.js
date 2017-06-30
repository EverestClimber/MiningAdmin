'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Hash = mongoose.model('Hash'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an hash
 */
exports.create = function (req, res) {
  var userName = req.params.userName;
  var hostName = req.params.hostName;
  var hashValue = req.body.hash;

  Hash.findOne({ user: userName, host: hostName }).sort('-updated')
    .then(hash => {
      if (hash) {
        if ((Date.now() - hash.updated) > 1000 * 10) {
          Hash.remove({ user: userName, host: hostName })
            .then(() => {})
            .catch(err => {
              return res.status(422).send({
                message: errorHandler.getErrorMessage(err)
              });
            });
        }
      }

      var newHash = new Hash({
        user: userName,
        host: hostName,
        hash: hashValue,
        updated: Date.now()
      });

      return newHash.save();
    })
    .then(hash => {
      res.json({ message: 'Added.' });
    })
    .catch(err => {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });

};

/**
 * Read the hash with userName and hostName
 */
exports.read = function (req, res) {
  var userName = req.params.userName;
  var hostName = req.params.hostName;

  Hash.find({ user: userName, host: hostName })
    .then(hash => {
      res.json(hash);
    })
    .catch(err => {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
};

/**
 * Clear a hash
 */
exports.clear = function (req, res) {
  var userName = req.params.userName;
  var hostName = req.params.hostName;

  Hash.remove({ user: userName, host: hostName })
    .then(() => res.json({ message: 'Hashes are cleared.' }))
    .catch(err => {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
};

'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Setting = mongoose.model('Setting'),
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
 * Read the Setting with userName
 */
exports.read = function (req, res) {
  var userName = req.params.userName;

  Setting.findOne({ user: userName })
    .then(setting => {
      if (!setting) {
        res.status(404).send({
          message: 'No setting with that user name has been found'
        });
      } else {
        res.json(setting.toJSON());
      }
    })
    .catch(err => {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
};

/**
 * Update an article
 */
exports.update = function (req, res) {
  var userName = req.params.userName;
  var info = req.body.info;

  Setting.findOne({ user: userName })
    .then(setting => {
      if (!setting) {
        var newSetting = new Setting({
          user: userName,
          updated: Date.now(),
          info: info
        });
        return newSetting.save();
      } else {
        setting.updated = Date.now();
        setting.info = req.body.info;
        return setting.save();
      }
    })
    .then(setting => {
      res.json(setting.toJSON());
    })
    .catch(err => {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });

};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
  /* var article = req.article;

  article.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });FF
    } else {
      res.json(article);
    }
  });*/
};

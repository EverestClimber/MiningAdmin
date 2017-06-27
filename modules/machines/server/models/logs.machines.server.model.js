'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var LogSchema = new Schema({
  user: {
    type: String,
    default: ''
  },
  host: {
    type: String,
    default: ''
  },
  log: {
    type: String,
    default: ''
  },
  updated: {
    type: Number,
    default: Date.now
  }
});

mongoose.model('Log', LogSchema);

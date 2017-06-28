'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Hash Schema
 */
var HashSchema = new Schema({
  user: {
    type: String,
    default: ''
  },
  host: {
    type: String,
    default: ''
  },
  hash: {
    type: Number,
    default: 0
  },
  updated: {
    type: Number,
    default: Date.now
  }
});

mongoose.model('Hash', HashSchema);

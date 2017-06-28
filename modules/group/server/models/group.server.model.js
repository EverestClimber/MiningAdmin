'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Group Schema
 */
var GroupSchema = new Schema({
  user: {
    type: String,
    default: ''
  },
  updated: {
    type: Date,
    default: Date.now()
  },
  name: {
    type: String,
    default: '',
    unique: true
  },
  info: {
    groupname: String,
    grouprange: String,
    groupminer: String,
    grouppool: String,
    grouppool2: String,
    groupwallet: String,
    grouppass: String,
    grouppass2: String,
    core: Number,
    mem: Number,
    power: Number,
    fan: Number,
    maxtemp: Number,
    sgintensity: Number,
    sgxmrintensity: Number,
    sgworksize: Number,
    sgxmrworksize: Number,
    sgthreads: Number,
    sgxmrthreads: Number,
    clayintensity: Number,
    clayzecintensity: Number,
    clayzecmode: Number
  }
});

mongoose.model('Group', GroupSchema);

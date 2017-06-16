'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var MachineSchema = new Schema({
  user: {
    type: String,
    default: ''
  },
  host: {
    type: String,
    default: ''
  },
  info: {
    allowed: Number,
    overheat: Number,
    pool_info: String,
    kernel: String,
    uptime: String,
    mac: String,
    hostname: String,
    rack_loc: String,
    ip: String,
    group: String,
    mobo: String,
    lan_chip: String,
    load: String,
    ram: String,
    cpu_temp: String,
    cpu_name: String,
    rofs: Number,
    drive_name: String,
    freespace: Number,
    temp: String,
    version: String,
    miner_secs: Number,
    adl_error: String,
    proxy_problem: String,
    updating: String,
    connected_displays: String,
    resolution: String,
    config_error: String,
    send_remote: String,
    alive: Number,
    driver: String,
    wrong_driver: String,
    gpus: String,
    fanrpm: String,
    fanpercent: String,
    hash: String,
    miner: String,
    miner_hashes: String,
    models: String,
    bioses: String,
    default_core: String,
    default_mem: String,
    core: String,
    mem: String,
    meminfo: String,
    voltage: String,
    overheatedgpu: String,
    throttled: String,
    powertune: String,
    miner_log: String
  }
});

mongoose.model('Machine', MachineSchema);

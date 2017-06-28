'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Setting Schema
 */
var SettingSchema = new Schema({
  user: {
    type: String,
    default: ''
  },
  updated: {
    type: Date,
    default: Date.now()
  },
  info: {
    cpu_wallet: String,
    cpu_pool: String,
    global_cpuminer: Number,
    proxy_wallet: String,
    pool_pass1: String,
    pool_pass2: String,
    proxy_pool1: String,
    proxy_pool2: String,
    global_miner: String,
    global_fan: Number,
    max_gpu_temp: Number,
    mass_reboot: Number,
    stratum_proxy: String,
    global_mem: Number,
    global_core: Number,
    global_power_tune: String,
    custom_panel: String,
    xmr_intensity: Number,
    intensity: Number,
    gpu_threads: Number,
    worksize: Number,
    clay_intensity: Number,
    clay_zec_intensity: Number,
    clay_zec_mode: String,
    xmr_worksize: String,
    fixed_ip: [String],
    net_mask: [String],
    gateway: [String],
    reb: [String],
    dhcp: [String],
    cor: [String],
    mem: [String],
    fan: [String],
    pwr: [String],
    name: [String],
    group: [{
      group: String,
      miner: String,
      proxypool1: String,
      proxypool2: String,
      proxywallet: String,
      poolpass: String,
      poolpass2: String,
      core: Number,
      mem: Number,
      pwr: Number,
      fan: Number,
      maxgputemp: Number,
      intensity: Number,
      xmrintensity: Number,
      worksize: Number,
      xmrworksize: Number,
      gputhreads: Number,
      xmrgputhreads: Number,
      clayintensity: Number,
      clayzecintensity: Number,
      clayzecmode: String
    }]
  }
});

mongoose.model('Setting', SettingSchema);

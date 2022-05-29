const mongoose = require('mongoose');

const DeviceShema = new mongoose.Schema({
  hostname: {
    type: String,
    required: true,
  },
  customer: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  ip_address: {
    type: String,
    required: true,
  },
  cli_username: {
    type: String,
    required: true,
  },
  cli_password: {
    type: String,
    required: true,
  },
  config: {
    type: String,
    required: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  added_by: {
    type: String,
  },
});

module.exports = Device = mongoose.model('device', DeviceShema);

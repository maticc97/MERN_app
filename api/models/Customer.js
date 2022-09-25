const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  contact_email: {
    type: String,
    required: true,
  },
  engineer_email: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  devices_count: {
    type: Number, 
    default:0    
  },
  added_by: {
    type: String,
    required: true,
  },
});

module.exports = Customer = mongoose.model('customer', CustomerSchema);

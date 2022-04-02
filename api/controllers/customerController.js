const req = require('express/lib/request');
const res = require('express/lib/response');
const timestamp = require('../../config/time.js');
const logging = true;

const getCustomers = (req, res) => {
  res.status(200).json;
};

const addNewCustomer = (req, res) => {};

const getCustomerInfo = (req, res) => {};

const getDevices = (req, res) => {};

const addNewDevice = (req, res) => {};

const getDeviceInfo = (req, res) => {};

module.exports = {
  getCustomerInfo,
  addNewCustomer,
  getCustomers,
  getDeviceInfo,
  getDevices,
  addNewDevice,
};

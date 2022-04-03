const res = require('express/lib/response');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const Customer = require('../models/Customer');
const User = require('../models/User');
const Device = require('../models/Device');
const mongoose = require('mongoose');
const req = require('express/lib/request');
const { body } = require('express-validator');

const passport = require('passport');
const { debug } = require('request');
const logging = config.get('debug');

const timestamp = require('../../config/time.js');
const REQUIRED_FIELDS_ERR = 'Please provide all of the required fields -----> ';
const REGEX_EMAIL = new RegExp('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}');

const getCustomers = (req, res) => {
  Customer.find({}, function (err, users) {
    if (err) res.send(500).json({ err: 'Internal server error' });
    return res.status(200).json(users);
  });
};

const addNewCustomer = (req, res) => {
  const { name, contact_email, engineer_email } = req.body;

  if (!name || !contact_email || !engineer_email) {
    return res.status(422).json({
      error: REQUIRED_FIELDS_ERR + 'name, contact email, engineer email',
    });
  } else if (!REGEX_EMAIL.test(contact_email)) {
    return res.status(422).json({
      error: 'Must be in an email format (___@__.__)',
    });
  } else if (!REGEX_EMAIL.test(engineer_email)) {
    return res.status(422).json({
      error: 'Must be in an email format (___@__.__)',
    });
  }

  //find which user is adding company

  Customer
    //check if company is already in database
    .findOne({ name: req.body.name })
    .then(async (existingCopmany) => {
      //if email is not taken, then check for taken username
      if (!existingCopmany) {
        //Find user that wants to add something
        let added_by = await User.findOne({ id: req.user.id });
        //create new entry in company DB
        const customer = new Customer();
        customer.name = name;
        customer.contact_email = contact_email;
        customer.engineer_email = engineer_email;
        customer.added_by = added_by.username;
        customer.save();
        res.status(201).json({ 'Added Customer': customer.name });
      }
      //if email is already taken
      else {
        //console.log(req.body.name);
        if (logging)
          console.log(
            timestamp.get_timestamp(),
            ' Company already exists in DB:',
            name
          );
        return res
          .status(409)
          .json({ existingCopmany: 'this company alredy in DB' });
      }
    })
    .catch((error) => renderApiError(req, res, error));
};

const getCustomerInfo = (req, res) => {
  if (logging)
    console.log(
      timestamp.get_timestamp(),
      'Requested info for customer : ',
      req.params.customerId
    );
  Customer.findOne({ name: req.params.customerId }).then(
    async (customerInfo) => {
      if (customerInfo) res.status(200).json(customerInfo);
      else return res.status(404).send() && console.log('Customer not found');
    }
  );
};

const getDevices = (req, res) => {
  Device.find({}, function (err, devices) {
    if (err) res.send(500).json({ err: 'Internal server error' });
    return res.status(200).json(devices);
  });
};

const addNewDevice = (req, res) => {
  const { hostname, customer, type, ip_address, cli_username, cli_password } =
    req.body;

  Device.findOne({ ip_address: ip_address, customer: customer }).then(
    async (existing_ipaddr) => {
      if (!existing_ipaddr) {
        //find signed in user from token
        let added_by = await User.findOne({ id: req.user.id });
        const device = await new Device();
        device.hostname = hostname;
        device.customer = customer;
        device.type = type;
        device.ip_address = ip_address;
        device.cli_username = cli_username;
        device.cli_password = cli_password;
        device.added_by = added_by.username;
        device.save();
        return res.status(201).json({ Added_device: hostname });
      } else return res.status(422).json({ msg: 'Device already in DB ' });
    }
  );
};

const getDeviceInfo = (req, res) => {
  if (logging)
    console.log(
      timestamp.get_timestamp(),
      ' Requested info for device : ',
      req.params.deviceId
    );
  Device.findOne({ hostname: req.params.deviceId }).then(async (deviceInfo) => {
    if (deviceInfo) res.status(200).json(deviceInfo);
    else return res.status(404).send();
  });
};

const deleteDevice = (req, res) => {
  console.log(req.params.deviceId);

  Device.findOneAndDelete(
    {
      hostname: req.params.deviceId,
      cusotmer: req.params.customerId,
    },
    function (err) {
      if (err) {
        return res.status(500).send();
      }
      if (logging) {
        console.log(
          timestamp.get_timestamp(),
          'Deleted device : ',
          req.params.deviceId
        );
      }
      return res.status(204).send();
    }
  );
};

module.exports = {
  getCustomerInfo,
  addNewCustomer,
  getCustomers,
  getDeviceInfo,
  getDevices,
  addNewDevice,
  deleteDevice,
};

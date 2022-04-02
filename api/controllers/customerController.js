const res = require('express/lib/response');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const Customer = require('../../models/Customer');
const User = require('../../models/User');
const mongoose = require('mongoose');
const req = require('express/lib/request');
const { body } = require('express-validator');

const passport = require('passport');
const { debug } = require('request');
const logging = true;

const timestamp = require('../../config/time.js');
const REQUIRED_FIELDS_ERR = 'Please provide all of the required fields -----> ';
const REGEX_EMAIL = new RegExp('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}');

const getCustomers = (req, res) => {
  res.status(200).json({ msg: 'get Customers', request: req.customerId });
};

const addNewCustomer = (req, res) => {
  console.log(req.user);
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
        if (logging) console.log('Company dupicated');
        return res
          .status(409)
          .json({ existingCopmany: 'this company alredy in DB' });
      }
    })
    .catch((error) => renderApiError(req, res, error));
};

const getCustomerInfo = (req, res) => {
  console.log(req.user.id);
  res
    .status(200)
    .json({ msg: 'get Customers info', request: req.params.customerId });
};

const getDevices = (req, res) => {
  res.status(200).json({ msg: 'get Customers' });
};

const addNewDevice = (req, res) => {
  res.status(200).json({ msg: 'get Customers' });
};

const getDeviceInfo = (req, res) => {
  res.status(200).json({ msg: 'get Customers' });
};

module.exports = {
  getCustomerInfo,
  addNewCustomer,
  getCustomers,
  getDeviceInfo,
  getDevices,
  addNewDevice,
};

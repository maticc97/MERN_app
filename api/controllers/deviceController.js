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




const getDeviceInfo = (req, res) => {
    if (logging)
        console.log(
            timestamp.get_timestamp(),
            ' Requested info for device : ',
            req.params
        );
    Device.findOne({ _id: req.params.deviceId }).then(async (deviceInfo) => {
        if (deviceInfo) res.status(200).json(deviceInfo);
        else return res.status(404).send();
    });
};

const decDevices = (id) => { 
    console.log(
        Customer.findOneAndUpdate({ name: id }, { devices_count: 1000 }), function (error, result) {
        console.log(result)    
    })
}

const deleteDevice = (req, res) => {

    console.log("Izbrisi napraco")
    
     Device.findByIdAndDelete(
        req.params.deviceId,
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
            decDevices(req.params.customerId)
            return res.status(204).send();
        }
    );
};



const editDevice = (req, res) => {
    Device.findOneAndUpdate(
        {
            _id: req.params.deviceId,
        },
        {
            hostname: req.body.hostname,
            ip_address: req.body.ip_address,
            cli_username: req.body.cli_username,
            cli_password: req.body.cli_password
        },
        { upsert: true },
        function (err) {
            if (err) {
                return res.status(500).send();
            }
            if (logging) {
                console.log(
                    timestamp.get_timestamp(),
                    'Edited device : ',
                    req.params.deviceId
                );
            }
            return res.status(204).send();
        }
    );
};


const dummyConfig = (req, res) => {
    return res.status(201).send({config: "config test"})
}

module.exports = {
    editDevice,
    deleteDevice,
    getDeviceInfo
};
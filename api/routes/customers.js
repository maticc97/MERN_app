const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController.js');
const auth = require('../middleware/auth');

// @route   GET api/auth
// @desc    Test route
// @access  Public

//customers
router.get('/', customerController.getCustomers);
router.post('/', auth, customerController.addNewCustomer);
router.get('/:customerId/', customerController.getCustomerInfo);
router.delete('/:customerId/', auth, customerController.deleteCustomer);
router.put('/:customerId/', auth, customerController.editCustomer);

//customer -> devices
router.get('/:customerId/devices/', customerController.getDevices);
router.post('/:customerId/devices/', auth, customerController.addNewDevice);
router.get(
  '/:customerId/devices/:deviceId/',
  auth,
  customerController.getDeviceInfo
);
router.put('/:customerId/devices/', auth, customerController.editDevice);

module.exports = router;

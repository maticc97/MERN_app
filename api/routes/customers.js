const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController.js');
const auth = require('../middleware/auth');

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, customerController.getCustomers);
router.post('/', auth, customerController.addNewCustomer);

router.get('/:customerId/', auth, customerController.getCustomerInfo);
router.get('/:customerId/devices/', auth, customerController.getDevices);
router.post('/:customerId/devices/', auth, customerController.addNewDevice);
router.get(
  '/:customerId/devices/:deviceId/',
  auth,
  customerController.getDeviceInfo
);

router.delete(
  '/:customerId/devices/:deviceId/',
  auth,
  customerController.deleteDevice
);

module.exports = router;

const express = require('express');
const router = express.Router();

const devicesController = require('../controllers/devicesController.js');
const auth = require('../../middleware/auth');

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, devicesController.devices);
router.post('/', auth, devicesController.devices);

router.get('/:customerId/', auth, devicesController.getDeviceInfo);
router.get('/:customerId/devices/', auth, devicesController.devices);
router.post('/:customerId/devices/', auth, devicesController.devices);
router.get(
  '/:customerId/devices/:deviceId/',
  auth,
  customerController.getDeviceInfo
);

module.exports = router;

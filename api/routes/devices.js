const express = require('express');
const router = express.Router();

const deviceController = require('../controllers/deviceController.js');
const auth = require('../middleware/auth');

// @route   GET api/auth
// @desc    Test route
// @access  Public

router.get('/:deviceId/', deviceController.getDeviceInfo);
router.put('/:deviceId/', deviceController.editDevice);
router.delete('/:customerId/devices/', deviceController.deleteDevice);

module.exports = router;

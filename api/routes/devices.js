const express = require('express');
const router = express.Router();

const deviceController = require('../controllers/deviceController.js');
const auth = require('../middleware/auth');

// @route   GET api/auth
// @desc    Test route
// @access  Public


console.log("aaa");
router.get('/:deviceId/', auth,  deviceController.getDeviceInfo);
router.put('/:deviceId/', auth,  deviceController.editDevice);
router.delete('/:deviceId', auth, deviceController.deleteDevice);

module.exports = router;

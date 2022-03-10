const express = require('express');
const router = express.Router();

const authenticationController = require('../controllers/authenticationController');

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.post('/register/', authenticationController.addUser);
router.post('/login/', authenticationController.verifyUser);

module.exports = router;

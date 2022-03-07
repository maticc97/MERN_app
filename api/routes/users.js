const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User');
const auth_controller = require('../controlers/users');

// @route   POST api/users
// @desc    Test route
// @access  Public
router.post('/', auth_controller.addUser);

module.exports = router;

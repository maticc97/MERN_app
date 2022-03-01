const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

// @route   POST api/users
// @desc    Test route
// @access  Public
router.post(
  '/',
  [
    check('name', 'name is requires').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({
      min: 6,
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    //return res.status(200).json({ ok: 'ok' });
    if (!errors.isEmpty()) {
      //bad request if body is not OK
      return res.status(400).json({
        errors: errors.array(),
      });
    }
  }
);

module.exports = router;

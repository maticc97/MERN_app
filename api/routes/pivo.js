const express = require('express');
const router = express.Router();

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('All beers'));
router.get('/:pivaId/', (req, res) => res.send('Get Specific Beer'));
router.put('/:pivaId/', (req, res) => res.send('Edit beer'));
router.delete('/:pivaId/', (req, res) => res.send('Delete beer'));

module.exports = router;

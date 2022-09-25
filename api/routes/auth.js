const express = require('express');
const router = express.Router();

const authenticationController = require('../controllers/authenticationController');
const auth = require('../middleware/auth');

router.post('/register/', authenticationController.addUser);
router.post('/login/', authenticationController.verifyUser);
router.get('/username/', auth, authenticationController.getUsername)

module.exports = router;

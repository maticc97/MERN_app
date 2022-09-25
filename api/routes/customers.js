const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController.js');
const deviceController = require('../controllers/deviceController.js')
const auth = require('../middleware/auth');

//customers
router.get('/', auth, customerController.getCustomers); //add auth for later use. 
router.post('/', auth, customerController.addNewCustomer); //add auth for later use.
router.get('/:customerId/', auth, customerController.getCustomerInfo);
router.delete('/:customerId/', auth, customerController.deleteCustomer);
router.put('/:customerId/', auth, customerController.editCustomer);

//customer -> devices
router.get('/:customerId/devices/', auth, customerController.getDevices); //add auth for later use.
router.post('/:customerId/devices/', auth,  customerController.addNewDevice);

module.exports = router;

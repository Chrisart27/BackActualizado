const express = require('express');
const registerController = require('../controllers/register-controller');
const validatorRegister = require('../middleware/registerCliente-validator');

const router = express.Router();

 router.post('/', validatorRegister.validatorParams, validatorRegister.validator, registerController.register)

 

module.exports = router;
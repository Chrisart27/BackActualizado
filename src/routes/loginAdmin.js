const express = require('express');
const LoginControllerAdmin = require('../controllers/login-controllerAdmin');
const router = express.Router();

router.post('/', LoginControllerAdmin.loginAdmin);

module.exports = router;



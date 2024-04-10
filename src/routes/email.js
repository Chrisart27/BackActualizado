const express = require('express');
const router = express.Router();
const enviarEmail = require('../controllers/enviarCorreo');

router.post('/', enviarEmail.sendEmail);    
module.exports = router;
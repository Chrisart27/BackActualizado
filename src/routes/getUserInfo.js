// routes/register-route.js

const express = require('express');
const { njwtAuth } = require('../middleware/auth-token');
const getInfoController = require('../controllers/getInfo-controller');
const router = express.Router();

// Ruta protegida que requiere autenticación
// router.get('/', njwtAuth, getInfoController.verPerfilUsuario);
router.get('/', getInfoController.verPerfilUsuario);

module.exports = router;

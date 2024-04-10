const express = require('express');
const router = express.Router();
const getGruaPendiente = require('../controllers/obtenerGruasPendientes');
const { njwtAuth } = require('../middleware/validate-admin');

// Ruta para consultar una grúa por su ID
// router.get('/', njwtAuth, getGruaPendiente.obtenerGruasPendientes);
router.get('/', getGruaPendiente.obtenerGruasPendientes);

module.exports = router;
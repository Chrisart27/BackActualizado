const express = require('express');
const router = express.Router();
const cambiarEstadoGrua = require('../controllers/modifcarEstadoGrua');
const { njwtAuth } = require('../middleware/validate-admin');

// Ruta para consultar una grúa por su ID
// router.post('/:id', njwtAuth, cambiarEstadoGrua.cambiarEstadoGruaController);
router.post('/:id', cambiarEstadoGrua.cambiarEstadoGruaController);

module.exports = router;
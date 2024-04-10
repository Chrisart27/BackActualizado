const express = require('express');
const router = express.Router();
const gruaController = require('../controllers/grua-controller');
const { validatorParams, validator } = require('../middleware/consultarGruasClient-validator');
const {njwtAuth} = require('../middleware/validate-client');


// Ruta para consultar una grúa por su ID
// router.get('/:id', njwtAuth , validator, validatorParams, gruaController.consultarGruasPorClientId);
router.get('/:id', validator, validatorParams, gruaController.consultarGruasPorClientId);

module.exports = router;
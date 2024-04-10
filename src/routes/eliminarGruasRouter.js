const express = require('express');
const router = express.Router();
const gruaController = require('../controllers/grua-controller');
const { validatorParamsEliminar, validatorEliminar } = require('../middleware/eliminarGrua-validator');
const {njwtAuth} = require('../middleware/validate-client');


// Ruta para eliminar grúa
// router.delete('/:id', njwtAuth ,validatorParamsEliminar, validatorEliminar, gruaController.eliminarGrua);
router.delete('/:id', validatorParamsEliminar, validatorEliminar, gruaController.eliminarGrua);

module.exports = router;
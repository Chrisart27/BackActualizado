const express = require('express');
const router = express.Router();
const gruaController = require('../controllers/grua-controller');
const { validatorParamsEditar, validatorEditar } = require('../middleware/editarGrua-validator');
const {njwtAuth} = require('../middleware/validate-client');


// Ruta para editar grúa
// router.put('/:id', njwtAuth ,validatorParamsEditar, validatorEditar, gruaController.editarGrua);
router.put('/:id', validatorParamsEditar, validatorEditar, gruaController.editarGrua);

module.exports = router;
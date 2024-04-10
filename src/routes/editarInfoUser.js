const express = require('express');
const router = express.Router();
const editarUserController = require('../controllers/editarInfoUse-controller');
const validatorRegister = require('../middleware/registerCliente-validator');
const {njwtAuth} = require('../middleware/validate-client');


// Ruta para editar grúa
// router.put('/:id', njwtAuth, validatorRegister.validator, validatorRegister.validatorParams, editarUserController.editarUsuario);
router.put('/:id', validatorRegister.validator, validatorRegister.validatorParams, editarUserController.editarUsuario);

module.exports = router;
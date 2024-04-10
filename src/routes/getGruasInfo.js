// gruasRutes.js
const express = require('express');
const router = express.Router();
const obtenerGruasController = require('../controllers/obtenerGruasController');

router.get('/',obtenerGruasController.obtenerGruasDesdeBD);
// Otras rutas relacionadas con grúas si es necesario

module.exports = router;

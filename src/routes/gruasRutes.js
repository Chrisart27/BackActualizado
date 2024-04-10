const express = require('express');
const router = express.Router();
const gruaController = require('../controllers/grua-controller');
const {njwtAuth} = require('../middleware/validate-client');

// router.post('/', njwtAuth, gruaController.addGrua);
router.post('/', gruaController.addGrua);

module.exports = router;
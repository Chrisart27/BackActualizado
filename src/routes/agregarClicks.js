const express = require("express");
const router = express.Router();
const agregarClicksController = require("../controllers/agregarClicks");

router.post("/", agregarClicksController.agregarClicks);

module.exports = router;

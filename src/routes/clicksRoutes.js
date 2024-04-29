const express = require("express");
const router = express.Router();
const clicksController = require("../controllers/clicksController");

router.post("/agregarClick", clicksController.agregarClicks);
router.get("/validarClicks", clicksController.validarClicks);

module.exports = router;

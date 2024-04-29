const { userData } = require("../data/datas");

function agregarClicks(req, res) {
  const idCliente = req.body.idCliente;
  const idGrua = req.body.idGrua;

  userData.agregarClicks(idCliente, idGrua, (err, success) => {
    if (err) {
      return res.status(500).json({
        message: "Error al cambiar el estado de la grúa",
        error: err.message,
      });
    }
    if (!success) {
      return res
        .status(400)
        .json({ message: "No se pudo cambiar el estado de la grúa" });
    }
    return res
      .status(200)
      .json({ message: "Estado de la grúa cambiado exitosamente" });
  });
}

function validarClicks(req, res) {
  const idCliente = req.params.idCliente;

  userData.validarClicks(idCliente, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error al validar los clicks",
        error: err.message,
      });
    }
    if (!result) {
      return res.status(400).json({ message: "No se pudo validar los clicks" });
    }
    return res.status(200).json({ status: result });
  });
}

module.exports = {
  agregarClicks,
  validarClicks,
};

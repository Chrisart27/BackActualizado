const { userData } = require("../data/datas");
const path = require("path");
const fs = require("fs");

const addGrua = async (req, res) => {
  try {
    const gruaInfo = req.body;
    userData.addGrua(gruaInfo, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Error al agregar la grúa" });
      } else {
        res.status(201).json({ result: "Grua agregada exitosamente" });
      }
    });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const editarGrua = async (req, res) => {
  try {
    console.log("Recibida solicitud para editar grúa");

    const idGrua = req.params.id; // Obtiene el ID de la grúa de los parámetros de la solicitud
    console.log(idGrua);
    const nuevosDetalles = req.body; // Obtiene los nuevos detalles de la grúa de los datos enviados en la solicitud

    // Llama a la función para editar la grúa en la base de datos
    userData.editarGrua(idGrua, nuevosDetalles, (err, result) => {
      if (err) {
        console.error("Error al editar la grúa:", err.message);
        res.status(500).json({ error: "Error al editar la grúa" });
      } else {
        console.log("Grúa editada exitosamente");
        res.status(200).json({ message: "Grúa editada exitosamente" });
      }
    });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const eliminarGrua = async (req, res) => {
  try {
    console.log("Recibida solicitud para eliminar grúa");

    const idGrua = req.params.id; // Obtiene el ID de la grúa de los parámetros de la solicitud

    // Llama a la función para eliminar la grúa de la base de datos
    userData.eliminarGrua(idGrua, (err, result) => {
      if (err) {
        console.error("Error al eliminar la grúa:", err.message);
        res.status(500).json({ error: "Error al eliminar la grúa" });
      } else {
        console.log("Grúa eliminada exitosamente");
        res.status(200).json({ message: "Grúa eliminada exitosamente" });
      }
    });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const consultarGruasPorClientId = async (req, res) => {
  try {
    const idCliente = req.params.id;

    userData.consultarGruasPorIdCliente(idCliente, (err, result) => {
      if (err) {
        console.error(
          "Error al consultar las grúas por ID de cliente:",
          err.message
        );
        res
          .status(500)
          .json({ error: "Error al consultar las grúas por ID de cliente" });
      } else {
        console.log("Grúas consultadas exitosamente");
        res.status(200).json(result);
      }
    });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  addGrua,
  editarGrua,
  eliminarGrua,
  consultarGruasPorClientId,
};

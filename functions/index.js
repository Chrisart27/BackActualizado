// Otras importaciones...

// Configura la conexión a MySQL
const { userData } = require('./datas'); // Ajusta la ruta según la ubicación real de tu archivo datas.js

// Resto del código...

exports.addGrua = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const gruaInfo = req.body;
      const clienteId = gruaInfo.clienteId;

      // Subir la imagen a Firebase Storage
      const fileName = `gruas/${clienteId}/${Date.now()}_${gruaInfo.foto.originalname}`;
      const file = storage.file(fileName);

      await file.save(gruaInfo.foto.buffer, {
        metadata: {
          contentType: gruaInfo.foto.mimetype,
        },
      });

      // Obtener la URL de la imagen
      const imageUrl = await file.getSignedUrl({
        action: "read",
        expires: "01-01-2100",
      });

      // Almacenar la URL en la base de datos MySQL (utiliza tu conexión ya existente)
      userData.addGrua({
        marca: gruaInfo.marca,
        modelo: gruaInfo.modelo,
        capacidad: gruaInfo.capacidad,
        foto_path: imageUrl[0],
      }, clienteId, (error, success, newGruaId) => {
        if (error) {
          console.error("Error al agregar la grúa en MySQL:", error.message);
          res.status(500).json({ error: "Error al agregar la grúa" });
        } else {
          console.log("Grúa agregada exitosamente en MySQL. ID:", newGruaId);
          res.status(200).json({ message: "Grúa agregada exitosamente" });
        }
      });

    } catch (error) {
      console.error("Error al agregar la grúa:", error.message);
      res.status(500).json({ error: "Error al agregar la grúa" });
    }
  });
});

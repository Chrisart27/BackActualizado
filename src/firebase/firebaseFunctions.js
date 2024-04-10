const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const storage = admin.storage().bucket();

exports.addGrua = functions.https.onRequest(async (req, res) => {
  try {
    const gruaInfo = req.body;
    const clienteId = gruaInfo.clienteId;

    // Subir la imagen a Firebase Storage
    const file = storage.file(`gruas/${clienteId}/${Date.now()}_${gruaInfo.foto.originalname}`);
    await file.save(gruaInfo.foto.buffer, {
      metadata: {
        contentType: gruaInfo.foto.mimetype,
      },
    });

    // Obtener la URL de la imagen
    const imageUrl = await file.getSignedUrl({ action: 'read', expires: '01-01-2100' });

    // Almacenar la URL en la base de datos
    await admin.firestore().collection('Gruas').add({
      marca: gruaInfo.marca,
      modelo: gruaInfo.modelo,
      capacidad: gruaInfo.capacidad,
      foto_path: imageUrl[0],
      cliente_id: clienteId,
    });

    res.status(200).json({ message: 'Grúa agregada exitosamente' });
  } catch (error) {
    console.error('Error al agregar la grúa:', error.message);
    res.status(500).json({ error: 'Error al agregar la grúa' });
  }
});

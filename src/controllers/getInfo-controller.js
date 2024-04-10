const jwt = require('jsonwebtoken');  
const { userData } = require('../data/datas');
const config = require('../config/keys');

const handleResponse = (res, message) => {
    return (error, data) => {
        if (error) {
            res.status(500).json({ message: "Error interno del servidor" });
        } else if (!data) {
            res.status(404).json({ message });
        } else {
            res.status(200).json(data);
        }
    };
};

// const verPerfilUsuario = (req, res) => {
//     console.log('Solicitud recibida en /getUserInfo');
//     // Extrae el token de autorización del encabezado de la solicitud
//     const token = req.headers['Authorization'];

//     if (!token) {
//         return res.status(401).json({ error: 'Token de autorización no proporcionado' });
//     }

//     // Verifica y decodifica el token
//     jwt.verify(token, config.SIGNING_KEY_TOKEN, (err, user) => {
//         if (err) {
//             return res.status(403).json({ error: 'Error al verificar el token' });
//         }

//         const userId = user.id;  // Así es como obtendrías la información del usuario desde el token

//         userData.obtenerInformacionUsuario(userId, handleResponse(res, "Usuario no encontrado"), (error, usuario) => {
//             if (usuario) {
//                 const { id, user, email, phone } = usuario;
//                 res.status(200).json({
//                     message: "Información de perfil obtenida con éxito",
//                     usuario: { id, user, email, phone },
//                 });
//             }
//         });
//     });
// };

const verPerfilUsuario = (req, res) => {

    const idCliente = req.query.idCliente;
  
    userData.obtenerInformacionUsuario(idCliente, handleResponse(res, "Usuario no encontrado"), (error, cliente) => {
      if (cliente) {

        const { idCliente, nombre, email, telefono } = cliente;
        res.status(200).json({
          message: "Información de perfil obtenida con éxito",
          usuario: { idCliente, nombre, email, telefono },
        });
      }
    });
  };

module.exports = {verPerfilUsuario};
const generatorToken = require('../helpers/generator-token');
const { userData } = require('../data/datas');

function login(req, res) {
    const data = req.body;
    userData.login(data, (error, user) => {
        if (error) {
            console.error('Error al autenticar el usuario: ' + error.message);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        const { idCliente, email, idRol, nombre, telefono } = user;
        const token = generatorToken({ idCliente, email, idRol, nombre, telefono });
        res.status(200).json({ message: "Autenticación exitosa", token });

    });

}

module.exports = {
    login
}
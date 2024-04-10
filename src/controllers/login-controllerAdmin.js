const generatorToken = require('../helpers/generator-token');
const { userData } = require('../data/datas');

function loginAdmin(req, res) {
    const data = req.body;
    userData.loginAdmin(data, (error, user) => {
        if (error) {
            console.error('Error al autenticar el usuario: ' + error.message);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        const { nombre, email, idRol } = user;
        const token = generatorToken({ nombre, email, idRol });
        res.status(200).json({ message: "Autenticación exitosa", token });

    });

}

module.exports = {
    loginAdmin
}
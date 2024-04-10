const { userData } = require('../data/datas');

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

const editarUsuario = (req, res) => {
    const userId = req.params.id; // ID del usuario a editar
    const nuevosDetallesUsuario = req.body; // Nuevos detalles del usuario

    // Llamada al método para editar la información del usuario
    userData.editarInformacionUsuario(userId, nuevosDetallesUsuario, (err, success) => {
        if (err) {
            console.error('Error al editar la información del usuario:', err);
            return res.status(500).json({ message: "Error interno del servidor" });
        }

        // Si el usuario se editó exitosamente, devuelve un mensaje de éxito
        res.status(200).json({ message: "Información del usuario editada exitosamente" });
    });
};

module.exports = { editarUsuario };
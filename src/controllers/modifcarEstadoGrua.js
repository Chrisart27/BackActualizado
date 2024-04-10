const { userData } = require('../data/datas');

function cambiarEstadoGruaController(req, res) {
    const idGrua = req.params.id; 
    const nuevoEstado = req.body.estadoGrua; 
    console.log(nuevoEstado);

    userData.cambiarEstadoGrua(idGrua, nuevoEstado, (err, success) => {
        if (err) {
            return res.status(500).json({ message: 'Error al cambiar el estado de la grúa', error: err.message });
        }
        if (!success) {
            return res.status(400).json({ message: 'No se pudo cambiar el estado de la grúa' });
        }
        return res.status(200).json({ message: 'Estado de la grúa cambiado exitosamente' });
    });
}

module.exports = {
    cambiarEstadoGruaController
};

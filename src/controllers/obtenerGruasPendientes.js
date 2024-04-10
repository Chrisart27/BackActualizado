const { userData } = require('../data/datas');

const obtenerGruasPendientes = (req, res) => {
  userData.obtenerGruasPendientes((err, result) => {
    if (err) {
      console.error('Error al obtener grúas desde la base de datos:', err.message);
      res.status(500).json({ error: 'Error al obtener grúas' });
    } else {
      res.status(200).json(result);
    }
  });
};

module.exports = { obtenerGruasPendientes };

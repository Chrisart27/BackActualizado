const bcrypt = require('bcryptjs');
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

const register = (req, res) => {
    
    userData.addClient(req.body, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error interno del servidor" });
        }

        const nuevoClienteId = result && result.insertId;

        res.locals.nuevoClienteId = nuevoClienteId;

        res.status(200).json({ message: "Usuario registrado exitosamente", nuevoClienteId });
    });
};

module.exports = { register };

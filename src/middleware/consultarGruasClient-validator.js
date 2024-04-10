const { check, validationResult } = require('express-validator');

let validatorParams = [
    check('idCliente').isInt().withMessage('El ID del cliente debe ser un número entero válido'),
];

function validator(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error('Errores de validación:', errors.array());
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}

module.exports = {
    validatorParams,
    validator
};
const { check, validationResult } = require('express-validator');

let validatorParamsEliminar = [
    check('id').isNumeric().withMessage('El ID de la grúa debe ser un número entero'),
];

function validatorEliminar(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error('Errores de validación para eliminar grúa:', errors.array());
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}

module.exports = {
    validatorParamsEliminar,
    validatorEliminar
};
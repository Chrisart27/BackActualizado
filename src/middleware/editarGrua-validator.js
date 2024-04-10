const { check, validationResult } = require('express-validator');

let validatorParamsEditar = [
    check('marca').optional().isLength({ min: 1 }),
    check('modelo').optional().isLength({ min: 1 }),
    check('capacidad').optional().isLength({ min: 1 }),
    check('whatsapp').optional().isLength({ min: 1 })
];

function validatorEditar(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error('Errores de validación para editar grúa:', errors.array());
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}

module.exports = {
    validatorParamsEditar,
    validatorEditar,
};
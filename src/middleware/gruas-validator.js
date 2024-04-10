const { check, validationResult } = require('express-validator');

let validatorParams = [
    check('marca').isLength({ min: 1 }),
    check('modelo').isLength({ min: 1 }),
    check('capacidad').isLength({ min: 1 })
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

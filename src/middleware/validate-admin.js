const nJwt = require('njwt');
const config = require('../config/keys');

let njwtAuth = (req, res, next) => {
  if (!req.header('Authorization')) {
    return res.status(403).send({ auth: false, message: 'No token provided' });
  }

  let token = req.header('Authorization').split(' ')[1];

  nJwt.verify(token, config.SIGNING_KEY_TOKEN, function(err, verifiedJwt) {
    if (err) {
      return res.status(400).send({ auth: false, message: err });
    } else {
      const idRol = verifiedJwt.body.idRol;
      if (idRol !== 1) {
        return res.status(403).send({ auth: false, message: 'No tienes permisos de administrador' });
      } else {
        next();
      }
    }
  });
};

module.exports = {
  njwtAuth
};
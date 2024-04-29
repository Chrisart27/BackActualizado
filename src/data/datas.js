const mysql = require("mysql2");
const path = require("path");
const fs = require("fs");

const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin123456789",
  database: "GruappDta",
});

class userData {
  static validarClicks(idCliente, callback) {
    const query = `
      SELECT 
          CASE 
              WHEN EXISTS (
                  SELECT 1 
                  FROM plan_cliente 
                  INNER JOIN plan ON plan_cliente.idPlan = plan.id
                  WHERE plan_cliente.idCliente = ?
                  AND EXISTS (
                      SELECT 1 
                      FROM pago 
                      WHERE pago.idPlanCliente = plan_cliente.id
                      AND pago.fecha >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
                  )
                  AND (
                      SELECT COUNT(*) 
                      FROM click 
                      WHERE click.idCliente = ? 
                      AND click.fecha >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
                  ) < plan.clicks
              ) THEN TRUE
              WHEN (
                  SELECT COUNT(*) 
                  FROM click 
                  WHERE click.idCliente = ? 
                  AND click.fecha >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
              ) < (
                  SELECT gratis 
                  FROM click_admin 
                  ORDER BY version DESC 
                  LIMIT 1
              ) THEN TRUE
              ELSE FALSE
          END AS result
  `;
    database.query(query, [idCliente, idCliente, idCliente], (err, result) => {
      if (err) {
        console.error("Error al validar los clicks: " + err.message);
        callback(err, false);
      } else {
        console.log("Clicks validados exitosamente.");
        callback(null, result[0].result);
      }
    });
  }

  static agregarClicks(idCliente, idGrua, callback) {
    const query = "INSERT INTO click (idCliente, idGrua) VALUES (?, ?)";
    const values = [idCliente, idGrua];
    database.query(query, values, (err, result) => {
      if (err) {
        console.error("Error al agregar los clicks: " + err.message);
        callback(err, false);
      } else {
        console.log("Clicks agregados exitosamente.");
        callback(null, true);
      }
    });
  }

  static addClient(cliente, callback) {
    const query =
      "INSERT INTO cliente (nombre, email, contrasenia, telefono, idRol) VALUES (?, ?, ?, ?, ?)";
    database.query(
      query,
      [cliente.nombre, cliente.email, cliente.contrasenia, cliente.telefono, 2],
      (err, result) => {
        if (err) {
          console.error("Error al registrar el cliente: " + err.message);
          callback(err, false);
        } else {
          const nuevoClienteId = result && result.insertId;
          console.log("Cliente registrado exitosamente. ID: " + nuevoClienteId);
          callback(null, true, nuevoClienteId);
        }
      }
    );
  }

  static editarInformacionUsuario(idCliente, nuevosDetalles, callback) {
    const query =
      "UPDATE cliente SET nombre = ?, email = ?, telefono = ? WHERE idCliente = ?";
    const values = [
      nuevosDetalles.nombre,
      nuevosDetalles.email,
      nuevosDetalles.telefono,
      idCliente,
    ];

    database.query(query, values, (err, result) => {
      if (err) {
        console.error(
          "Error al editar la información del usuario:",
          err.message
        );
        callback(err, false);
      } else {
        console.log("Información del usuario editada exitosamente.");
        callback(null, true);
      }
    });
  }

  static addGrua(grua, callback) {
    console.log(grua);
    const query =
      "INSERT INTO grua (marca, modelo, capacidad, whatsapp, ubicacion, foto, estadoGrua, idCliente, idAdmin, latitud, longitud) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      grua.marca,
      grua.modelo,
      grua.capacidad,
      grua.whatsapp,
      grua.ubicacion,
      grua.foto,
      false,
      grua.idCliente,
      1,
      grua.latitud,
      grua.longitud,
    ];

    database.query(query, values, (err, result) => {
      if (err) {
        console.error("Error al agregar la grúa 2: " + err.message);
        return callback(err, false); // Enviar false en caso de error
      } else {
        const nuevaGruaId = result && result.insertId;
        console.log("Grúa agregada exitosamente. ID: " + nuevaGruaId);
        return callback(null, true, nuevaGruaId); // Enviar true y la nuevaGruaId en caso de éxito
      }
    });
  }

  static obtenerInformacionUsuario(idCliente, callback) {
    const query = "SELECT * FROM cliente WHERE idCliente = ?";
    database.query(query, [idCliente], (err, result) => {
      if (err) {
        console.error(
          "Error al obtener la información del usuario: " + err.message
        );
        callback(err, null);
      } else if (result.length === 0) {
        callback(null, null);
      } else {
        const usuario = result[0];
        callback(null, usuario);
      }
    });
  }

  static login(user, callback) {
    const query = "SELECT * FROM cliente WHERE email = ? AND contrasenia = ?";
    database.query(query, [user.email, user.contrasenia], (err, result) => {
      if (err) {
        console.error("Error al autenticar el usuario: " + err.message);
        callback(err, null);
      } else if (result.length === 0) {
        callback(null, null);
      } else {
        const user = result[0];
        callback(null, user);
      }
    });
  }

  static loginAdmin(user, callback) {
    const query = "SELECT * FROM admin WHERE email = ? AND contrasenia = ?";
    database.query(query, [user.email, user.contrasenia], (err, result) => {
      if (err) {
        console.error("Error al autenticar el usuario: " + err.message);
        callback(err, null);
      } else if (result.length === 0) {
        callback(null, null);
      } else {
        const user = result[0];
        callback(null, user);
      }
    });
  }

  static obtenerNumeroDeClicksGratis(callback) {
    const query =
      "SELECT gratis FROM click_admin ORDER BY version DESC LIMIT 1";
    database.query(query, (err, result) => {
      if (err) {
        console.error(
          "Error al obtener el número de clicks gratis desde la base de datos:",
          err.message
        );
        callback(err, null);
      } else {
        callback(null, result[0].gratis);
      }
    });
  }

  static obtenerGruas(callback) {
    this.obtenerNumeroDeClicksGratis((err, result) => {
      if (err) {
        callback(err, null);
      } else {
        const numeroDeClicksGratis = result;

        const query = `
            SELECT grua.* 
            FROM grua 
            WHERE EXISTS (
                SELECT 1 
                FROM plan_cliente 
                INNER JOIN plan ON plan_cliente.idPlan = plan.id
                WHERE plan_cliente.idCliente = grua.idCliente
                AND EXISTS (
                    SELECT 1 
                    FROM pago 
                    WHERE pago.idPlanCliente = plan_cliente.id 
                    AND pago.fecha >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
                )
                AND (
                    SELECT COUNT(*) 
                    FROM click 
                    WHERE click.idCliente = grua.idCliente 
                    AND click.fecha >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
                ) < plan.clicks
            )
            OR (
                SELECT COUNT(*) 
                FROM click 
                WHERE click.idCliente = grua.idCliente 
                AND click.fecha >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
            ) < ?
        `;
        database.query(query, [numeroDeClicksGratis], (err, result) => {
          if (err) {
            console.error(
              "Error al obtener grúas desde la base de datos:",
              err.message
            );
            callback(err, null);
          } else {
            callback(null, result);
          }
        });
      }
    });
  }

  static editarGrua(idGrua, nuevosDetalles, callback) {
    console.log(nuevosDetalles);
    const query =
      "UPDATE grua SET marca = ?, modelo = ?, capacidad = ?, whatsapp = ?, ubicacion = ? WHERE idGrua = ?";
    const values = [
      nuevosDetalles.marca,
      nuevosDetalles.modelo,
      nuevosDetalles.capacidad,
      nuevosDetalles.whatsapp,
      nuevosDetalles.ubicacion,
      idGrua,
    ];
    console.log("valores de la grua: " + values);
    console.log("id de la grua: " + idGrua);
    database.query(query, values, (err, result) => {
      if (err) {
        console.error("Error al editar la grúa:", err.message);
        callback(err, false);
      } else {
        console.log("Grúa editada exitosamente.");
        callback(null, true);
      }
    });
  }

  static eliminarGrua(idGrua, callback) {
    const query = "DELETE FROM grua WHERE idGrua = ?";
    database.query(query, [idGrua], (err, result) => {
      if (err) {
        console.error("Error al eliminar la grúa:", err.message);
        callback(err, false);
      } else {
        console.log("Grúa eliminada exitosamente.");
        callback(null, true);
      }
    });
  }

  static consultarGruasPorIdCliente(idCliente, callback) {
    const query = "SELECT * FROM grua WHERE idCliente = ?";
    database.query(query, [idCliente], (err, result) => {
      if (err) {
        console.error(
          "Error al consultar las grúas por ID de cliente:",
          err.message
        );
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  }

  static cambiarEstadoGrua(idGrua, nuevoEstado, callback) {
    // const query = 'UPDATE grua SET estadoGrua = ? WHERE idGrua = ?';
    const query = "UPDATE grua SET estadoGrua = ?";
    const values = [nuevoEstado, idGrua];
    database.query(query, values, (err, result) => {
      if (err) {
        console.error("Error al cambiar el estado de la grúa:", err.message);
        callback(err, false);
      } else {
        console.log("Estado de la grúa cambiado exitosamente.");
        callback(null, true);
      }
    });
  }

  static obtenerGruasPendientes(callback) {
    const query = "SELECT * FROM grua WHERE estadoGrua = 0";
    database.query(query, (err, result) => {
      if (err) {
        console.error(
          "Error al obtener grúas desde la base de datos:",
          err.message
        );
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  }
}

module.exports = {
  userData,
};

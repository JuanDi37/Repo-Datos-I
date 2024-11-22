const { Pool } = require('pg');
const pool = require('../models/db');

// Crear un préstamo
exports.crearPrestamo = async (req, res) => {
  const { codigo_usuario, monto_solicitado, cuotas_pactadas, motivo, referencias } = req.body;

  try {
    // Crear usuario
    const usuarioResult = await pool.query(
      `INSERT INTO miprestamo.USUARIOS (codigo_usuario, primer_nombre, primer_apellido, genero, fecha_nacimiento)
       VALUES ($1, $2, $3, $4, $5) RETURNING user_id`,
      [codigo_usuario, req.body.primer_nombre, req.body.primer_apellido, req.body.genero, req.body.fecha_nacimiento]
    );

    const userId = usuarioResult.rows[0].user_id;

    // Registrar referencias personales
    for (const ref of referencias) {
      await pool.query(
        `INSERT INTO miprestamo.REFERENCIA (user_id, tipo_id, nombre_completo, telefono)
         VALUES ($1, $2, $3, $4)`,
        [userId, ref.tipo_id, ref.nombre_completo, ref.telefono]
      );
    }

    // Crear préstamo con estado "pendiente"
    const prestamoResult = await pool.query(
      `INSERT INTO miprestamo.PRESTAMO (codigo_prestamo, monto_solicitado, cuotas_pactadas, motivo, estatus_id, user_id, fecha_creacion)
       VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING prestamo_id`,
      [req.body.codigo_prestamo, monto_solicitado, cuotas_pactadas, motivo, 1, userId]
    );

    res.status(201).json({ message: 'Préstamo registrado exitosamente', prestamo: prestamoResult.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar el préstamo' });
  }
};

// Obtener préstamos pendientes
exports.obtenerPrestamosPendientes = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.*, u.primer_nombre, u.primer_apellido 
       FROM miprestamo.PRESTAMO p
       JOIN miprestamo.USUARIOS u ON p.user_id = u.user_id
       WHERE p.estatus_id = 1`
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener préstamos pendientes' });
  }
};

// Aprobar o rechazar un préstamo
exports.aprobarPrestamo = async (req, res) => {
  const { tasa_interes, iva, cargos_administrativos, estatus_id } = req.body;
  const prestamoId = req.params.id;

  try {
    // Actualizar el préstamo
    await pool.query(
      `UPDATE miprestamo.PRESTAMO
       SET estatus_id = $1, porcentaje_interes = $2, iva = $3, cargos_administrativos = $4, fecha_aprobacion = NOW()
       WHERE prestamo_id = $5`,
      [estatus_id, tasa_interes, iva, cargos_administrativos, prestamoId]
    );

    if (estatus_id === 2) { // Si es aprobado
      const prestamoResult = await pool.query(
        `SELECT cuotas_pactadas, monto_solicitado, porcentaje_interes 
         FROM miprestamo.PRESTAMO 
         WHERE prestamo_id = $1`,
        [prestamoId]
      );

      const { cuotas_pactadas, monto_solicitado } = prestamoResult.rows[0];

      for (let i = 1; i <= cuotas_pactadas; i++) {
        const fechaPago = new Date();
        fechaPago.setMonth(fechaPago.getMonth() + i);

        await pool.query(
          `INSERT INTO miprestamo.CALENDARIO_DE_PAGOS (prestamo_id, numero_pago, fecha_esperada)
           VALUES ($1, $2, $3)`,
          [prestamoId, i, fechaPago]
        );
      }
    }

    res.status(200).json({ message: 'Préstamo actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el préstamo' });
  }
};

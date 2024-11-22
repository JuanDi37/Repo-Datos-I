const { Pool } = require('pg');
const pool = require('../models/db');

// Registrar un pago
exports.registrarPago = async (req, res) => {
  const { calendario_id, fecha_real, monto_pagado, mora, estado_id } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO miprestamo.HISTORIAL_PAGOS (calendario_id, fecha_real, monto_pagado, mora, estado_id) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [calendario_id, fecha_real, monto_pagado, mora, estado_id]
    );
    res.status(201).json({ message: 'Pago registrado exitosamente', pago: result.rows[0] });
  } catch (error) {
    console.error('Error al registrar el pago:', error);
    res.status(500).json({ message: 'Error al registrar el pago' });
  }
};

// Validar un pago
exports.validarPago = async (req, res) => {
  const { pagoId } = req.params;
  const { analista_id, estatus_id } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO miprestamo.VALIDACION (pago_id, analista_id, fecha_validacion, estatus_id) 
       VALUES ($1, $2, NOW(), $3) RETURNING *`,
      [pagoId, analista_id, estatus_id]
    );
    res.status(200).json({ message: 'Pago validado exitosamente', validacion: result.rows[0] });
  } catch (error) {
    console.error('Error al validar el pago:', error);
    res.status(500).json({ message: 'Error al validar el pago' });
  }
};

const { Pool } = require('pg');
const pool = require('../models/db');

// Generar reporte general
exports.generarReporteGeneral = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.prestamo_id, 
        u.primer_nombre || ' ' || u.primer_apellido AS nombre_cliente,
        u.fecha_nacimiento,
        p.monto_solicitado,
        p.cuotas_pactadas,
        p.motivo,
        p.estatus_id,
        (SELECT SUM(monto_pagado) FROM miprestamo.HISTORIAL_PAGOS WHERE prestamo_id = p.prestamo_id) AS total_pagado
      FROM miprestamo.PRESTAMO p
      JOIN miprestamo.USUARIOS u ON p.user_id = u.user_id;
    `);

    res.status(200).json({ reportes: result.rows });
  } catch (error) {
    console.error('Error al generar el reporte general:', error);
    res.status(500).json({ message: 'Error al generar el reporte general' });
  }
};

// Generar reporte por usuario
exports.generarReporteUsuario = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(`
      SELECT 
        p.prestamo_id, 
        u.primer_nombre || ' ' || u.primer_apellido AS nombre_cliente,
        p.monto_solicitado,
        p.cuotas_pactadas,
        p.motivo,
        p.estatus_id,
        (SELECT SUM(monto_pagado) FROM miprestamo.HISTORIAL_PAGOS WHERE prestamo_id = p.prestamo_id) AS total_pagado
      FROM miprestamo.PRESTAMO p
      JOIN miprestamo.USUARIOS u ON p.user_id = u.user_id
      WHERE u.user_id = $1;
    `, [userId]);

    res.status(200).json({ reportes: result.rows });
  } catch (error) {
    console.error('Error al generar el reporte por usuario:', error);
    res.status(500).json({ message: 'Error al generar el reporte por usuario' });
  }
};

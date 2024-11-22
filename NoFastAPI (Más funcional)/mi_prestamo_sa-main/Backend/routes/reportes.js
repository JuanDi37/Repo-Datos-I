const express = require('express');
const { generarReporteGeneral, generarReporteUsuario } = require('../controllers/reportesController');

const router = express.Router();

// Endpoint para generar reporte general
router.get('/general', generarReporteGeneral);

// Endpoint para generar reporte por usuario
router.get('/usuario/:userId', generarReporteUsuario);

module.exports = router;

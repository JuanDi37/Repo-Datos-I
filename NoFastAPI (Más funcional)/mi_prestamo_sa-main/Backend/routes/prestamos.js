const express = require('express');
const { crearPrestamo, obtenerPrestamosPendientes, aprobarPrestamo } = require('../controllers/prestamosController');

const router = express.Router();

// Ruta para crear un préstamo
router.post('/crear', crearPrestamo);

// Ruta para obtener préstamos pendientes
router.get('/pendientes', obtenerPrestamosPendientes);

// Ruta para aprobar/rechazar un préstamo
router.put('/aprobar/:id', aprobarPrestamo);

module.exports = router;

const express = require('express');
const { registrarPago, validarPago } = require('../controllers/pagosController');

const router = express.Router();

// Ruta para registrar un pago
router.post('/registrar', registrarPago);

// Ruta para validar un pago
router.put('/validar/:pagoId', validarPago);

module.exports = router;

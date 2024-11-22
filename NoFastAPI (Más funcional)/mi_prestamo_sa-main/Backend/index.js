const express = require('express');
const cors = require('cors');

// Rutas
const prestamosRoutes = require('./routes/prestamos');
const pagosRoutes = require('./routes/pagos');
const reportesRoutes = require('./routes/reportes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Registrar rutas
app.use('/api/prestamos', prestamosRoutes);
app.use('/api/pagos', pagosRoutes);
app.use('/api/reportes', reportesRoutes);

const PORT = process.env.PORT || 5001; // Cambiado a 5001
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

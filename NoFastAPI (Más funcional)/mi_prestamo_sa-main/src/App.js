import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Importa Navigate
import IngresoPrestamos from './views/IngresoPrestamos';
import RevisionPrestamos from './views/RevisionPrestamos';
import IngresoComprobante from './views/IngresoComprobante';
import ValidacionComprobante from './views/ValidacionComprobante';
import SolicitudFiniquito from './views/SolicitudFiniquito';
import ModuloReporteria from './views/ModuloReporteria';

function App() {
  return (
    <Router>
        <Routes>
          {/* Ruta inicial redirige a /ingreso-prestamos */}
          <Route path="/" element={<Navigate to="/ingreso-prestamos" />} />
          <Route path="/ingreso-prestamos" element={<IngresoPrestamos />} />
          <Route path="/revision-prestamos" element={<RevisionPrestamos />} />
          <Route path="/ingreso-comprobante" element={<IngresoComprobante />} />
          <Route path="/validacion-comprobante" element={<ValidacionComprobante />} />
          <Route path="/finiquito" element={<SolicitudFiniquito />} />
          <Route path="/reporte" element={<ModuloReporteria />} />
        </Routes>
    </Router>
  );
}

export default App;

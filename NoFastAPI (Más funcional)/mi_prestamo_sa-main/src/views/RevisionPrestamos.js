import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeIcon, ClipboardDocumentListIcon, CurrencyDollarIcon, CheckIcon, ChartBarIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const RevisionPrestamos = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      {/* Barra superior */}
      <header className="w-full bg-white shadow-md fixed top-0 left-0 z-10 py-6 px-4">
        <h1 className="text-2xl font-bold text-center text-gray-800 mt-4">Revisión de Préstamos</h1>
      </header>

      {/* Contenido central */}
      <div className="flex flex-grow items-center justify-center p-4 text-center mt-20">
        <h2 className="text-xl font-semibold text-gray-700">Revisar los préstamos pendientes</h2>
      </div>

      {/* Barra de navegación inferior */}
      <nav className="bg-white fixed bottom-0 left-0 w-full border-t border-gray-300 py-3 px-4">
        <div className="flex justify-around py-2">
          {/* Botones de navegación */}
          <button
            onClick={() => navigate('/ingreso-prestamos')}
            className="flex flex-col items-center text-gray-700 hover:text-blue-500"
          >
            <HomeIcon className="h-6 w-6" />
            <span className="text-sm">Préstamos</span>
          </button>
          <button
            onClick={() => navigate('/revision-prestamos')}
            className="flex flex-col items-center text-blue-500"
          >
            <ClipboardDocumentListIcon className="h-6 w-6" />
            <span className="text-sm">Revisión</span>
          </button>
          <button
            onClick={() => navigate('/ingreso-comprobante')}
            className="flex flex-col items-center text-gray-700 hover:text-blue-500"
          >
            <CurrencyDollarIcon className="h-6 w-6" />
            <span className="text-sm">Pagos</span>
          </button>
          <button
            onClick={() => navigate('/validacion-comprobante')}
            className="flex flex-col items-center text-gray-700 hover:text-blue-500"
          >
            <CheckIcon className="h-6 w-6" />
            <span className="text-sm">Validar</span>
          </button>
          <button
            onClick={() => navigate('/reporte')}
            className="flex flex-col items-center text-gray-700 hover:text-blue-500"
          >
            <ChartBarIcon className="h-6 w-6" />
            <span className="text-sm">Reportes</span>
          </button>
          <button
            onClick={() => navigate('/finiquito')}
            className="flex flex-col items-center text-gray-700 hover:text-blue-500"
          >
            <DocumentTextIcon className="h-6 w-6" />
            <span className="text-sm">Finiquito</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default RevisionPrestamos;

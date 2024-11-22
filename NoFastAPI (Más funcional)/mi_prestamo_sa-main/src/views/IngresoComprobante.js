import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeIcon, ClipboardDocumentIcon, CurrencyDollarIcon, CheckIcon, ChartBarIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const IngresoComprobante = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-gray-200">
      <header className="w-full bg-white shadow-md py-4 px-4">
        <h1 className="text-xl font-bold text-center text-gray-800">Ingreso de Comprobante</h1>
      </header>
      <main className="flex-grow p-4">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Registrar un comprobante de pago</h2>
          <p className="text-gray-600">Aquí puedes cargar el comprobante correspondiente a tu pago.</p>
        </div>
      </main>
      <nav className="bg-white border-t border-gray-300">
        <div className="flex justify-around py-2">
          <button onClick={() => navigate('/ingreso-prestamos')} className="flex flex-col items-center text-gray-700 hover:text-blue-500">
            <HomeIcon className="h-6 w-6" />
            <span className="text-xs">Préstamos</span>
          </button>
          <button onClick={() => navigate('/revision-prestamos')} className="flex flex-col items-center text-gray-700 hover:text-blue-500">
            <ClipboardDocumentIcon className="h-6 w-6" />
            <span className="text-xs">Revisión</span>
          </button>
          <button onClick={() => navigate('/ingreso-comprobante')} className="flex flex-col items-center text-blue-500">
            <CurrencyDollarIcon className="h-6 w-6" />
            <span className="text-xs">Pagos</span>
          </button>
          <button onClick={() => navigate('/validacion-comprobante')} className="flex flex-col items-center text-gray-700 hover:text-blue-500">
            <CheckIcon className="h-6 w-6" />
            <span className="text-xs">Validar</span>
          </button>
          <button onClick={() => navigate('/reporte')} className="flex flex-col items-center text-gray-700 hover:text-blue-500">
            <ChartBarIcon className="h-6 w-6" />
            <span className="text-xs">Reportes</span>
          </button>
          <button onClick={() => navigate('/finiquito')} className="flex flex-col items-center text-gray-700 hover:text-blue-500">
            <DocumentTextIcon className="h-6 w-6" />
            <span className="text-xs">Finiquito</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default IngresoComprobante;

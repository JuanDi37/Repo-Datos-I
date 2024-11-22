import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { HomeIcon, ClipboardDocumentIcon, CurrencyDollarIcon, CheckIcon, ChartBarIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const IngresoPrestamos = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    codigo_usuario: '',
    primer_nombre: '',
    primer_apellido: '',
    genero: '',
    fecha_nacimiento: '',
    monto_solicitado: '',
    cuotas_pactadas: '',
    motivo: '',
    referencias: [
      { tipo_id: 1, nombre_completo: '', telefono: '' },
      { tipo_id: 2, nombre_completo: '', telefono: '' },
    ],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReferenciaChange = (index, field, value) => {
    const newReferencias = [...formData.referencias];
    newReferencias[index][field] = value;
    setFormData({ ...formData, referencias: newReferencias });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/prestamos', formData);
      alert('Préstamo registrado exitosamente');
      console.log(response.data);
    } catch (error) {
      console.error('Error al registrar el préstamo:', error);
      alert('Error al registrar el préstamo');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-200">
      {/* Contenedor principal */}
      <header className="w-full bg-white shadow-md py-4 px-4">
        <h1 className="text-xl font-bold text-center text-gray-800">Ingreso de Préstamos</h1>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow p-4">
        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Registrar un nuevo préstamo</h2>
          <p className="text-gray-600">Llena los datos del cliente y del préstamo a continuación.</p>
        </div>

        {/* Formulario de ingreso */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Datos del Cliente</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="codigo_usuario"
              placeholder="Código de Usuario"
              value={formData.codigo_usuario}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="primer_nombre"
              placeholder="Primer Nombre"
              value={formData.primer_nombre}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="primer_apellido"
              placeholder="Primer Apellido"
              value={formData.primer_apellido}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <select
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            >
              <option value="">Seleccionar Género</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
            <input
              type="date"
              name="fecha_nacimiento"
              placeholder="Fecha de Nacimiento"
              value={formData.fecha_nacimiento}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-4">Datos del Préstamo</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="monto_solicitado"
              placeholder="Monto Solicitado"
              value={formData.monto_solicitado}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              name="cuotas_pactadas"
              placeholder="Cuotas Pactadas"
              value={formData.cuotas_pactadas}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <textarea
              name="motivo"
              placeholder="Motivo del Préstamo"
              value={formData.motivo}
              onChange={handleChange}
              className="border p-2 rounded col-span-2"
              required
            ></textarea>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-4">Referencias Personales</h3>
          {formData.referencias.map((ref, index) => (
            <div key={index} className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={`Nombre de Referencia ${index + 1}`}
                value={ref.nombre_completo}
                onChange={(e) => handleReferenciaChange(index, 'nombre_completo', e.target.value)}
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                placeholder={`Teléfono de Referencia ${index + 1}`}
                value={ref.telefono}
                onChange={(e) => handleReferenciaChange(index, 'telefono', e.target.value)}
                className="border p-2 rounded"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600"
          >
            Registrar Préstamo
          </button>
        </form>
      </main>

      {/* Barra de navegación inferior */}
      <nav className="bg-white border-t border-gray-300">
        <div className="flex justify-around py-2">
          <button
            onClick={() => navigate('/ingreso-prestamos')}
            className="flex flex-col items-center text-blue-500"
          >
            <HomeIcon className="h-6 w-6" />
            <span className="text-xs">Préstamos</span>
          </button>
          <button
            onClick={() => navigate('/revision-prestamos')}
            className="flex flex-col items-center text-gray-700 hover:text-blue-500"
          >
            <ClipboardDocumentIcon className="h-6 w-6" />
            <span className="text-xs">Revisión</span>
          </button>
          <button
            onClick={() => navigate('/ingreso-comprobante')}
            className="flex flex-col items-center text-gray-700 hover:text-blue-500"
          >
            <CurrencyDollarIcon className="h-6 w-6" />
            <span className="text-xs">Pagos</span>
          </button>
          <button
            onClick={() => navigate('/validacion-comprobante')}
            className="flex flex-col items-center text-gray-700 hover:text-blue-500"
          >
            <CheckIcon className="h-6 w-6" />
            <span className="text-xs">Validar</span>
          </button>
          <button
            onClick={() => navigate('/reporte')}
            className="flex flex-col items-center text-gray-700 hover:text-blue-500"
          >
            <ChartBarIcon className="h-6 w-6" />
            <span className="text-xs">Reportes</span>
          </button>
          <button
            onClick={() => navigate('/finiquito')}
            className="flex flex-col items-center text-gray-700 hover:text-blue-500"
          >
            <DocumentTextIcon className="h-6 w-6" />
            <span className="text-xs">Finiquito</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default IngresoPrestamos;

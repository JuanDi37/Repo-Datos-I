import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'; // Si estás usando estilos globales

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Monta la aplicación en el div "root"
);

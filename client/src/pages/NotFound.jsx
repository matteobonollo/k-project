import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Pagina non trovata</h2>
      <p className="text-gray-600 mb-6 text-center">
        La pagina che stai cercando potrebbe essere stata rimossa o non esiste.
      </p>
      
      <div className="flex space-x-4">
        <Link
          to="/"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Torna alla Home
        </Link>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Indietro
        </button>
      </div>
    </div>
  );
}

export default NotFound;

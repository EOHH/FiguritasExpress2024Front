// Archivo MainHeader.js
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './MainHeader.css';

const MainHeader = () => {
  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.elements.search.value;
    console.log('Search query:', query);
    // Aquí puedes agregar lógica adicional para manejar la búsqueda
  };

  return (
    <header className="toluca-header">
      <div className="container">
        <div className="header-content">
          <div className="promo-text">
            <span>¡10% de descuento</span> en tu primera compra!
          </div>
          <form className="search-box" onSubmit={handleSearch}>
            <FaSearch className="search-icon" />
            <input
              type="text"
              name="search"
              placeholder="Buscar"
              tabIndex="0" // Asegura que el input sea accesible
            />
          </form>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;

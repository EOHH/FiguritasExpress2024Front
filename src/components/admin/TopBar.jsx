import React from 'react';
import { FaBell } from 'react-icons/fa'; // Agregar iconos

const TopBar = ({ title }) => (
  <header className="top-bar">
    {/* Logo y Título */}
    <div className="top-bar-left">
      <img 
        src="https://cdn.icon-icons.com/icons2/317/PNG/512/dashboard-icon_34458.png"
        alt="Logo"
        className="top-bar-logo"
      />
      <h1>{title}</h1>
    </div>

    {/* Usuario y Notificaciones */}
    <div className="user-info">
      <div className="notifications">
        <FaBell style={{ marginRight: '10px' }} />
        <span className="notification-count">9</span>
      </div>
      <div className="user-profile">
        <img 
          src="https://via.placeholder.com/40" // Foto de perfil del usuario
          alt="User Profile"
          className="user-img"
        />
        <span>Harver</span>
      </div>
    </div>
  </header>
);

export default TopBar;

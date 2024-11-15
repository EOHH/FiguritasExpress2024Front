import React from 'react';
import { FaTachometerAlt, FaUser, FaBox, FaClipboardList } from 'react-icons/fa'; // Iconos de react-icons

const Sidebar = ({ setActiveTab }) => (
  <aside className="sidebar">
    <nav>
      <ul>
        <li onClick={() => setActiveTab('dashboard')}><FaTachometerAlt /> Dashboard</li>
        <li onClick={() => setActiveTab('users')}><FaUser /> Usuarios</li>
        <li onClick={() => setActiveTab('products')}><FaBox /> Productos</li>
        <li onClick={() => setActiveTab('orders')}><FaClipboardList /> Pedidos</li>
      </ul>
    </nav>
  </aside>
);

export default Sidebar;

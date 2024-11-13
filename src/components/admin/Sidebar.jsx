import React from 'react';

const Sidebar = ({ setActiveTab }) => (
  <aside className="sidebar">
    <nav>
      <ul>
        <li onClick={() => setActiveTab('dashboard')}>Dashboard</li>
        <li onClick={() => setActiveTab('users')}>Usuarios</li>
        <li onClick={() => setActiveTab('products')}>Productos</li>
        <li onClick={() => setActiveTab('orders')}>Pedidos</li>
      </ul>
    </nav>
  </aside>
);

export default Sidebar;

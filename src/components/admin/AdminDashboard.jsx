import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import UserManagement from './UserManagement';
import ProductManagement from './ProductManagement';
import OrderManagement from './OrderManagement';
import OrderChart from './OrderChart'; // Importa el componente de la gráfica
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const getTitle = () => {
    switch (activeTab) {
      case 'users':
        return 'Usuarios';
      case 'products':
        return 'Productos';
      case 'orders':
        return 'Pedidos';
      default:
        return 'Dashboard';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement />;
      case 'products':
        return <ProductManagement />;
      case 'orders':
        return <OrderManagement />;
      default:
        return (
          <div className='dashboard-container'>
            <h2>Dashboard principal (estadísticas, gráficos, etc.)</h2>
            <OrderChart /> {/* Muestra la gráfica de pedidos en el dashboard */}
          </div>
        );
    }
  };

  return (
    <div className="admin-dashboard">
      <Sidebar setActiveTab={setActiveTab} />
      <main className="main-content">
        <TopBar title={getTitle()} />
        <section className="content">{renderContent()}</section>
      </main>
    </div>
  );
};

export default AdminDashboard;

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import UserManagement from './UserManagement';
import ProductManagement from './ProductManagement';
import OrderManagement from './OrderManagement';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement />;
      case 'products':
        return <ProductManagement />;
      case 'orders':
        return <OrderManagement />;
      default:
        return <div>Dashboard principal (estadísticas, gráficos, etc.)</div>;
    }
  };

  return (
    <div className="admin-dashboard">
      <Sidebar setActiveTab={setActiveTab} />
      <main className="main-content">
        <TopBar title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} />
        <section className="content">{renderContent()}</section>
      </main>
    </div>
  );
};

export default AdminDashboard;

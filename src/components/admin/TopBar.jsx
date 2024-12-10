import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import WebSocketService from './WebSocketService';
import NotificationModal from './NotificationModal';

const TopBar = ({ title }) => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Cargar notificaciones desde localStorage al montar el componente
  useEffect(() => {
    const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    setNotifications(storedNotifications);
    setNotificationCount(storedNotifications.length);
  }, []);

  // Guardar notificaciones en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Manejo de notificaciones
  const handleNotification = (message) => {
    setNotifications((prevNotifications) => [...prevNotifications, message]);
    setNotificationCount((prevCount) => prevCount + 1);
  };

  const removeNotification = (index) => {
    setNotifications((prevNotifications) => prevNotifications.filter((_, i) => i !== index));
    setNotificationCount((prevCount) => prevCount - 1);
  };

  const handleWebSocketMessage = (message) => {
    if (message && message.message) {
      handleNotification(message.message);
    } else {
      handleNotification('Mensaje mal formado o vacío.');
    }
  };

  useEffect(() => {
    const subscribeToChannels = () => {
      WebSocketService.subscribeToNotifications('/topic/new-orders', handleWebSocketMessage);
      WebSocketService.subscribeToNotifications('/topic/new-users', handleWebSocketMessage);
      WebSocketService.subscribeToNotifications('/topic/new-products', handleWebSocketMessage);
      WebSocketService.subscribeToNotifications('/topic/deleted', handleWebSocketMessage);
    };

    if (WebSocketService.client && WebSocketService.client.connected) {
      subscribeToChannels();
    } else {
      WebSocketService.client.onConnect = subscribeToChannels;
    }

    return () => {
      WebSocketService.disconnect();
    };
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <header className="top-bar">
      <div className="top-bar-left">
        <img
          src="https://cdn.icon-icons.com/icons2/317/PNG/512/dashboard-icon_34458.png"
          alt="Logo"
          className="top-bar-logo"
        />
        <h1>{title}</h1>
      </div>

      <div className="user-info">
        <div className="notifications" onClick={toggleNotifications}>
          <FaBell style={{ marginRight: '10px' }} />
          <span className="notification-count">{notificationCount}</span>
          {showNotifications && (
            <NotificationModal
              notifications={notifications}
              onClose={toggleNotifications}
              onRemove={removeNotification}
            />
          )}
        </div>
        <div className="user-profile">
          <img
            src="https://via.placeholder.com/40"
            alt="User Profile"
            className="user-img"
          />
          <span>Harver</span>
        </div>
      </div>
    </header>
  );
};

export default TopBar;

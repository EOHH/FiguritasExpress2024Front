import React from 'react';
import './NotificationModal.css';
import { FaTimes } from 'react-icons/fa';

const NotificationModal = ({ notifications, onClose, onRemove }) => {
  return (
    <div className="notification-modal">
      <div className="modal-content">
        <h3>Notificaciones</h3>
        {notifications.length > 0 ? (
          <ul className="notification-list">
            {notifications.map((notif, index) => (
              <li key={index} className="notification-item">
                {notif}
                <FaTimes 
                  style={{ cursor: 'pointer', marginLeft: '10px' }} 
                  onClick={() => onRemove(index)} 
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>No tienes notificaciones.</p>
        )}
        <button onClick={onClose} className="close-button">Cerrar</button>
      </div>
    </div>
  );
};

export default NotificationModal;

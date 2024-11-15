import React from 'react';
import './PreviewModal.css';
// Componente para la previsualización del envío
const PreviewModal = ({ order, onClose, onConfirm }) => {
  return (
    <div className="preview-modal-overlay">
      <div className="preview-modal">
        <h3>Confirmar Envío</h3>
        <div className="preview-details">
          <p><strong>Usuario:</strong> {order.usuario.username}</p>
          <p><strong>Email:</strong> {order.usuario.email}</p>
          <p><strong>Producto:</strong> {order.producto.nombre}</p>
          <p><strong>Precio:</strong> ${order.producto.precio}</p>
          <p><strong>Cantidad:</strong> {order.cantidad}</p>
          <p><strong>Estado:</strong> {order.estado}</p>
          <p><strong>Dirección de Envío:</strong> {order.direccion}</p>
          <p><strong>Fecha de Pedido:</strong> {order.fechaPedido}</p>
          <p><strong>Estado de Envío:</strong> {order.estadoEnvio}</p> {/* Muestra el estado actual de envío */}
        </div>
        <div className="preview-buttons">
          <button onClick={onClose}>Cancelar</button>
          <button onClick={() => onConfirm(order)}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;

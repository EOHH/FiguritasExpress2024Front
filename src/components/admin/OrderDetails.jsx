// src/components/admin/OrderDetails.jsx
import React from 'react';
import './OrderDetails.css';

const OrderDetails = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="order-details-overlay">
      <div className="order-details">
        <h2>Detalles del Pedido</h2>
        <button className="close-btn" onClick={onClose}>Cerrar</button>
        <div className="details-content">
          <p><strong>ID del Pedido:</strong> {order.idPedido}</p>
          <p><strong>Usuario:</strong> {order.usuario.username} (ID: {order.usuario.idUser})</p>
          <p><strong>Email del Usuario:</strong> {order.usuario.email}</p>
          <p><strong>Producto:</strong> {order.producto.nombre} (ID: {order.producto.idProducto})</p>
          <p><strong>Precio del Producto:</strong> ${order.producto.precio}</p>
          <p><strong>Cantidad:</strong> {order.cantidad}</p>
          <p><strong>Estado:</strong> {order.estado}</p>
          <p><strong>Fecha de Pedido:</strong> {order.fechaPedido}</p>
          <p><strong>Dirección de Envío:</strong> {order.direccion}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

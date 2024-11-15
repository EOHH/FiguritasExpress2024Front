import React, { useState, useEffect } from 'react';
import { FaTruck, FaTrashAlt, FaInfoCircle } from 'react-icons/fa';
import OrderDetails from './OrderDetails';
import PreviewModal from './PreviewModal'; // Modal para previsualización
import './OrderManagement.css';
import { fetchData, handleDelete } from './crudFunctions';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false); // Estado para controlar la visibilidad del modal de previsualización

  useEffect(() => {
    fetchData('orders', setOrders);  // Traemos los datos de los pedidos al cargar el componente
  }, []);

  // Cerrar detalles del pedido
  const closeDetails = () => {
    setSelectedOrder(null);
  };

  // Mostrar el modal de previsualización antes de confirmar el envío
  const handlePreview = (order) => {
    setSelectedOrder(order);
    setPreviewVisible(true);  // Abrir el modal de previsualización
  };

  // Cerrar el modal de previsualización
  const closePreview = () => {
    setPreviewVisible(false);
  };

  // Cambiar el estado de envío a 'Entregado'
  const handleSend = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:8080/api_int_2024/orders/updateStatus/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estadoEnvio: 'Entregado' }),
      });

      if (response.ok) {
        // Actualizar la lista de pedidos después de un envío exitoso
        fetchData('orders', setOrders);
        console.log('Pedido enviado con éxito.');
        closePreview();  // Cerrar la previsualización al confirmar
      } else {
        console.error('Error al enviar el pedido.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div className="padded">
      <h2>Pedidos</h2>
      <table className="order-table">
        <thead>
          <tr>
            <th>Fecha Emisión</th>
            <th>Estado</th>
            <th>Zona</th>
            <th>Total</th>
            <th>Estado Envío</th> {/* Nueva columna */}
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.idPedido}>
              <td>{order.fechaPedido}</td>
              <td>
                {order.estado === 'pagado' ? (
                  <span className="status paid">Pagado</span>
                ) : (
                  <span className="status pending">Pendiente de pago</span>
                )}
              </td>
              <td>{order.direccion}</td>
              <td>${order.producto && order.producto.precio}</td>
              <td>
                <span className={`status ${order.estadoEnvio === 'Pendiente de envío' ? 'pending' : 'delivered'}`}>
                  {order.estadoEnvio}
                </span>
              </td>
              <td className="action-buttons">
                <button className="action-btn details-btn" onClick={() => setSelectedOrder(order)}>
                  <FaInfoCircle /> Detalles
                </button>
                <button className="action-btn send-btn" onClick={() => handlePreview(order)}>
                  <FaTruck /> Enviar
                </button>
                <button
                  className="action-btn delete-btn"
                  onClick={() => handleDelete(order.idPedido, 'orders', () => fetchData('orders', setOrders))}
                >
                  <FaTrashAlt /> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrder && <OrderDetails order={selectedOrder} onClose={closeDetails} />}
      {previewVisible && <PreviewModal order={selectedOrder} onClose={closePreview} onConfirm={handleSend} />}
    </div>
  );
};

export default OrderManagement;

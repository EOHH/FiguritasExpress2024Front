import React, { useState, useEffect } from 'react';
import { FaTruck, FaTrashAlt, FaInfoCircle } from 'react-icons/fa';
import OrderDetails from './OrderDetails';
import './OrderManagement.css';
import { fetchData, handleDelete } from './crudFunctions';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchData('orders', setOrders);
  }, []);

  const closeDetails = () => {
    setSelectedOrder(null);
  };

  return (
    <div>
      <h2>Pedidos</h2>
      <table className="order-table">
        <thead>
          <tr>
            <th>Fecha Emisión</th>
            <th>Estado</th>
            <th>Zona</th>
            <th>Total</th>
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
                <button className="action-btn details-btn" onClick={() => setSelectedOrder(order)}>
                  <FaInfoCircle /> Detalles
                </button>
                <button className="action-btn send-btn" onClick={() => console.log('Enviando pedido')}>
                  <FaTruck /> Enviar
                </button>
                <button className="action-btn delete-btn" onClick={() => handleDelete(order.idPedido, 'orders', () => fetchData('orders', setOrders))}>
                  <FaTrashAlt /> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrder && <OrderDetails order={selectedOrder} onClose={closeDetails} />}
    </div>
  );
};

export default OrderManagement;

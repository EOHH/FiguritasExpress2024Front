import React, { useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Usa la biblioteca autotable para manejar tablas
import { FaArrowLeft } from 'react-icons/fa';
import './OrderDetails.css';

const OrderDetails = ({ order, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!order) return null;

  // Función para descargar el informe en PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Detalles del Pedido', 105, 20, { align: 'center' });

    // Información de Pedido
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`ID del Pedido: ${order.idPedido}`, 20, 40);
    doc.text(`Usuario: ${order.usuario.username} (ID: ${order.usuario.idUser})`, 20, 50);
    doc.text(`Email del Usuario: ${order.usuario.email}`, 20, 60);
    doc.text(`Producto: ${order.producto.nombre} (ID: ${order.producto.idProducto})`, 20, 70);
    doc.text(`Precio del Producto: $${order.producto.precio}`, 20, 80);
    doc.text(`Cantidad: ${order.cantidad}`, 20, 90);
    doc.text(`Estado: ${order.estado}`, 20, 100);
    doc.text(`Fecha de Pedido: ${order.fechaPedido}`, 20, 110);
    doc.text(`Dirección de Envío: ${order.direccion}`, 20, 120);

    // Estilizar las líneas separadoras
    doc.setDrawColor(150, 150, 150);
    doc.line(20, 30, 190, 30); // Línea debajo del título
    doc.line(20, 130, 190, 130); // Línea debajo de la información

    // Guardar el PDF
    doc.save('Detalles_Pedido.pdf');
  };

  return (
    <div className="order-details-overlay">
      <div className="order-details">
        <div className="header">
          <FaArrowLeft className="close-icon" onClick={onClose} />
        </div>
        <div className="details-table">
          <table>
            <thead>
              <tr>
                <th colSpan="2">Información del Pedido</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>ID del Pedido:</strong></td>
                <td>{order.idPedido}</td>
              </tr>
              <tr>
                <td><strong>Usuario:</strong></td>
                <td>{order.usuario.username} (ID: {order.usuario.idUser})</td>
              </tr>
              <tr>
                <td><strong>Email del Usuario:</strong></td>
                <td>{order.usuario.email}</td>
              </tr>
              <tr>
                <td><strong>Producto:</strong></td>
                <td>{order.producto.nombre} (ID: {order.producto.idProducto})</td>
              </tr>
              <tr>
                <td><strong>Precio del Producto:</strong></td>
                <td>${order.producto.precio}</td>
              </tr>
              <tr>
                <td><strong>Cantidad:</strong></td>
                <td>{order.cantidad}</td>
              </tr>
              <tr>
                <td><strong>Estado:</strong></td>
                <td>{order.estado}</td>
              </tr>
              <tr>
                <td><strong>Fecha de Pedido:</strong></td>
                <td>{order.fechaPedido}</td>
              </tr>
              <tr>
                <td><strong>Dirección de Envío:</strong></td>
                <td>{order.direccion}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button className="download-btn" onClick={downloadPDF}>Descargar Informe en PDF</button>
      </div>
    </div>
  );
};

export default OrderDetails;

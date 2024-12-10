import React from 'react';
import './ResumenPedido.css';

function ResumenPedido({ itemsCarrito, direccion, costoEnvio, totalConEnvio, onConfirmarPedido, onCancelar }) {
  return (
    <div className="resumen-pedido-container">
      <h2 className="resumen-pedido-titulo">Resumen de Pedido</h2>
      
      {/* Tabla de productos */}
      <h3 className="resumen-pedido-subtitulo">Productos en el Carrito</h3>
      <table className="resumen-pedido-tabla">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {itemsCarrito.length === 0 ? (
            <tr>
              <td colSpan="3" className="sin-productos">No hay productos en tu carrito.</td>
            </tr>
          ) : (
            itemsCarrito.map((item, index) => (
              <tr key={index}>
                <td>{item.nombre}</td>
                <td>{item.cantidad}</td>
                <td>S/ {item.precio.toFixed(2)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Detalles de pago */}
      <div className="resumen-pedido-detalles-pago">
        <p>Dirección: <strong>{direccion}</strong></p>
        <p>Costo de Envío: <strong>S/ {costoEnvio.toFixed(2)}</strong></p>
        <p>Total: <strong>S/ {totalConEnvio.toFixed(2)}</strong></p>
      </div>

      {/* Botones de acción */}
      <div className="resumen-pedido-acciones">
        <button className="resumen-pedido-button-confirmar" onClick={onConfirmarPedido}>
          Confirmar Pedido
        </button>
        <button className="resumen-pedido-button-cancelar" onClick={onCancelar}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default ResumenPedido;

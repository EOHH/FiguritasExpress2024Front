import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./Carrito.css";
import RealizarPedido from "../productos/RealizarPedido";

// Función para obtener la ruta de la imagen
const obtenerRutaImagen = (idProducto) => {
  return new URL(`../../assets/images/products/${idProducto}.jpg`, import.meta.url).href;
};

function Carrito({ loggedInUserId }) {
  const [itemsCarrito, setItemsCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [mostrarRealizarPedido, setMostrarRealizarPedido] = useState(false);
  const [metodoPago, setMetodoPago] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (loggedInUserId) {
      leerDatosCarrito();
    }
  }, [loggedInUserId]);

  const leerDatosCarrito = () => {
    const datosCarrito = JSON.parse(sessionStorage.getItem("carritocompras"));
    setItemsCarrito(datosCarrito || []);
    if (datosCarrito) {
      calcularTotal(datosCarrito);
    }
  };

  const calcularTotal = (datosCarrito) => {
    const suma = datosCarrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    setTotal(suma);
  };

  const actualizarCantidad = (cantidad, index) => {
    const carritoCantidad = [...itemsCarrito];
    carritoCantidad[index].cantidad = cantidad;
    setItemsCarrito(carritoCantidad);
    calcularTotal(carritoCantidad);
    sessionStorage.setItem("carritocompras", JSON.stringify(carritoCantidad));
  };

  const eliminarItem = (item) => {
    const carritoMenos = itemsCarrito.filter((prod) => prod.idProducto !== item.idProducto);
    setItemsCarrito(carritoMenos);
    sessionStorage.setItem("carritocompras", JSON.stringify(carritoMenos));
    calcularTotal(carritoMenos);
  };

  const vaciarCarrito = () => {
    sessionStorage.removeItem("carritocompras");
    setItemsCarrito([]);
    setTotal(0);
  };

  const onPedidoRealizado = () => {
    vaciarCarrito();
    setMostrarRealizarPedido(false);
    setMetodoPago("");
  };

  const handleMetodoPago = (method) => {
    setMetodoPago(method);
    setMostrarRealizarPedido(true);
  };

  return (
    <div className="carrito-vista-degradado">
      <div className="overlay-degradado">
        <div className="checkout-container">
          <div className={`cart-section ${mostrarRealizarPedido ? "shrink" : ""}`}>
            <h2 className="cart-title">
              <span role="img" aria-label="cart">🛒</span> Carrito de compras
            </h2>
            <div className="cart-welcome">
              <p>¡Bienvenido a tu carrito! Aquí podrás revisar los productos seleccionados y finalizar tu compra.</p>
            </div>
            <div className="cart-process">
              <div className="process-step">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyxS1Qy04WP6Woq5ZBsvwCH_ifzyLeCSVMThUqQEg7qAXkvsQ7_5f23MQpZfvfaw3NNlQ&usqp=CAU" 
                  alt="Seleccionar productos" 
                  className="process-image" 
                />
                <p>1. Selecciona tus productos favoritos</p>
              </div>
              
              <div className="process-step">
                <img 
                  src="https://academia.nubimetrics.com/hubfs/C%C3%B3mo%20elegir%20los%20mejores%20productos%20para%20vender%20en%20Mercado%20Libre.png" 
                  alt="Revisar carrito" 
                  className="process-image" 
                />
                <p>2. Revisa tu carrito cuidadosamente</p>
              </div>
              
              <div className="process-step">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9sGhAdUks6ILT3I6_Utt1qQR2ikrTWn8_pDIgQAYftMvAcfnWB2HvcM9PI93Peevw3_M&usqp=CAU" 
                  alt="Realizar pago" 
                  className="process-image" 
                />
                <p>3. Realiza tu pago de manera segura</p>
              </div>
            </div>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {itemsCarrito.map((item, index) => (
                  <tr key={item.idProducto}>
                    <td className="cart-product">
                      <img
                        src={obtenerRutaImagen(item.idProducto)}
                        alt={item.nombre}
                        className="cart-product-image"
                      />
                      <span>{item.nombre}</span>
                    </td>
                    <td>${item.precio.toFixed(2)}</td>
                    <td>
                      <input
                        type="number"
                        value={item.cantidad}
                        min="1"
                        className="quantity-input"
                        onChange={(e) => actualizarCantidad(parseInt(e.target.value), index)}
                      />
                    </td>
                    <td>S/{(item.precio * item.cantidad).toFixed(2)}</td>
                    <td>
                      <button className="remove-item" onClick={() => eliminarItem(item)}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="cart-total">
              <h4>Total: S/{total.toFixed(2)}</h4>
            </div>
            <div className="payment-methods">
              <button className="btn-proceed recolor" onClick={() => handleMetodoPago("tarjeta")}>
                Pagar con tarjeta
              </button>
              <button className="btn-proceed recolor" onClick={() => handleMetodoPago("efectivo")}>
                Pagar en efectivo
              </button>
              <button className="btn-proceed recolor" onClick={() => handleMetodoPago("yape")}>
                Pagar con yape
              </button>
            </div>
          </div>

          {mostrarRealizarPedido && (
            <div className="payment-details">
              <RealizarPedido
                itemsCarrito={itemsCarrito}
                total={total}
                onPedidoRealizado={onPedidoRealizado}
                usuarioId={loggedInUserId}
                metodoPago={metodoPago}
              />
            </div>
          )}
        </div>
      </div>
    </div>
    
  );
}

export default Carrito;

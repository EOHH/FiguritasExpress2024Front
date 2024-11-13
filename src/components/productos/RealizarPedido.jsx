import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import "./RealizarPedido.css";

function RealizarPedido({ itemsCarrito, total, onPedidoRealizado, usuarioId, metodoPago }) {
    const [nombreCliente, setNombreCliente] = useState("");
    const [direccion, setDireccion] = useState("");
    const [numeroTarjeta, setNumeroTarjeta] = useState("");
    const [fechaExpiracion, setFechaExpiracion] = useState("");
    const [cvv, setCvv] = useState("");
    const [numeroYape, setNumeroYape] = useState("");

    useEffect(() => {
        const obtenerUsuario = async () => {
            if (usuarioId) {
                try {
                    const respuesta = await fetch(`http://localhost:8080/api_int_2024/users/${usuarioId}`);
                    if (respuesta.ok) {
                        const usuario = await respuesta.json();
                        setNombreCliente(usuario.username);
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: `Error al obtener el usuario: ${respuesta.statusText}`
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error de Red",
                        text: "Error de red al obtener el usuario"
                    });
                }
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "Advertencia",
                    text: "ID de usuario no definido"
                });
            }
        };

        obtenerUsuario();
    }, [usuarioId]);

    const manejarPedido = async () => {
        if (!nombreCliente || !direccion || (metodoPago === "tarjeta" && (!numeroTarjeta || !fechaExpiracion || !cvv)) || (metodoPago === "yape" && !numeroYape)) {
            Swal.fire({
                icon: "warning",
                title: "Campos Incompletos",
                text: "Por favor, completa todos los campos requeridos."
            });
            return;
        }

        const pedidoDTO = {
            idUser: usuarioId,
            idProducto: itemsCarrito.map(item => item.idProducto),
            estado: "pagado",
            cantidad: itemsCarrito.reduce((acc, item) => acc + item.cantidad, 0),
            fechaPedido: new Date().toISOString().split('T')[0],
            direccion
        };

        try {
            const respuestaPedido = await fetch("http://localhost:8080/api_int_2024/orders/store", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pedidoDTO)
            });

            if (!respuestaPedido.ok) {
                const errorText = await respuestaPedido.text();
                Swal.fire({
                    icon: "error",
                    title: "Error al Realizar el Pedido",
                    text: "Error al realizar el pedido: " + errorText
                });
                return;
            }

            const transaccionDTO = {
                idUser: usuarioId,
                fechaVenta: new Date().toISOString().slice(0, 10),
                precioTransaccion: total,
                estado: "Completo",
                metodoPago
            };

            const respuestaTransaccion = await fetch("http://localhost:8080/api_int_2024/transacciones/store", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(transaccionDTO)
            });

            if (respuestaTransaccion.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Pedido Completo",
                    text: "Pedido y transacción realizados con éxito"
                });
                onPedidoRealizado();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error en la Transacción",
                    text: "Error al guardar la transacción."
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error al realizar el pedido: " + error.message
            });
        }
    };

    return (
        <div className="payment-section">
            {metodoPago === "tarjeta" && (
                <>
                    <h2 className="payment-title">Detalles de la Tarjeta</h2>
                    <div className="card-icons">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="MasterCard" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1024px-American_Express_logo_%282018%29.svg.png" alt="American Express" />
                    </div>
                    <div className="payment-card">
                        <div className="input-with-icon">
                            <i className="fas fa-credit-card"></i>
                            <input
                                type="text"
                                placeholder="Número de Tarjeta"
                                value={numeroTarjeta}
                                onChange={(e) => setNumeroTarjeta(e.target.value)}
                                className="payment-input"
                                maxLength="16"
                            />
                        </div>
                        <div className="input-with-icon">
                            <i className="fas fa-user"></i>
                            <input
                                type="text"
                                value={nombreCliente}
                                readOnly
                                className="payment-input"
                            />
                        </div>
                        <div className="payment-row">
                            <div className="input-with-icon">
                                <i className="fas fa-calendar-alt"></i>
                                <input
                                    type="text"
                                    placeholder="MM/AA"
                                    value={fechaExpiracion}
                                    onChange={(e) => setFechaExpiracion(e.target.value)}
                                    className="payment-input"
                                    maxLength="5"
                                />
                            </div>
                            <div className="input-with-icon">
                                <i className="fas fa-lock"></i>
                                <input
                                    type="text"
                                    placeholder="CVV"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                    className="payment-input"
                                    maxLength="3"
                                />
                            </div>
                        </div>
                        <div className="input-with-icon">
                            <i className="fas fa-map-marker-alt"></i>
                            <input
                                type="text"
                                placeholder="Dirección"
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                                className="payment-input"
                            />
                        </div>
                    </div>
                </>
            )}
            {metodoPago === "yape" && (
                <>
                    <h2 className="payment-title">Pago con Yape</h2>
                    <div className="payment-card">
                        <div className="input-with-icon">
                            <i className="fas fa-user"></i>
                            <input
                                type="text"
                                placeholder="Nombre del Cliente"
                                value={nombreCliente}
                                onChange={(e) => setNombreCliente(e.target.value)}
                                className="payment-input"
                            />
                        </div>
                        <div className="input-with-icon">
                            <i className="fas fa-mobile-alt"></i>
                            <input
                                type="text"
                                placeholder="Número de Yape"
                                value={numeroYape}
                                onChange={(e) => setNumeroYape(e.target.value)}
                                className="payment-input"
                                maxLength="11"
                            />
                        </div>
                        <div className="input-with-icon">
                            <i className="fas fa-map-marker-alt"></i>
                            <input
                                type="text"
                                placeholder="Dirección"
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                                className="payment-input"
                            />
                        </div>
                    </div>
                </>
            )}
            {metodoPago === "efectivo" && (
                <>
                    <h2 className="payment-title">Pago en Efectivo</h2>
                    <div className="payment-card">
                        <div className="input-with-icon">
                            <i className="fas fa-user"></i>
                            <input
                                type="text"
                                placeholder="Nombre del Cliente"
                                value={nombreCliente}
                                onChange={(e) => setNombreCliente(e.target.value)}
                                className="payment-input"
                            />
                        </div>
                        <div className="input-with-icon">
                            <i className="fas fa-map-marker-alt"></i>
                            <input
                                type="text"
                                placeholder="Dirección"
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                                className="payment-input"
                            />
                        </div>
                    </div>
                </>
            )}
            <div className="payment-summary">
                <p>Total: ${total.toFixed(2)}</p>
            </div>
            <button className="payment-button recolor" onClick={manejarPedido}>Verificar</button>
        </div>
    );
}

export default RealizarPedido;

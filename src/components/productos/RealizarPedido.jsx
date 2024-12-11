import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import "./RealizarPedido.css";
import ResumenPedido from './ResumenPedido';

function RealizarPedido({ itemsCarrito, total, onPedidoRealizado, usuarioId, metodoPago }) {
    const [mostrarResumen, setMostrarResumen] = useState(false);
    const [nombreCliente, setNombreCliente] = useState("");
    const [direccion, setDireccion] = useState("");
    const [numeroTarjeta, setNumeroTarjeta] = useState("");
    const [fechaExpiracion, setFechaExpiracion] = useState("");
    const [cvv, setCvv] = useState("");
    const [numeroYape, setNumeroYape] = useState("");
    const [codigoVerificacion, setCodigoVerificacion] = useState("");
    const [costoEnvio, setCostoEnvio] = useState(0);
    const [totalConEnvio, setTotalConEnvio] = useState(total);

    useEffect(() => {
        const obtenerUsuario = async () => {
            if (!usuarioId) {
                Swal.fire({
                    icon: "warning",
                    title: "Advertencia",
                    text: "ID de usuario no definido",
                });
                return;
            }

            try {
                const respuesta = await fetch(`http://localhost:8080/api_int_2024/users/${usuarioId}`);
                if (respuesta.ok) {
                    const usuario = await respuesta.json();
                    setNombreCliente(usuario.username);
                } else {
                    throw new Error(`Error: ${respuesta.statusText}`);
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: `Error al obtener el usuario: ${error.message}`,
                });
            }
        };

        obtenerUsuario();
    }, [usuarioId]);

    const origen = { lat: -11.9817207, lng: -77.0592119 };

    const calcularDistancia = (lat1, lng1, lat2, lng2) => {
        const rad = Math.PI / 180;
        const dLat = (lat2 - lat1) * rad;
        const dLng = (lng2 - lng1) * rad;

        const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLng / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return 6371 * c; // Distancia en km
    };

    // Función para determinar el costo de envío basado en la distancia
    const calcularCostoEnvio = async (direccion) => {
        const apiKey = '2706c571fee74e8b92186cc445b9f682'; // Tu clave de API
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(direccion)}&key=${apiKey}&language=es&countrycode=pe`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                // Extraer coordenadas y verificar si es un distrito de Lima
                const result = data.results[0];
                const { lat, lng } = result.geometry;
                const components = result.components || {};

                console.log("Datos devueltos por la API:", result);

                // Verificar si el resultado corresponde a Lima
                const esLima = components.state && components.state.toLowerCase().includes('lima');
                const esDistrito = components.suburb || components.city || components.town;

                if (esLima && esDistrito) {
                    // Calcular distancia desde San Martín de Porres
                    const distancia = calcularDistancia(origen.lat, origen.lng, lat, lng);

                    console.log("Distancia calculada:", distancia, "km");

                    // Costo según distancia dentro de Lima
                    if (distancia <= 5) return 5; // Costo mínimo para distancias menores o iguales a 5 km
                    if (distancia <= 20) return 10; // Costo intermedio para distancias de 5 a 20 km
                    return 15; // Costo máximo para distancias mayores a 20 km dentro de Lima
                } else {
                    // Costo para otras ciudades del Perú
                    const distancia = calcularDistancia(origen.lat, origen.lng, lat, lng);
                    return 25 + Math.ceil(distancia / 50) * 5; // Base de 25 más 5 por cada 50 km adicionales
                }
            } else {
                throw new Error("No se pudo encontrar información precisa para la dirección proporcionada.");
            }
        } catch (error) {
            console.error("Error al calcular el costo de envío:", error);
            return 50; // Retornar un valor predeterminado para evitar problemas
        }
    };


    useEffect(() => {
        const actualizarCostoEnvio = async () => {
            if (direccion) {
                const costo = await calcularCostoEnvio(direccion);
                setCostoEnvio(costo);
                setTotalConEnvio(total + costo);
            }
        };

        actualizarCostoEnvio();
    }, [direccion, total]);

    const manejarPedido = async () => {
        if (!nombreCliente || !direccion || (metodoPago === "tarjeta" && (!numeroTarjeta || !fechaExpiracion || !cvv)) || (metodoPago === "yape" && (!numeroYape || !codigoVerificacion))) {
            Swal.fire({
                icon: "warning",
                title: "Campos Incompletos",
                text: "Por favor, completa todos los campos requeridos.",
            });
            return;
        }

        const pedidoDTO = {
            idUser: usuarioId,
            idProducto: itemsCarrito.map(item => item.idProducto),
            estado: "pagado",
            cantidad: itemsCarrito.reduce((acc, item) => acc + item.cantidad, 0),
            fechaPedido: new Date().toISOString().split('T')[0],
            direccion,
            costoEnvio,
            totalConEnvio,
        };

        try {
            const respuestaPedido = await fetch("http://localhost:8080/api_int_2024/orders/store", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pedidoDTO),
            });

            if (!respuestaPedido.ok) {
                throw new Error(await respuestaPedido.text());
            }

            const transaccionDTO = {
                idUser: usuarioId,
                fechaVenta: new Date().toISOString().slice(0, 10),
                precioTransaccion: totalConEnvio,
                estado: "Completo",
                metodoPago,
            };

            const respuestaTransaccion = await fetch("http://localhost:8080/api_int_2024/transacciones/store", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(transaccionDTO),
            });

            if (respuestaTransaccion.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Pedido Completo",
                    text: "Pedido y transacción realizados con éxito",
                });
                onPedidoRealizado();
            } else {
                throw new Error("Error al guardar la transacción.");
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `Error al realizar el pedido: ${error.message}`,
            });
        }
    };

    const mostrarResumenPedido = () => {
        setMostrarResumen(true);
    };

    const cancelarResumen = () => {
        setMostrarResumen(false);
    };

    return (
        <div className="payment-section">
            {/* Mostrar resumen del pedido */}
            {mostrarResumen ? (
                <ResumenPedido 
                    itemsCarrito={itemsCarrito} 
                    direccion={direccion} 
                    costoEnvio={costoEnvio} 
                    totalConEnvio={totalConEnvio} 
                    onConfirmarPedido={manejarPedido} 
                    onCancelar={cancelarResumen} 
                />
            ) : (
                <>
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
                                    <i className="fas fa-key"></i> {/* Aquí puedes elegir el icono que prefieras */}
                                    <input
                                        type="text"
                                        value={codigoVerificacion}
                                        onChange={(e) => setCodigoVerificacion(e.target.value)}
                                        placeholder="Ingresa el código de verificación"
                                        maxLength="6"
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
                    {/* Resumen del Pedido */}
                    <div className="payment-summary">
                        <p>Total: S/{total.toFixed(2)}</p>
                        <p>Costo de Envío: S/{costoEnvio.toFixed(2)}</p>
                        <p>Total con Envío: S/{(total + costoEnvio).toFixed(2)}</p>
                    </div>
                    {/* Botón para ver el resumen del pedido */}
                    <button onClick={mostrarResumenPedido} className="button-resumen">
                        Ver Resumen del Pedido
                    </button>
                </>
            )}
        </div>
    );
    
}

export default RealizarPedido;

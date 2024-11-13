import { useEffect, useState } from "react";


function Productos() {
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [ascendente, setAscendente] = useState(1);
    const [columnaAnterior, setColumnaAnterior] = useState('nombre');
    const [textoBuscar, setTextoBuscar] = useState('');
    const [pagina, setPagina] = useState(0);
    const [filasPagina] = useState(20);
    const [numPaginas, setNumPaginas] = useState(0);

    useEffect(() => {
        leerProductos();
    }, []);

    const leerProductos = async () => {
        // Cambia la URL de la API según tu configuración
        const res = await fetch('/api/productos');
        const data = await res.json();
        setProductos(data);
        setProductosFiltrados(data);
        setCargando(false);
        setNumPaginas(Math.ceil(data.length / filasPagina));
    };

    const dibujarTabla = () => {
        return (
            <table className="table">
                <thead>
                <tr>
                    <th columna="nombre" onClick={(event) => seleccionarColumna(event)}>
                        Nombre
                    </th>
                    <th columna="precio" onClick={(event) => seleccionarColumna(event)}>
                        Precio
                    </th>
                    {/* Agrega más encabezados según las propiedades proporcionadas */}
                    <th columna="imagen" onClick={(event) => seleccionarColumna(event)}>
                        Imagen
                    </th>
                    <th columna="descripcionBreve" onClick={(event) => seleccionarColumna(event)}>
                        Descripción Breve
                    </th>
                    <th columna="nuevoOUsado" onClick={(event) => seleccionarColumna(event)}>
                        Nuevo o Usado
                    </th>
                    <th columna="categorias" onClick={(event) => seleccionarColumna(event)}>
                        Categorías
                    </th>
                </tr>
                </thead>
                <tbody>
                {productosFiltrados
                    .slice(pagina * filasPagina, (pagina + 1) * filasPagina)
                    .map((producto) => (
                        <tr key={producto.id}>
                            <td>{producto.nombre}</td>
                            <td>{producto.precio}</td>
                            {/* Agrega más celdas según las propiedades proporcionadas */}
                            <td>{producto.imagen}</td>
                            <td>{producto.descripcionBreve}</td>
                            <td>{producto.nuevoOUsado}</td>
                            <td>{producto.categorias.join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const seleccionarColumna = (event) => {
        const columnaSeleccionada = event.target.getAttribute('columna');
        let ascendentex = ascendente;
        if (columnaAnterior === columnaSeleccionada) {
            ascendentex = -ascendentex;
        } else {
            ascendentex = 1;
        }
        setAscendente(ascendentex);
        setColumnaAnterior(columnaSeleccionada);

        setProductosFiltrados(
            [...productosFiltrados].sort((a, b) => {
                const valorA = a[columnaSeleccionada];
                const valorB = b[columnaSeleccionada];
                if (valorA < valorB) {
                    return -ascendentex;
                }
                if (valorA > valorB) {
                    return ascendentex;
                }
                return 0;
            })
        );
    };

    const buscarTexto = (event) => {
        const textoB = event.target.value;
        setTextoBuscar(textoB);
        const resultado = productos.filter((producto) =>
            producto[columnaAnterior].toUpperCase().includes(textoB.toUpperCase())
        );
        setProductosFiltrados(resultado);
    };

    const avanzar = () => {
        if (pagina < numPaginas - 1) {
            setPagina(pagina + 1);
        }
    };

    const retroceder = () => {
        if (pagina > 0) {
            setPagina(pagina - 1);
        }
    };

    const generarPaginacion = () => {
        const items = [];
        for (let i = 0; i < numPaginas; i++) {
            items.push(
                <li
                    key={i}
                    className={`page-item ${pagina === i ? 'active' : ''}`}
                    aria-current={pagina === i ? 'page' : null}
                >
                    <button className="page-link" onClick={() => setPagina(i)}>
                        {i + 1}
                    </button>
                </li>
            );
        }
        return items;
    };

    return (

        <div>
            <section className="area_lps_w pt-5">
            <div className="boxtext_lps_beneficios">
                <h1 className="title_lps_beneficios pt-4 text-center" style={{ fontSize: '2.5rem' }}>
                    IMPULSA TU NEGOCIO ONLINE
                </h1>
                <p className="text_lps_beneficios text-center mb-5">
                Descubre las ventajas de vender con el{' '}
                <span className="text_b_lps_beneficios mb-3">E-commerce de Tec Trade</span>
                </p>
            </div>
            <div className="container">
                <div className="row">
                {/* Sin comisión */}
                <div className="col-xl-3 col-lg-3 col-sm-6">
                    <div className="bs-img-square box_workshop_expositores text-center text-lg-left">
                    <picture>
                        <source
                        srcSet="https://dojiw2m9tvv09.cloudfront.net/16738/4/S_TARJETA-CERO-COMISION-POR-VENTA.png?387&amp;time=1702869603"
                        media="(min-width: 1201px)"
                        />
                        <source
                        srcSet="https://dojiw2m9tvv09.cloudfront.net/16738/4/S_TARJETA-CERO-COMISION-POR-VENTA.png?387&amp;time=1702869603"
                        media="(min-width: 800px)"
                        />
                        <source
                        srcSet="https://dojiw2m9tvv09.cloudfront.net/16738/4/S_TARJETA-CERO-COMISION-POR-VENTA.png?387&amp;time=1702869603"
                        media="(min-width:400px)"
                        />
                        <source
                        srcSet="https://dojiw2m9tvv09.cloudfront.net/16738/4/S_TARJETA-CERO-COMISION-POR-VENTA.png?387&amp;time=1702869603"
                        media="(min-width:0px)"
                        />
                        <img
                        loading="lazy"
                        src="https://dojiw2m9tvv09.cloudfront.net/16738/4/S_TARJETA-CERO-COMISION-POR-VENTA.png?387&amp;time=1702869603"
                        alt="Sin comisión por venta Tec Trade"
                        />
                    </picture>
                    <div className="boxtext_lps_beneficios">
                        <h5 className="box_title_lps_beneficios text-lg-left text-left mt-4 ml-lg-3">
                        Sin comisión por <br />venta Tec Trade
                        </h5>
                        <p className="box_text_lps_beneficios text-lg-left text-left ml-lg-3 mb-5">
                        Vende sin preocupaciones. Con nuestro sistema Tec Trade no existen costos ocultos,
                        precios transparentes y fijos.
                        </p>
                    </div>
                    </div>
                </div>
                {/* Vende en Redes Sociales */}
                <div className="col-xl-3 col-lg-3 col-sm-6">
                    <div className="bs-img-square box_workshop_expositores text-center text-lg-left">
                    <picture>
                        {/* Contenido de la etiqueta <source> */}
                        <img
                        loading="lazy"
                        src="https://dojiw2m9tvv09.cloudfront.net/16738/4/S_TARJETA-VENDEPORFACENOOKEINSTAGRAM.png?387&amp;time=1702869603"
                        alt="Vende en otros canales Tec Trade"
                        />
                    </picture>
                    <div className="boxtext_lps_beneficios">
                        <h5 className="box_title_lps_beneficios text-lg-left text-left mt-4 ml-lg-3">
                        Vende en otros<br />canales Tec Trade{' '}
                        </h5>
                        <p className="box_text_lps_beneficios text-lg-left text-left ml-lg-3 mb-5">
                        Conecta y sincroniza tus ventas de Mercado Libre y/o Google Shopping. Vende donde
                        están navegando tus clientes.
                        </p>
                    </div>
                    </div>
                </div>
                {/* Fideliza a tus clientes */}
                <div className="col-xl-3 col-lg-3 col-sm-6">
                    <div className="bs-img-square box_workshop_expositores text-center text-lg-left">
                    <picture>
                        <source
                        srcSet="https://dojiw2m9tvv09.cloudfront.net/16738/4/S_TARJETA-DESCUENTOS-Y-PROMOCIONES.png?387&amp;time=1702869603"
                        media="(min-width: 1201px)"
                        />
                        <source
                        srcSet="https://dojiw2m9tvv09.cloudfront.net/16738/4/S_TARJETA-DESCUENTOS-Y-PROMOCIONES.png?387&amp;time=1702869603"
                        media="(min-width: 800px)"
                        />
                        <source
                        srcSet="https://dojiw2m9tvv09.cloudfront.net/16738/4/S_TARJETA-DESCUENTOS-Y-PROMOCIONES.png?387&amp;time=1702869603"
                        media="(min-width:400px)"
                        />
                        <source
                        srcSet="https://dojiw2m9tvv09.cloudfront.net/16738/4/S_TARJETA-DESCUENTOS-Y-PROMOCIONES.png?387&amp;time=1702869603"
                        media="(min-width:0px)"
                        />
                        <img
                        loading="lazy"
                        src="https://dojiw2m9tvv09.cloudfront.net/16738/4/S_TARJETA-DESCUENTOS-Y-PROMOCIONES.png?387&amp;time=1702869603"
                        alt="Genera Cupones de descuento Tec Trade"
                        />
                    </picture>
                    <div className="boxtext_lps_beneficios">
                        <h5 className="box_title_lps_beneficios text-lg-left text-left mt-4 ml-lg-3">
                        Genera Cupones de <br />descuento Tec Trade
                        </h5>
                        <p className="box_text_lps_beneficios text-lg-left text-left ml-lg-3 mb-5">
                        Con Tec Trade es muy fácil crear cupones de descuento y promociones. Utiliza
                        herramientas de marketing y recupera tus carros abandonados.
                        </p>
                    </div>
                    </div>
                </div>
                {/* Controla tus envíos */}
                <div className="col-xl-3 col-lg-3 col-sm-6">
                    <div className="bs-img-square box_workshop_expositores text-center text-lg-left">
                    <picture>
                        <source
                        srcSet="https://dojiw2m9tvv09.cloudfront.net/16738/4/S_TARJETA-DESPACHOS-SIN-CONTRATIEMPOS-.png?387&amp;time=1702869603"
                        media="(min-width: 1201px)"
                        />
                        <source
                        srcSet="https://dojiw2m9tvv09.cloudfront.net/16738/4/S_TARJETA-DESPACHOS-SIN-CONTRATIEMPOS-.png?387&amp;time=1702869603"
                        media="(min-width: 800px)"
                        />
                        <source
                        srcSet="https://dojiw2m9tvv09.cloudfront.net/16738/4/S_TARJETA-DESPACHOS-SIN-CONTRATIEMPOS-.png?387&amp;time=1702869603"
                        media="(min-width:400px)"
                        />
                        <source
                        srcSet="https://dojiw2m9tvv09.cloudfront.net/16738/4/S_TARJETA-DESPACHOS-SIN-CONTRATIEMPOS-.png?387&amp;time=1702869603"
                        media="(min-width:0px)"
                        />
                        <img
                        loading="lazy"
                        src="https://dojiw2m9tvv09.cloudfront.net/16738/4/S_TARJETA-DESPACHOS-SIN-CONTRATIEMPOS-.png?387&amp;time=1702869603"
                        alt="Controla todos tus envíos en Tec Trade"
                        />
                    </picture>
                    <div className="boxtext_lps_beneficios">
                        <h5 className="box_title_lps_beneficios text-lg-left text-left mt-4 ml-lg-3">
                        Controla todos tus <br />envíos en Tec Trade
                        </h5>
                        <p className="box_text_lps_beneficios text-lg-left text-left ml-lg-3 mb-5">
                        Conéctate con los servidores de envíos del país. Envía tus productos y recibe el
                        número de seguimiento en Tec Trade.
                        </p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>
            <section className="padded">
                <div className="container">
                    <h2>Productos</h2>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={textoBuscar}
                            onChange={buscarTexto}
                            className="form-control"
                            placeholder="Nombre del producto a buscar"
                        />
                    </div>
                    {cargando ? (
                        <div className="lds-roller">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    ) : (
                        dibujarTabla()
                    )}
                    <nav aria-label="...">
                        <ul className="pagination">
                            <li className={`page-item ${pagina === 0 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={retroceder}>
                                    Previous
                                </button>
                            </li>
                            {generarPaginacion()}
                            <li className={`page-item ${pagina === numPaginas - 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={avanzar}>
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </section>
        </div>
        
    );
}

export default Productos;




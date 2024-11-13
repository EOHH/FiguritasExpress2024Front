// CarruselProductos.js
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './CarruselProductos.css';

// Importa las imágenes
import img1 from '../../assets/images/products/1.jpg';
import img2 from '../../assets/images/products/2.jpg';
import img3 from '../../assets/images/products/3.jpg';
import img4 from '../../assets/images/products/4.jpg';
import img5 from '../../assets/images/products/5.jpg';
import img6 from '../../assets/images/products/6.jpg';
import img7 from '../../assets/images/products/7.jpg';
import img8 from '../../assets/images/products/8.jpg';
import img9 from '../../assets/images/products/9.jpg';
import img10 from '../../assets/images/products/10.jpg';
import img11 from '../../assets/images/products/11.jpg';
import img12 from '../../assets/images/products/12.jpg';
import img13 from '../../assets/images/products/13.jpg';
import img14 from '../../assets/images/products/14.jpg';
import img15 from '../../assets/images/products/15.jpg';
import img16 from '../../assets/images/products/16.jpg';
import img17 from '../../assets/images/products/17.jpg';
import img18 from '../../assets/images/products/18.jpg';
import img19 from '../../assets/images/products/19.jpg';
import img20 from '../../assets/images/products/20.jpg';
import img21 from '../../assets/images/products/21.jpg';
import img22 from '../../assets/images/products/22.jpg';
import img23 from '../../assets/images/products/23.jpg';
import img24 from '../../assets/images/products/24.jpg';
import img25 from '../../assets/images/products/25.jpg';
import img26 from '../../assets/images/products/26.jpg';
import img27 from '../../assets/images/products/27.jpg';
import img28 from '../../assets/images/products/28.jpg';
import img29 from '../../assets/images/products/29.jpg';
import img30 from '../../assets/images/products/30.jpg';
import img31 from '../../assets/images/products/31.jpg';
import img32 from '../../assets/images/products/32.jpg';
import img33 from '../../assets/images/products/33.jpg';
import img34 from '../../assets/images/products/34.jpg';
import img35 from '../../assets/images/products/35.jpg';
import img36 from '../../assets/images/products/36.jpg';
import img37 from '../../assets/images/products/37.jpg';
import img38 from '../../assets/images/products/38.jpg';
import img39 from '../../assets/images/products/39.jpg';
import img40 from '../../assets/images/products/40.jpg';
import img41 from '../../assets/images/products/41.jpg';
import img42 from '../../assets/images/products/42.jpg';
import img43 from '../../assets/images/products/43.jpg';
import img44 from '../../assets/images/products/44.jpg';
import img45 from '../../assets/images/products/45.jpg';
import img46 from '../../assets/images/products/46.jpg';
import img47 from '../../assets/images/products/47.jpg';
import img48 from '../../assets/images/products/48.jpg';
import img49 from '../../assets/images/products/49.jpg';
import img50 from '../../assets/images/products/50.jpg';
import img51 from '../../assets/images/products/51.jpg';
import img52 from '../../assets/images/products/52.jpg';
import img53 from '../../assets/images/products/53.jpg';
import img54 from '../../assets/images/products/54.jpg';
import img55 from '../../assets/images/products/55.jpg';
import img56 from '../../assets/images/products/56.jpg';
import img57 from '../../assets/images/products/57.jpg';
import img58 from '../../assets/images/products/58.jpg';
import img59 from '../../assets/images/products/59.jpg';
import img60 from '../../assets/images/products/60.jpg';

const imagenes = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, 
  img11, img12, img13, img14, img15, img16, img17, img18, img19, img20, 
  img21, img22, img23, img24, img25, img26, img27, img28, img29, img30, 
  img31, img32, img33, img34, img35, img36, img37, img38, img39, img40, 
  img41, img42, img43, img44, img45, img46, img47, img48, img49, img50, 
  img51, img52, img53, img54, img55, img56, img57, img58, img59, img60
];

// Configura tu URL de la API
const API_URL = "http://localhost:8080/api_int_2024/productos/getAll";

function CarruselProductos() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        fetch(API_URL)
            .then((response) => response.json())
            .then((data) => setProductos(data))
            .catch((error) => console.error("Error al cargar productos:", error));
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
        nextArrow: <button className="slick-next">→</button>,
        prevArrow: <button className="slick-prev">←</button>,
    };

    return (
        <div className="carrusel-productos-container">
            <h2 className="section-title">Novedades</h2>
            <Slider {...settings}>
                {productos.slice(0, 5).map((producto) => (
                    <div className="producto-card" key={producto.idProducto}>
                        <div className="card">
                            <div className="image-content">
                                <img
                                    src={imagenes[producto.idProducto - 1]} // Ajuste para seleccionar la imagen correcta
                                    alt={producto.nombre}
                                    className="card-img-top-product"
                                />
                                {producto.enOferta && (
                                    <span className="oferta-badge">EN OFERTA</span>
                                )}
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{producto.nombre}</h5>
                                <p className="card-text">
                                    S/ {producto.precio.toFixed(2)}
                                    <i
                                        className="bi bi-basket-fill btnCarrito"
                                        title="Añadir al carrito"
                                    ></i>
                                </p>
                                <span className="stock-status">
                                    {producto.stock > 0 ? "En stock" : "Agotado"}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default CarruselProductos;

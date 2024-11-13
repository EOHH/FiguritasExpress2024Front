import React from 'react';
import { Link } from 'react-router-dom';
import './Previa.css';
import imgMasReciente1 from '../../assets/images/imgMasReciente1.png';
import imgMasReciente2 from '../../assets/images/imgMasReciente2.png';
import imgMasReciente3 from '../../assets/images/imgMasReciente3.png';
import imgMasReciente4 from '../../assets/images/imgMasReciente4.png';
import imgMasVendido1 from '../../assets/images/imgMasVendido1.png';
import imgMasVendido2 from '../../assets/images/imgMasVendido2.png';
import imgMasVendido3 from '../../assets/images/imgMasVendido3.png';
import imgMasVendido4 from '../../assets/images/imgMasVendido4.png';

const Previa = () => {
    return (
        <div className="previa-container">
            <div className="section">
                <h2>Lo más vendido</h2>
                <div className="products-container">
                    <div className="product">
                        <img src={imgMasVendido1} alt="Imagen 1" />
                        <p>SKIBIDI TOILET</p>
                        <Link to="/tiendita">
                            <button>Ver más</button>
                        </Link>
                    </div>
                    <div className="product">
                        <img src={imgMasVendido2} alt="Imagen 2" />
                        <p>FIFA 365</p>
                        <Link to="/tiendita">
                            <button>Ver más</button>
                        </Link>
                    </div>
                    <div className="product">
                        <img src={imgMasVendido3} alt="Imagen 3" />
                        <p>NARUTO</p>
                        <Link to="/tiendita">
                            <button>Ver más</button>
                        </Link>
                    </div>
                    <div className="product">
                        <img src={imgMasVendido4} alt="Imagen 4" />
                        <p>POKEMON</p>
                        <Link to="/tiendita">
                            <button>Ver más</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="section1">
                <h2>Algunas colecciones recientes</h2>
                <div className="products-container">
                    <div className="product">
                        <img src={imgMasReciente1} alt="Imagen 1" />
                        <p>Dragón Ball</p>
                        <Link to="/tiendita">
                            <button>Ver más</button>
                        </Link>
                    </div>
                    <div className="product">
                        <img src={imgMasReciente2} alt="Imagen 2" />
                        <p>Yu-Gi-Oh</p>
                        <Link to="/tiendita">
                            <button>Ver más</button>
                        </Link>
                    </div>
                    <div className="product">
                        <img src={imgMasReciente3} alt="Imagen 3" />
                        <p>Pokemon</p>
                        <Link to="/tiendita">
                            <button>Ver más</button>
                        </Link>
                    </div>
                    <div className="product">
                        <img src={imgMasReciente4} alt="Imagen 4" />
                        <p>Naruto</p>
                        <Link to="/tiendita">
                            <button>Ver más</button>
                        </Link>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Previa;

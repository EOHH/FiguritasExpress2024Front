import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/images/imglogo.png';

import './MainFooter.css';

function MainFooter() {
  return (
    <footer id="main-footer">
      <div className="container-fluid bg-dark text-white mt-5 py-5 px-sm-3 px-md-5">
        <div className="row pt-5 d-flex">
          <div className="col-lg-4 col-md-12 mb-5 d-flex flex-column">
            <img src={logoImage} alt="Logo" className="logo img-fluid mb-3" style={{ width: '250px', height: 'auto' }} />
            <p className="m-0">
              Mejora tu baraja, compra ahora!
            </p>
          </div>
          <div className="col-lg-8 col-md-12">
            <div className="row">
              {/* Columna 1 */}
              <div className="col-md-4 mb-5 d-flex flex-column">
                <h5 className="text-primary mb-4">Nos Ubicamos</h5>
                <p><i className="fa fa-map-marker-alt mr-2"></i> San Martin de Porres</p>
                <p><i className="fa fa-phone-alt mr-2"></i> +51 75991831</p>
                <p><i className="fa fa-envelope mr-2"></i> figuritasexpress@gmail.com</p>
                <div className="d-flex justify-content-start mt-4">
                  {/* Redes Sociales */}
                  <a className="btn btn-outline-light rounded-circle text-center mr-2 px-0" href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a className="btn btn-outline-light rounded-circle text-center mr-2 px-0" href="#">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a className="btn btn-outline-light rounded-circle text-center mr-2 px-0" href="#">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a className="btn btn-outline-light rounded-circle text-center mr-2 px-0" href="#">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
              {/* Columna 2 */}
              <div className="col-md-4 mb-5 d-flex flex-column">
                <h5 className="text-primary mb-4">Conoce más</h5>
                <div className="d-flex flex-column justify-content-start align-items-start">
                  {/* Enlaces */}
                  <Link to="/" className="text-white mb-2"><i className="fa fa-angle-right mr-2"></i>Inicio</Link>
                  <Link to="/nosotros" className="text-white mb-2"><i className="fa fa-angle-right mr-2"></i>Nosotros</Link>
                  <Link to="/compra" className="text-white mb-2"><i className="fa fa-angle-right mr-2"></i>Compra</Link>
                  <Link to="/productos" className="text-white mb-2"><i className="fa fa-angle-right mr-2"></i>Productos</Link>
                  <Link to="/consultas" className="text-white mb-2"><i className="fa fa-angle-right mr-2"></i>Consultas</Link>
                </div>
              </div>
              {/* Columna 3 */}
              <div className="col-md-4 mb-5 d-flex flex-column">
                <h5 className="text-primary mb-4">Noticias</h5>
                <form action="" className="text-left">
                  {/* Formulario de suscripción */}
                  <div className="form-group">
                    <input type="text" className="form-control border-0" placeholder="Tu nombre" required />
                  </div>
                  <div className="form-group">
                    <input type="email" className="form-control border-0" placeholder="Tu correo" required />
                  </div>
                  <div>
                    <button className="btn btn-lg btn-primary btn-block border-0" type="submit">Enviar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer End */}

      {/* Segunda sección del Footer */}
      <div className="container-fluid text-white py-4 px-sm-3 px-md-5" style={{ background: '#111111' }}>
        <div className="row d-flex justify-content-center">
          <div className="col-md-6 text-center text-md-left mb-3 mb-md-0">
            <p className="m-0 text-white">
              &copy; <a className="text-white font-weight-bold" href="/">FiguritasExpress</a>. Todos los derechos reservados. Designed by Tecsup 2023
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default MainFooter;

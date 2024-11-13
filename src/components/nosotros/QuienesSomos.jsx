import React from 'react';
import './QuienesSomos.css';
import developer1 from '../../assets/images/edilsonhuaman.jpg';
import developer2 from '../../assets/images/erickadominguez.jpg';
import mision from '../../assets/images/nosotros1.jpg';
import mision2 from '../../assets/images/nosotros2.jpg';

const QuienesSomos = () => {
  return (
    <>
      {/* SECCIÓN DE QUIENES SOMOS */}
      <div className="quienes-container quienes-py-5">
        <div className="row quienes-py-5">
          <div className="col-lg-5">
            <div className="row px-3">
              <div className="col-12 p-0">
                <img className="img-fluid w-100" src={mision} alt="Misión" />
              </div>
            </div>
          </div>
          <div className="col-lg-7 pb-5 pb-lg-0 px-3 px-lg-5">
            <h2 className="quienes-text-title display-4 m-0">
              Nuestra Misión
            </h2>
            <h5 className="quienes-text-muted mb-3">
              En Figuritas Express, nos dedicamos a brindar la mejor experiencia en la compra y venta de figuritas de anime. Nuestro objetivo es conectar a los coleccionistas con piezas únicas y auténticas, fomentando una comunidad apasionada y sostenible. Creemos en el valor de cada figura y en el impacto positivo que puede tener el coleccionismo responsable.
            </h5>
            <ul className="list-inline">
              <li>
                <h5>
                  <i className="fa fa-check-double quienes-fa-check-double mr-3"></i>Promoción del coleccionismo responsable
                </h5>
              </li>
              <li>
                <h5>
                  <i className="fa fa-check-double quienes-fa-check-double mr-3"></i>Calidad y autenticidad garantizadas
                </h5>
              </li>
              <li>
                <h5>
                  <i className="fa fa-check-double quienes-fa-check-double mr-3"></i>Construcción de una comunidad unida
                </h5>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* SECCIÓN DE QUIENES SOMOS */}

      {/* SECCIÓN DE INFORMACIÓN */}
      <div className="container-fluid quienes-bg-light">
        <div className="quienes-container">
          <div className="row align-items-center">
            <div className="col-lg-7 py-5 py-lg-0 px-3 px-lg-5">
              <h2 className="quienes-text-title display-4 m-0">
                ¿Por qué nosotros? ¿Somos confiables?
              </h2>
              <h5 className="quienes-text-muted mb-4">
                En Figuritas Express, creemos en el poder del coleccionismo para unir a las personas y enriquecer sus vidas. Nos esforzamos por ofrecer figuritas de anime de la más alta calidad, con un enfoque en la autenticidad y la sostenibilidad. Nuestro equipo está dedicado a proporcionar un servicio excepcional y a construir una plataforma en la que los coleccionistas puedan confiar. Si buscas una experiencia de coleccionismo confiable y apasionante, ¡Figuritas Express es tu mejor opción!
              </h5>
              <div className="row py-2">
                {/* ... Otras partes de tu código */}
              </div>
            </div>
            <div className="col-lg-5">
              <div className="row px-3">
                <div className="col-12 p-0">
                  <img className="img-fluid w-100" src={mision2} alt="Tecnología y Comercio" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* SECCIÓN DE INFORMACIÓN */}

      {/* SECCIÓN DEL TEAM */}
      <div className="team-section">
        <h2 className="team-title">Conozca al equipo</h2>
        <h3 className="team-subtitle">Nuestros profesionales</h3>
        <div className="team-cards">
          <div className="team-card">
            <img className="team-img" src={developer1} alt="Edilson Huaman" />
            <h5 className="team-name">Edilson Huaman</h5>
            <p className="team-role">Founder & CEO</p>
            <p className="team-description">Descripción breve sobre Edilson y su papel en la empresa.</p>
            <div className="team-social-icons">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://web.facebook.com/edilson.huamanhuanca" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.linkedin.com/in/edilson-oswaldo-huaman-huanca-78b42a298/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://www.instagram.com/edilson_pzk/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div className="team-card">
            <img className="team-img" src={developer2} alt="Ericka Dominguez" />
            <h5 className="team-name">Ericka Dominguez</h5>
            <p className="team-role">Founder & CEO</p>
            <p className="team-description">Descripción breve sobre Ericka y su papel en la empresa.</p>
            <div className="team-social-icons">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.facebook.com/profile.php?id=100085070863056&locale=es_LA" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://www.instagram.com/ericka_dominguez_cordova/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* SECCIÓN DEL TEAM */}
    </>
  );
};

export default QuienesSomos;

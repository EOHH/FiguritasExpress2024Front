// Objetivos.jsx
import React from 'react';
import './Objetivos.css';
import imagen1 from '../../assets/images/objetivos1.jpg';
import imagen2 from '../../assets/images/objetivos2.jpg';
import imagen3 from '../../assets/images/objetivos3.jpg';
import imagen4 from '../../assets/images/objetivos4.jpg'; // Añadir nuevas imágenes
import imagen5 from '../../assets/images/objetivos5.jpg';
import imagen6 from '../../assets/images/objetivos6.jpg';

function Objetivos() {
  return (
    <section id="objetivos" className="padded">
      <div className="container">
        <h2>NUESTROS OBJETIVOS</h2>
        <div className="objetivo-container">
          <div className="objetivo">
            <img src={imagen1} alt="Objetivo 1" className="objetivo-imagen" />
            <div className="objetivo-texto">
              <h3>Promover la colección responsable</h3>
              <p>
                Fomentamos la colección responsable de figuritas de anime al
                ofrecer una plataforma donde puedes comprar y vender figuras
                pre-amadas. Al hacerlo, ayudamos a reducir el impacto ambiental.
              </p>
            </div>
          </div>
          <div className="objetivo">
            <img src={imagen2} alt="Objetivo 2" className="objetivo-imagen" />
            <div className="objetivo-texto">
              <h3>Ofrecer variedad y calidad</h3>
              <p>
                Nos esforzamos por proporcionar a nuestros clientes una
                amplia gama de figuritas de anime, tanto nuevas como usadas,
                de la más alta calidad.
              </p>
            </div>
          </div>
          <div className="objetivo">
            <img src={imagen3} alt="Objetivo 3" className="objetivo-imagen" />
            <div className="objetivo-texto">
              <h3>Facilitar una experiencia única</h3>
              <p>
                Nuestra meta principal es crear una plataforma que ofrezca a
                los usuarios una experiencia de colección de figuritas de anime
                única y excepcionalmente agradable.
              </p>
            </div>
          </div>
          <div className="objetivo">
            <img src={imagen4} alt="Objetivo 4" className="objetivo-imagen" />
            <div className="objetivo-texto">
              <h3>Fomentar la comunidad</h3>
              <p>
                Nos esforzamos por crear una comunidad unida de coleccionistas,
                ofreciendo un espacio donde puedan compartir su pasión y conocimiento.
              </p>
            </div>
          </div>
          <div className="objetivo">
            <img src={imagen5} alt="Objetivo 5" className="objetivo-imagen" />
            <div className="objetivo-texto">
              <h3>Garantizar la autenticidad</h3>
              <p>
                Garantizamos que todas las figuritas de anime en nuestra plataforma
                son auténticas, proporcionando confianza y seguridad en cada compra.
              </p>
            </div>
          </div>
          <div className="objetivo">
            <img src={imagen6} alt="Objetivo 6" className="objetivo-imagen" />
            <div className="objetivo-texto">
              <h3>Apoyar artistas y creadores</h3>
              <p>
                Apoyamos a artistas y creadores independientes, ofreciendo una
                plataforma para que puedan mostrar y vender sus figuritas únicas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Objetivos;

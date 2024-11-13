import { useEffect } from 'react';
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Facebook } from 'lucide-react';
import './Consultas.css';

const Consultas = () => {

  useEffect(() => {
    // Desplaza la página hacia la parte superior al cargar el componente
    window.scrollTo(0, 0);
  }, []);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [showTooltip, setShowTooltip] = useState(false);
  const [showMarkerTooltip, setShowMarkerTooltip] = useState(false); // Estado para el tooltip del marcador

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Aquí puedes agregar lógica para enviar el formulario
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Centro del mapa (coordenadas del Mercado Inkamay)
  const mapCenter = {
    lat: -11.9639929,
    lng: -77.1024388
  };

  return (
    <div className="contact-main-container">
      <h1 className="contact-title">ENVÍANOS SU CONSULTA</h1>
      
      <div className="contact-content">
        <div className="contact-info-section">
          <div className="info-item">
            <MapPin className="info-icon" />
            <span>2VPX+F5 San Martín de Porres</span>
          </div>
          
          <div className="info-item phone-group">
            <Phone className="info-icon" />
            <div className="phone-numbers">
              <span>001-234-5678</span>
              <span>001-987-7654</span>
            </div>
          </div>
          
          <div className="info-item">
            <Mail className="info-icon" />
            <span>figuritasexpress@gmail.com</span>
          </div>
          
          <div className="info-item">
            <Facebook className="info-icon" />
            <span>@figuritas_express</span>
          </div>
          
          <div 
            className="map-container"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <iframe
                title="Mercado Inkamay"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12646.019949776437!2d-77.1024388!3d-11.9639929!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105ce6e64e51b9b%3A0x1284b25a0bea53a6!2sMercado+Inkamay!5e0!3m2!1ses-419!2spe!4v1631540000000!5m2!1ses-419!2spe"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
            ></iframe>
            {showTooltip && (
              <div className="tooltip">
                Figuritas Express
              </div>
            )}
            <div 
              className="marker" 
              onMouseEnter={() => setShowMarkerTooltip(true)} // Mostrar tooltip del marcador
              onMouseLeave={() => setShowMarkerTooltip(false)} // Ocultar tooltip del marcador
              style={{
                top: '50%', // Ajusta la posición vertical del marcador
                left: '50%', // Ajusta la posición horizontal del marcador
                transform: 'translate(-50%, -100%)' // Centra el marcador en su posición
              }}
            ></div>
            {showMarkerTooltip && (
              <div className="marker-tooltip">
                Figuritas Express
              </div>
            )}
          </div>
        </div>

        <div className="form-section">
          <form onSubmit={handleSubmit} className="contact-form">
            <input
              type="text"
              name="name"
              placeholder="Introduzca su nombre"
              value={formData.name}
              onChange={handleChange}
              required
            />
            
            <input
              type="email"
              name="email"
              placeholder="Introduzca una dirección de correo electrónico válida"
              value={formData.email}
              onChange={handleChange}
              required
            />
            
            <textarea
              name="message"
              placeholder="Introduce tu consulta"
              value={formData.message}
              onChange={handleChange}
              required
            />
            
            <button className="btn btn-primary recolor" type="submit">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Consultas;

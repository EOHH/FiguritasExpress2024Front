import React, { useState } from 'react';
import './Suscribete.css';

const Suscribete = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos al servidor
    console.log('Nombre:', nombre);
    console.log('Correo electrónico:', correo);
  };

  return (
    
    <div className="padded">
      <div className="suscribete">
        <h2>Suscríbete si quieres ganar recompensas y recibir novedades de Figuritas Express</h2>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre completo</label>
              <input
                type="text"
                id="nombre"
                placeholder="Ingresa tu nombre completo"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="correo">Correo electrónico</label>
              <input
                type="email"
                id="correo"
                placeholder="Ingresa tu correo electrónico"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </div>
            <button className="btn btn-primary recolor" type="submit">Enviar</button>
          </form>
        </div>
      </div>
    </div>

  );
};

export default Suscribete;
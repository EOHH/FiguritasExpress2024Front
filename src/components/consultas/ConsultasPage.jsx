import React, { useEffect } from 'react';
import Consultas from './Consultas';
import PreguntasFrecuentes from './PreguntasFrecuentes';

function ConsultasPage() {
  
  useEffect(() => {
    // Desplaza la página hacia la parte superior al cargar el componente
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Consultas />
      <PreguntasFrecuentes />
    </>
  );
}

export default ConsultasPage;

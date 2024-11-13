import React from 'react';
import { useEffect } from 'react';
import Noticias from './Noticias';
import EmpresasAliadas from './EmpresasAliadas';
import Testimonials from './Testimonials';

function NoticiasPage() {

  useEffect(() => {
    // Desplaza la página hacia la parte superior al cargar el componente
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <Noticias />
      <Testimonials />
      <EmpresasAliadas />
    </>
  );
}

export default NoticiasPage;

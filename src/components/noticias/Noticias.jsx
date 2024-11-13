import React from 'react';
import './Noticias.css';

function Noticias() {
  const noticias = [
    {
      id: 1,
      imagen: 'https://www.japonalternativo.com/wp-content/uploads/2020/04/mejores-tiendas-para-comprar-manga-en-japon.jpg',
      titulo: 'El auge del comercio online de figuritas y cartas de anime',
      contenido: 'El mercado de figuritas y cartas de anime en línea está en pleno crecimiento, ofreciendo una gran variedad de productos y opciones para los coleccionistas. Cada vez más personas están descubriendo este fascinante mundo, lo que impulsa la demanda y la oferta en plataformas digitales.',
    },
    {
      id: 2,
      imagen: 'https://ticoofertas.shop/cdn/shop/articles/publicidad_tico_ofertas_e1116849-1433-4237-b64d-9df93c2877b4.png?v=1726009808&width=533',
      titulo: 'Consejos para comprar figuritas y cartas de anime en línea',
      contenido: 'La compra de figuritas y cartas de anime en línea puede ser una experiencia emocionante. Sin embargo, es importante tener en cuenta algunos consejos para asegurarte de hacer compras seguras y satisfactorias. Investiga siempre al vendedor y verifica la autenticidad de los productos.',
    },
    {
      id: 3,
      imagen: 'https://i5.walmartimages.com.mx/mg/gm/3pp/asr/ae251a0f-00dc-46a7-9bc5-e5c0f4444d27.e62ab6118521d2598bac1a45f14f70c4.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
      titulo: 'El impacto positivo del comercio online de figuritas y cartas de anime',
      contenido: 'El comercio online de figuritas y cartas de anime no solo es beneficioso para los coleccionistas, sino que también ha permitido a pequeños emprendedores y tiendas locales llegar a un público más amplio. Esto ha fomentado un ambiente de comunidad y colaboración entre los aficionados.',
    },
    {
      id: 4,
      imagen: 'https://thumbs.dreamstime.com/b/colecci%C3%B3n-de-figuras-anime-manga-en-pantalla-para-coleccionistas-italia-marzo-campo-enfoque-estrecho-272467965.jpg', // Reemplaza con la URL real
      titulo: 'Tendencias actuales en coleccionismo de cartas de anime',
      contenido: 'Las cartas de anime están ganando popularidad entre los coleccionistas, con nuevas tendencias emergentes que atraen a más aficionados cada día. Desde ediciones limitadas hasta colaboraciones especiales, el mercado sigue evolucionando y sorprendiendo a los fans.',
    },
  ];

  return (
    <section id="noticias" className="padded">
      <div className="container">
        <h2>Noticias</h2>
        <div className="row">
          {noticias.map((noticia) => (
            <article key={noticia.id} className="col-md-6 col-lg-3">
              <img src={noticia.imagen} alt={`Noticia ${noticia.id}`} className="noticia-imagen" />
              <div className="noticia-contenido">
                <h3>{noticia.titulo}</h3>
                <p>{noticia.contenido}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Noticias;

import React from 'react';
import noticia1Imagen from '../assets/images/noticia1.jpg';
import noticia2Imagen from '../assets/images/noticia2.jpg';
import noticia3Imagen from '../assets/images/noticia3.jpg';
import './Noticias.css';

function Noticias() {
  return (
    <>
      <section id="noticias" className="padded">
        <div className="container">
          <h2>Noticias</h2>
          <div className="row">
            <article className="col-md-6 col-lg-4">
              <img src={noticia1Imagen} alt="Noticia 1" className="noticia-imagen" />
              <div className="noticia-contenido">
                <h3>El auge del comercio online de figuritas y cartas de anime</h3>
                <p>El mercado de figuritas y cartas de anime en línea está en pleno crecimiento. Con el aumento del interés por el coleccionismo y la cultura otaku, cada vez más personas utilizan plataformas digitales para comprar y vender sus artículos favoritos.</p>
                <p>Este fenómeno está fomentando una comunidad vibrante de coleccionistas y ofreciendo oportunidades para intercambiar y encontrar piezas raras. Descubre cómo el comercio online está revolucionando la forma en que los aficionados adquieren sus figuritas y cartas.</p>
              </div>
            </article>
            <article className="col-md-6 col-lg-4">
              <img src={noticia2Imagen} alt="Noticia 2" className="noticia-imagen" />
              <div className="noticia-contenido">
                <h3>Consejos para comprar figuritas y cartas de anime en línea</h3>
                <p>La compra de figuritas y cartas de anime en línea puede ser una forma emocionante de expandir tu colección. Sin embargo, es fundamental seguir algunos consejos para asegurarte de que tu experiencia de compra sea satisfactoria. Desde verificar la autenticidad hasta investigar precios, aprende a hacer compras inteligentes.</p>
                <p>Explora las plataformas más populares y descubre cómo identificar las mejores ofertas sin comprometer la calidad. ¡Añade nuevas joyas a tu colección de manera segura y efectiva!</p>
              </div>
            </article>
            <article className="col-md-6 col-lg-4">
              <img src={noticia3Imagen} alt="Noticia 3" className="noticia-imagen" />
              <div className="noticia-contenido">
                <h3>El impacto positivo del comercio online de figuritas y cartas de anime</h3>
                <p>El comercio online de figuritas y cartas de anime no solo es beneficioso para los coleccionistas, sino también para la comunidad. Descubre cómo la compra y venta de artículos de segunda mano contribuye a la sostenibilidad y apoya a otros aficionados en su búsqueda.</p>
                <p>Lee historias inspiradoras de coleccionistas que han encontrado tesoros únicos y cómo el intercambio de figuritas y cartas puede fomentar la amistad y el apoyo dentro de la comunidad. ¡Únete a la revolución del coleccionismo consciente!</p>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className="area_plantillas">
      <div className="container">
        <h3 className="title_lps_slider text-center mb-5">¡Empresas Aliadas!</h3>
        <div className="row justify-content-center align-items-center mt-2">
          <div className="col-lg-4 col-sm-12 mt-3">
            <a href="https://www.limdo.com.pe/" target="_blank" rel="noopener noreferrer">
              <img
                src="https://dojiw2m9tvv09.cloudfront.net/16738/4/limdo_cte.png?387&amp;time=1702869603"
                className="img-fluid"
                alt="Casos-de-éxito-Bsale"
              />
              <h4 className="title_plantillas_clientes">
                Limdo<i className="fas fa-external-link-alt pl-2"></i>
              </h4>
            </a>
          </div>
          <div className="col-lg-4 col-sm-12 mt-3">
            <a href="https://www.pranastoreperu.com/" target="_blank" rel="noopener noreferrer">
              <img
                src="https://dojiw2m9tvv09.cloudfront.net/16738/4/prana_cte.png?387&amp;time=1702869603"
                className="img-fluid"
                alt="Casos-de-éxito-Bsale"
              />
              <h4 className="title_plantillas_clientes">
                Prana Store<i className="fas fa-external-link-alt pl-2"></i>
              </h4>
            </a>
          </div>
          <div className="col-lg-4 col-sm-12 mt-3">
            <a href="https://www.sweetshopsbrianna.com/" target="_blank" rel="noopener noreferrer">
              <img
                src="https://dojiw2m9tvv09.cloudfront.net/16738/4/sweet_cte.png?387&amp;time=1702869603"
                className="img-fluid"
                alt="Casos-de-éxito-Bsale"
              />
              <h4 className="title_plantillas_clientes">
                Sweet Shop Brianna<i className="fas fa-external-link-alt pl-2"></i>
              </h4>
            </a>
          </div>
        </div>
        <div className="row justify-content-center align-items-center pb-5 pt-5">
          <div className="col-lg-4 col-sm-12 mt-3">
            <a href="https://www.coshupet.pe/" target="_blank" rel="noopener noreferrer">
              <img
                src="https://dojiw2m9tvv09.cloudfront.net/16738/4/coshu_cte.png?387&amp;time=1702869603"
                className="img-fluid"
                alt="Casos-de-éxito-Bsale"
              />
              <h4 className="title_plantillas_clientes">
                Coshu pet<i className="fas fa-external-link-alt pl-2"></i>
              </h4>
            </a>
          </div>
          <div className="col-lg-4 col-sm-12 mt-3">
            <a href="https://www.beauty-outletshop.com/" rel="noopener noreferrer">
              <img
                src="https://dojiw2m9tvv09.cloudfront.net/16738/4/beauty_cte.png?387&amp;time=1702869603"
                className="img-fluid"
                alt="Casos-de-éxito-Bsale"
              />
              <h4 className="title_plantillas_clientes">
                Beauty Outlet Shop<i className="fas fa-external-link-alt pl-2"></i>
              </h4>
            </a>
          </div>
          <div className="col-lg-4 col-sm-12 mt-3">
            <a href="https://www.pipposshop.com/" target="_blank" rel="noopener noreferrer">
              <img
                src="https://dojiw2m9tvv09.cloudfront.net/16738/4/pipposshop_cte.png?387&amp;time=1702869603"
                className="img-fluid"
                alt="Casos-de-éxito-Bsale"
              />
              <h4 className="title_plantillas_clientes">
                Pippo's Shop<i className="fas fa-external-link-alt pl-2"></i>
              </h4>
            </a>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default Noticias;

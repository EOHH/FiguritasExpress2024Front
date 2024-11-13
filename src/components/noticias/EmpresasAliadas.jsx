import React from 'react';
import './EmpresasAliadas.css';

function EmpresasAliadas() {
  return (
    <section className="area_plantillas">
      <div className="container">
        <h3 className="title_lps_slider text-center mb-5">¡Empresas Aliadas!</h3>
        <div className="row justify-content-center align-items-center mt-2">
          <div className="col-lg-4 col-sm-12 mt-3">
            <a href="https://www.limdo.com.pe/" target="_blank" rel="noopener noreferrer">
              <img src="https://dojiw2m9tvv09.cloudfront.net/16738/4/limdo_cte.png?387&amp;time=1702869603" className="img-fluid" alt="Limdo" />
              <h4 className="title_plantillas_clientes">Limdo<i className="fas fa-external-link-alt pl-2"></i></h4>
            </a>
          </div>
          <div className="col-lg-4 col-sm-12 mt-3">
            <a href="https://www.pranastoreperu.com/" target="_blank" rel="noopener noreferrer">
              <img src="https://dojiw2m9tvv09.cloudfront.net/16738/4/prana_cte.png?387&amp;time=1702869603" className="img-fluid" alt="Prana Store" />
              <h4 className="title_plantillas_clientes">Prana Store<i className="fas fa-external-link-alt pl-2"></i></h4>
            </a>
          </div>
          <div className="col-lg-4 col-sm-12 mt-3">
            <a href="https://www.sweetshopsbrianna.com/" target="_blank" rel="noopener noreferrer">
              <img src="https://dojiw2m9tvv09.cloudfront.net/16738/4/sweet_cte.png?387&amp;time=1702869603" className="img-fluid" alt="Sweet Shop Brianna" />
              <h4 className="title_plantillas_clientes">Sweet Shop Brianna<i className="fas fa-external-link-alt pl-2"></i></h4>
            </a>
          </div>
        </div>
        <div className="row justify-content-center align-items-center pb-5 pt-5">
          <div className="col-lg-4 col-sm-12 mt-3">
            <a href="https://www.coshupet.pe/" target="_blank" rel="noopener noreferrer">
              <img src="https://dojiw2m9tvv09.cloudfront.net/16738/4/coshu_cte.png?387&amp;time=1702869603" className="img-fluid" alt="Coshu Pet" />
              <h4 className="title_plantillas_clientes">Coshu Pet<i className="fas fa-external-link-alt pl-2"></i></h4>
            </a>
          </div>
          <div className="col-lg-4 col-sm-12 mt-3">
            <a href="https://www.beauty-outletshop.com/" rel="noopener noreferrer">
              <img src="https://dojiw2m9tvv09.cloudfront.net/16738/4/beauty_cte.png?387&amp;time=1702869603" className="img-fluid" alt="Beauty Outlet Shop" />
              <h4 className="title_plantillas_clientes">Beauty Outlet Shop<i className="fas fa-external-link-alt pl-2"></i></h4>
            </a>
          </div>
          <div className="col-lg-4 col-sm-12 mt-3">
            <a href="https://www.pipposshop.com/" target="_blank" rel="noopener noreferrer">
              <img src="https://dojiw2m9tvv09.cloudfront.net/16738/4/pipposshop_cte.png?387&amp;time=1702869603" className="img-fluid" alt="Pippo's Shop" />
              <h4 className="title_plantillas_clientes">Pippo's Shop<i className="fas fa-external-link-alt pl-2"></i></h4>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmpresasAliadas;

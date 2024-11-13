import React from 'react';
import './ScrollingText.css'; // Asegúrate de tener un archivo CSS para los estilos

const ScrollingText = () => {
  return (
    <div
      className="sectionScro section--tight section-full bg-custom text-custom"
      style={{ '--background': '239 26 35', '--text-color': '255 255 255' }}
    >
      <div className="scrolling-text scrolling-text--auto">
        <div
          className="scrolling-text__wrapper"
          style={{ animationDuration: '3.102s', whiteSpace: 'nowrap' }}
        >
          {Array(10).fill(
            <span className="scrolling-text__text heading">Envíos a todo el Perú</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScrollingText;

import React, { useState } from 'react';
import './PreguntasFrecuentes.css';

function PreguntasFrecuentes() {
  const [cardAmount] = useState(5);

  return (
    <section className="faq-section">
      <div className="faq-container">
        <div className="faq-title">
          <h3>Preguntas Frecuentes</h3>
        </div>
        <div className="accordion" id="faqAccordion">
          {[...Array(cardAmount)].map((_, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header" id={`heading${index}`}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded="false"
                  aria-controls={`collapse${index}`}
                >
                  {index === 0
                    ? '¿Cómo puedo realizar una compra?'
                    : index === 1
                    ? '¿Cuáles son las colecciones disponibles?'
                    : index === 2
                    ? '¿Qué métodos de pago aceptan?'
                    : index === 3
                    ? '¿Cuánto tarda en llegar mi pedido?'
                    : '¿Puedo hacer seguimiento de mi pedido?'}
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading${index}`}
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  {index === 0
                    ? 'Puedes realizar una compra seleccionando tus figuritas favoritas y agregándolas al carrito. Luego, sigue el proceso de pago para completar tu compra.'
                    : index === 1
                    ? 'Actualmente contamos con colecciones de los animes más populares como "Naruto", "One Piece", "Demon Slayer", entre otros.'
                    : index === 2
                    ? 'Aceptamos pagos con tarjeta de crédito, débito y PayPal.'
                    : index === 3
                    ? 'Los pedidos suelen tardar entre 5 y 7 días hábiles en llegar a tu dirección.'
                    : 'Sí, una vez que tu pedido sea enviado, recibirás un código de seguimiento para rastrear tu paquete.'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PreguntasFrecuentes;

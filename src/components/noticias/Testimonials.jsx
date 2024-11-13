import React, { useState } from 'react';
import './Testimonials.css';

const testimonials = [
  {
    text: "Figuritas Express me ha sorprendido con su increíble variedad de figuritas de anime. La calidad es excepcional y el envío fue rápido. ¡Definitivamente volveré a comprar!",
    name: "Doris Lerma",
    location: "Bahía Sur"
  },
  {
    text: "La experiencia de compra en Figuritas Express fue excelente. Encontré las figuritas que buscaba a un buen precio y el servicio al cliente fue muy amable.",
    name: "Max Solorzano",
    location: "Parque Río"
  },
  {
    text: "Soy coleccionista de figuritas de anime y Figuritas Express se ha convertido en mi tienda favorita. Siempre tienen las últimas novedades y ediciones limitadas.",
    name: "Tere Goñi",
    location: "Fresco Valle"
  }
];

const Testimonials = () => {
  const [likes, setLikes] = useState(Array(testimonials.length).fill(0));

  const handleLike = (index) => {
    const newLikes = [...likes];
    newLikes[index] += 1;
    setLikes(newLikes);
  };

  return (
    <section className="testimonials-section">
      <h2>Qué dicen nuestros clientes</h2>
      <div className="testimonials-container">
        {testimonials.map((testimonial, index) => (
          <div className="testimonial-card" key={index}>
            <p className="testimonial-text">"{testimonial.text}"</p>
            <p className="testimonial-author">{testimonial.name}, {testimonial.location}</p>
            <button className="like-button recolor" onClick={() => handleLike(index)}>
              👍 Me gusta
            </button>
            <span className="like-count">{likes[index]}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

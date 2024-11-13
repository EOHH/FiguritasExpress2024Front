import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaUserPlus } from 'react-icons/fa';
import './RedirectWithMessage.css';

function RedirectWithMessage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Desplaza la página hacia la parte superior al cargar el componente
    window.scrollTo(0, 0);
  }, []);

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="register-message-container">
      <div className="background-image"></div>
      <div className="overlay"></div>
      <div className="content-mesagge-redirect">
        <FaLock size={70} className="lock-icon" />
        <h2 className="message-title">¡Acceso Exclusivo!</h2>
        <p className="message-text">
          Para visualizar todos nuestros productos, debes registrarte y acceder a tu cuenta.
          Únete a nuestra comunidad para descubrir contenido exclusivo.
        </p>
        <div className="mbr-section-btn">
          <button className="register-btn" onClick={handleRegisterRedirect}>
            <FaUserPlus className="btn-icon" /> Regístrate Aquí
          </button>
        </div>
      </div>
    </div>
  );
}

export default RedirectWithMessage;

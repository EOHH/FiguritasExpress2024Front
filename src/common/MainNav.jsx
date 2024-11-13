import { Link, NavLink } from "react-router-dom";
import logo from '../assets/images/imglogo.png';
import './MainNav.css';

function MainNav({ onLogout, usuario }) {
    if (usuario !== null) {
        console.log(usuario.username);
        localStorage.setItem("nombre", usuario.username);
        localStorage.setItem("ciudad", usuario.ciudad);
        localStorage.setItem("direccion", usuario.direccion);
        localStorage.setItem("telefono", usuario.telefono);
        localStorage.setItem("pais", usuario.pais);
    }

    return (
        <nav className="navbar navbar-expand-lg sticky-top">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="Logo" width="120" height="90" className="navbar-logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/" activeClassName="active">Inicio</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/nosotros" activeClassName="active">Nosotros</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/tiendita" activeClassName="active">Productos</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/noticias" activeClassName="active">Noticias</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/consultas" activeClassName="active">Consultas</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/carrito">
                                <i className="bi bi-basket-fill" title="Carrito de compras"></i> Carrito
                            </Link>
                        </li>
                        {usuario ? (
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Hola {usuario.username}
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#" onClick={onLogout}>Cerrar sesión</a></li>
                                </ul>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login">
                                    <i className="bi bi-person-fill" title="Inicio de sesión"></i> Inicio de sesión
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default MainNav;

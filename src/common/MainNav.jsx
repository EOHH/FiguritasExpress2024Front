import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import logo from "../assets/images/imglogo.png";
import "./MainNav.css";

function MainNav({ onLogout, usuario }) {
    const navigate = useNavigate();

    if (usuario !== null) {
        localStorage.setItem("nombre", usuario.username);
        localStorage.setItem("ciudad", usuario.ciudad);
        localStorage.setItem("direccion", usuario.direccion);
        localStorage.setItem("telefono", usuario.telefono);
        localStorage.setItem("pais", usuario.pais);
    }

    const handleLogout = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Deseas cerrar sesión?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Eliminar los datos de usuario del localStorage
                localStorage.removeItem('userData');

                // Llamar a la función onLogout pasada como prop
                onLogout();

                // Redirigir al usuario a la página de inicio de sesión
                navigate('/login', { replace: true });

                Swal.fire(
                    '¡Sesión cerrada!',
                    'Has cerrado sesión correctamente.',
                    'success'
                );
            }
        });
    };

    return (
        <nav className="navbar navbar-expand-lg sticky-top">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="Logo" width="120" height="90" className="navbar-logo" />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                                to="/"
                            >
                                <i className="bi bi-house-door"></i> Inicio
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                                to="/nosotros"
                            >
                                <i className="bi bi-info-circle"></i> Nosotros
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                                to="/tiendita"
                            >
                                <i className="bi bi-bag"></i> Productos
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                                to="/noticias"
                            >
                                <i className="bi bi-newspaper"></i> Noticias
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                                to="/consultas"
                            >
                                <i className="bi bi-question-circle"></i> Consultas
                            </NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/carrito">
                                <i className="bi bi-basket-fill"></i> Carrito
                            </Link>
                        </li>
                        {usuario ? (
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle d-flex align-items-center"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {usuario.image ? (
                                        <img
                                            src={usuario.image}
                                            alt="Perfil"
                                            className="profile-img me-2"
                                            width="30"
                                            height="30"
                                        />
                                    ) : (
                                        <i className="bi bi-person-circle me-2"></i>
                                    )}
                                    {usuario.username}
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" href="/perfil">
                                            Mi perfil
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="/estado-pedido">
                                            Estado del pedido
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#" onClick={handleLogout}>
                                            Cerrar sesión
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                                    to="/login"
                                >
                                    <i className="bi bi-person-fill"></i> Inicio de sesión
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default MainNav;

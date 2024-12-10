import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import MainFooter from './common/MainFooter';
import MainHeader from './common/MainHeader';
import MainNav from './common/MainNav';
import Inicio from './components/home/Inicio';
import UserProfile from './common/UserProfile';
import Tiendita from './components/productos/Tiendita';
import Tienda from './components/productos/Tienda';
import Carrito from './components/home/Carrito';
import Pedidos from './components/productos/RealizarPedido';
import Nosotros from './components/nosotros/Nosotros';
import Productos from './components/productos/Productos';
import RedirectWithMessage from './common/RedirectWithMessage';
import ScrollingText from './components/productos/ScrollingText';
import ConsultasPage from './components/consultas/ConsultasPage';
import Login from './components/login/Login';
import SesionCerrada from './components/login/SesionCerrada';
import NoticiasPage from './components/noticias/NoticiasPage';
import Register from "./components/login/Register";
import AdminDashboard from './components/admin/AdminDashboard';
import AdminUsers from './components/admin/UserManagement';

import { useState, useEffect } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedAdmin = localStorage.getItem("isAdmin");
    const storedUserId = localStorage.getItem("idUser");

    if (storedUser && storedAuth === "true") {
      setUsuario(JSON.parse(storedUser));
      setIsAuthenticated(true);
      setIsAdmin(storedAdmin === "true");
      setLoggedInUserId(storedUserId);
    }
    setLoading(false);
  }, []);

  const handleLogin = (data) => {
    setIsAuthenticated(true);
    setUsuario(data);
    setIsAdmin(data.admin === true);
    setLoggedInUserId(data.idUser);

    localStorage.setItem("usuario", JSON.stringify(data));
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("isAdmin", data.admin === true);
    localStorage.setItem("idUser", data.idUser);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUsuario(null);
    setLoggedInUserId(null);

    localStorage.removeItem("usuario");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("idUser");
    alert("Su sesión ha sido cerrada");
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <MainHeader />
      <MainNav onLogout={handleLogout} usuario={usuario} />
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path="/register" element={<Register onLogin={(data) => handleLogin(data)} />} />
        <Route path='/tienda' element={<Tienda />} />
        <Route path='/tiendita' element={isAuthenticated ? <Tiendita /> : <RedirectWithMessage />} />
        <Route path='/noticias' element={<NoticiasPage />} />
        <Route path='/nosotros' element={<Nosotros />} />
        <Route path="/perfil" element={<UserProfile />} />
        
        {/* Ruta del carrito protegida */}
        <Route 
          path='/carrito' 
          element={isAuthenticated ? <Carrito loggedInUserId={loggedInUserId} /> : <Navigate to="/login" />} 
        />

        {/* Ruta de pedidos protegida */}
        <Route 
          path='/pedidos' 
          element={isAuthenticated ? <Pedidos loggedInUserId={loggedInUserId}/> : <Navigate to="/login" />} 
        />

        <Route path='/productos' element={<Productos />} />
        <Route path="/scrolling-text" element={<ScrollingText />} />
        <Route path='/consultas' element={<ConsultasPage />} />
        
        <Route path="/sesioncerrada" element={<SesionCerrada />} />
        <Route path="/login" element={<Login onLogin={(data) => handleLogin(data)} />} />
        
        {/* Rutas de administrador protegidas */}
        <Route 
          path="/admin" 
          element={isAuthenticated && isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/admin/users" 
          element={isAuthenticated && isAdmin ? <AdminUsers /> : <Navigate to="/login" />} 
        />

        {/* Redirección en caso de no autenticación */}
        <Route path="*" element={isAuthenticated ? <Navigate to="/" /> : <Navigate to="/login" />} />
      </Routes>
      <MainFooter />
    </>
  );
}

export default App;

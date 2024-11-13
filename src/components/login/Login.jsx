import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import Swal from "sweetalert2";
import "./Login.css";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user");

  // Función para alternar la visibilidad de la contraseña
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const iniciarSesion = async (event) => {
    event.preventDefault();

    try {
      const loginData = { email, password };
      const endpoint = userType === "admin"
        ? "http://localhost:8080/api_int_2024/auth/login/admin"
        : "http://localhost:8080/api_int_2024/auth/login/user";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) throw new Error("Error de red");

      const result = await response.json();
      console.log("Respuesta completa del servidor:", result);

      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "¡Bienvenido!",
          text: `Inicio de sesión exitoso, ${result.username || "usuario"}`,
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });

        const userData = {
          username: result.username || "Usuario",
          token: result.token,
          admin: result.admin === true,
          idUser: result.idUser,
        };

        // Pasamos toda la información a onLogin para que App.js se encargue de almacenarla en localStorage
        onLogin(userData);
        
        // Redirige al usuario dependiendo de si es admin o no
        navigate(result.admin ? "/admin" : "/", { replace: true });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: result.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al iniciar sesión",
      });
    }
  };

  // Maneja el inicio de sesión con Google
  const handleGoogleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
  
    try {
      const response = await axios.post("http://localhost:8080/api_int_2024/users/google", { token });
  
      const jwtToken = response.data.token;
      const username = response.data.username;
      const idUser = response.data.idUser; // Asegúrate de obtener idUser en la respuesta
  
      // Verificar que tanto jwtToken como idUser estén disponibles
      if (jwtToken && idUser) {
        const userData = { username, token: jwtToken, idUser };
  
        // Pasamos userData a onLogin para que App.js lo gestione
        onLogin(userData);
  
        Swal.fire("Bienvenido", `Bienvenido, ${username}`, "success");
        navigate("/");
      } else {
        console.error("No se pudo obtener el token o idUser en la respuesta de Google");
        Swal.fire("Error", "No se pudo obtener la información de usuario", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Error al iniciar sesión con Google", "error");
    }
  };
  

  const handleGoogleFailure = (error) => {
    Swal.fire("Error", "Error en la autenticación con Google", "error");
  };

  return (
    <div className="padded">
      <div className="login-wrapper">
        <div className="form-image"></div>
        <div className="login-container">
          <div className="login-form">
            <div className="form-icon">
              <FaUser size={50} color="#00FFBF" />
            </div>
            <h2>Iniciar sesión</h2>
            <form onSubmit={iniciarSesion}>
              <div className="form-group">
                <label htmlFor="userType">Tipo de usuario:</label>
                <select value={userType} onChange={(event) => setUserType(event.target.value)} className="form-control">
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="username">
                  <FaUser /> Ingresa tu correo electrónico:
                </label>
                <input
                  type="email"
                  name="username"
                  className="form-control"
                  id="username"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="form-group password-group">
                <label htmlFor="password">
                  <FaLock /> Ingresa tu contraseña segura:
                </label>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="form-control"
                    id="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <div className="password-toggle" onClick={toggleShowPassword}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary recolor">
                INGRESAR
              </button>
            </form>
            <a href="#" className="forgot-password">
              ¿Olvidaste tu contraseña?
            </a>
            <a href="/register" className="sign-up">
              ¿Eres nuevo? Regístrate
            </a>
            <div className="social-login">
              <p>O inicia sesión con:</p>
              <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

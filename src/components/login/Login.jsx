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
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
  
    try {
      // Preparar los datos de inicio de sesión y el endpoint dinámico
      const loginData = { email, password };
      const endpoint =
        userType === "admin"
          ? "http://localhost:8080/api_int_2024/auth/login/admin"
          : "http://localhost:8080/api_int_2024/auth/login/user";
  
      // Realizar la solicitud al backend
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
  
      // Validar si la respuesta fue exitosa
      if (!response.ok) {
        const errorText = await response.text(); // Obtener texto del error si existe
        throw new Error(`Error de red: ${errorText}`);
      }
  
      // Procesar la respuesta
      const result = await response.json();
      console.log("Respuesta completa del servidor:", result);
  
      // Manejo en caso de éxito
      if (result.success) {
        // Mensaje de bienvenida al usuario
        Swal.fire({
          icon: "success",
          title: "¡Bienvenido!",
          text: `Inicio de sesión exitoso, ${result.username || "usuario"}`,
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
  
        // Crear el objeto de usuario con todos los datos relevantes
        const userData = {
          username: result.username || "Usuario",
          token: result.token,
          admin: result.admin === true,
          idUser: result.idUser,
          email: result.email,
          profileImage: result.profileImage || "", // Imagen opcional
        };
  
        // Almacenar los datos en localStorage
        localStorage.setItem("userData", JSON.stringify(userData));
  
        // Pasar los datos al controlador de sesión principal
        onLogin(userData);
  
        // Redirigir al usuario dependiendo de su tipo
        navigate(result.admin ? "/admin" : "/", { replace: true });
      } else {
        // Manejo de errores específicos enviados por el backend
        Swal.fire({
          icon: "error",
          title: "Error",
          text: result.message || "Credenciales incorrectas",
        });
      }
    } catch (error) {
      // Manejo general de errores
      console.error("Error al iniciar sesión:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Ocurrió un error al iniciar sesión",
      });
    }
  };  

  // Maneja el inicio de sesión con Google
  const handleGoogleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;

    try {
      // Envía el token al backend para autenticar al usuario
      const response = await axios.post("http://localhost:8080/api_int_2024/users/google", { token });

      // Extraer datos importantes de la respuesta
      const { token: jwtToken, username, idUser, email, profileImage } = response.data;

      // Verificar que los datos esenciales existan
      if (!jwtToken || !idUser || !email) {
        console.error("Faltan datos esenciales en la respuesta del servidor:", response.data);
        Swal.fire("Error", "No se pudo obtener información completa del usuario", "error");
        return;
      }

      // Crear el objeto de usuario para almacenamiento local y lógica global
      const userData = {
        username: username || "Usuario",
        email: email || "usuario@example.com",
        profileImage: profileImage || "",
        token: jwtToken,
        idUser,
      };

      // Guardar en localStorage
      localStorage.setItem("userData", JSON.stringify(userData));

      // Pasar los datos al manejador de sesión principal
      onLogin(userData);

      // Mensaje de bienvenida
      Swal.fire("Bienvenido", `Bienvenido, ${username}`, "success");

      // Navegar a la ruta principal
      navigate("/");
    } catch (error) {
      console.error("Error al autenticar con Google:", error.response || error.message);
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

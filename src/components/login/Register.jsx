import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import Swal from "sweetalert2";
import "./Register.css";

function Register({ onLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Registro tradicional
  async function registerUser(event) {
    event.preventDefault();
    try {
      const userData = {
        username,
        email,
        password,
      };
      const response = await axios.post("http://localhost:8080/api_int_2024/users/store", userData);
      console.log(response.data);

      // Verificar si el registro fue exitoso y si se recibió un token
      if (response.data.token) {
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: "Bienvenido, tu registro ha sido completado",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });

        // Extraer los datos necesarios de la respuesta
        const { token, username, idUser } = response.data;
        const userData = { username, token, idUser };

        // Llamar a onLogin para actualizar el estado en App
        onLogin(userData);

        // Redirigir al usuario a la página principal
        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message || "Error al registrar. Por favor, intenta de nuevo.",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al registrar: " + (err.response?.data?.message || "Error desconocido"),
      });
    }
  }

  // Maneja el inicio de sesión con Google
  const handleGoogleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;

    try {
      const response = await axios.post("http://localhost:8080/api_int_2024/users/google", { token });

      const jwtToken = response.data.token;
      const username = response.data.username;
      const idUser = response.data.idUser; // Asegúrate de obtener el idUser en la respuesta

      if (!jwtToken) {
        console.error("Token JWT no proporcionado en la respuesta");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo obtener el token JWT",
        });
        return;
      }

      const userData = {
        username,
        token: jwtToken,
        idUser,
      };

      // Pasamos userData a onLogin para que App.js lo gestione
      onLogin(userData);

      Swal.fire({
        icon: "success",
        title: `¡Bienvenido, ${username}!`,
        text: "Registro e inicio de sesión exitoso con Google",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      console.error("Error en el registro con Google:", error);

      Swal.fire({
        icon: "error",
        title: "Error en el registro con Google",
        text: error.response?.data || "Error desconocido",
      });
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Error en la autenticación de Google:", error);
    Swal.fire({
      icon: "error",
      title: "Error en la autenticación con Google",
      text: "No se pudo iniciar sesión con Google",
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="padded">
      <div className="register-wrapper">
        <div className="register-container">
          <div className="register-form">
            <div className="form-icon">
              <FaUser />
            </div>
            <h2>Registro</h2>
            <form onSubmit={registerUser}>
              <div className="form-group">
                <label htmlFor="username">
                  <FaUser /> Ingrese su username:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Ingrese su username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  <FaUser /> Ingrese su correo electrónico:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Ingrese su correo"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div className="form-group password-group">
                <label htmlFor="password">
                  <FaLock /> Ingrese su contraseña:
                </label>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    placeholder="Ingrese su contraseña"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                  <div className="password-toggle" onClick={toggleShowPassword}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary recolor">
                Registrar
              </button>
            </form>
            <div className="or-separator">
              <span>o</span>
            </div>
            <div className="social-register">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
              />
            </div>
          </div>
        </div>
        <div className="register-image"></div> {/* Contenedor de imagen a la derecha */}
      </div>
    </div>
  );
}

export default Register;

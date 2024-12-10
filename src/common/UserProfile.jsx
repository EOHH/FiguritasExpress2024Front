import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserProfile.css";
import Swal from "sweetalert2";
import { FaUserCircle, FaEnvelope, FaUpload, FaEdit } from "react-icons/fa"; // Importar iconos

const UserProfile = () => {
  const loggedUserData = JSON.parse(localStorage.getItem("userData")) || {};

  const [user, setUser] = useState({
    username: loggedUserData.username || "Usuario",
    email: loggedUserData.email || "usuario@example.com",
    profileImage: loggedUserData.profileImage || "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api_int_2024/users/${loggedUserData.idUser}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser({
          username: response.data.username,
          email: response.data.email,
          profileImage: response.data.profileImage,
        });
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    if (loggedUserData.idUser) {
      fetchUserData();
    }
  }, [loggedUserData.idUser, token]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        Swal.fire({
          icon: "error",
          title: "Tipo de archivo no permitido",
          text: "Por favor, sube una imagen en formato JPG, PNG o GIF.",
        });
        return;
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        Swal.fire({
          icon: "error",
          title: "Archivo demasiado grande",
          text: "El tamaño de la imagen no puede superar los 5MB.",
        });
        return;
      }

      const formData = new FormData();
      formData.append("profileImage", file);

      try {
        setIsLoading(true);

        const trimmedToken = token.trim();

        const response = await axios.put(
          "http://localhost:8080/api_int_2024/users/me/profile-image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${trimmedToken}`,
            },
          }
        );

        const imageUrl = response.data.imageUrl;

        setUser((prevUser) => ({ ...prevUser, profileImage: imageUrl }));
        localStorage.setItem(
          "userData",
          JSON.stringify({ ...loggedUserData, profileImage: imageUrl })
        );

        Swal.fire({
          icon: "success",
          title: "Imagen actualizada",
          text: "Tu foto de perfil se actualizó correctamente.",
        });
      } catch (error) {
        console.error("Error al actualizar la imagen de perfil:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo actualizar la foto de perfil.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setIsLoading(true);
      await axios.put(
        `http://localhost:8080/api_int_2024/users/update/${loggedUserData.idUser}`,
        {
          username: user.username,
          email: user.email,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...loggedUserData,
          username: user.username,
          email: user.email,
        })
      );

      Swal.fire({
        icon: "success",
        title: "Perfil actualizado",
        text: "Tus datos se actualizaron correctamente.",
      });
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar tu perfil.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="user-profile">
      <h1 className="profile-title">Mi Perfil</h1>
      <div className="profile-card">
        {isLoading ? (
          <div className="loading-spinner">Cargando...</div>
        ) : (
          <>
            <div className="image-container">
              <img
                src={user.profileImage || "https://via.placeholder.com/150"}
                alt="Foto de perfil"
                className="profile-image"
              />
              <label htmlFor="profileImageInput" className="upload-icon">
                <FaUpload />
              </label>
              <input
                id="profileImageInput"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </div>
            <div className="profile-info">
              <label htmlFor="username">
                <FaUserCircle /> Nombre de usuario
              </label>
              <input
                id="username"
                type="text"
                value={user.username}
                onChange={(e) =>
                  setUser((prevUser) => ({
                    ...prevUser,
                    username: e.target.value,
                  }))
                }
              />
              <label htmlFor="email">
                <FaEnvelope /> Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) =>
                  setUser((prevUser) => ({
                    ...prevUser,
                    email: e.target.value,
                  }))
                }
              />
            </div>
          </>
        )}
      </div>
      <button
        className="update-btn recolor"
        onClick={handleUpdateProfile}
        disabled={isLoading}
      >
        {isLoading ? "Actualizando..." : "Actualizar Perfil"}
      </button>
    </div>
  );
};

export default UserProfile;

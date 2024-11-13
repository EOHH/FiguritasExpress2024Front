import { useEffect, useState } from "react";
import Productos from "./Productos";
import Carrito from "../home/Carrito"; // Importa el componente Carrito
import "./Tienda.css";

function Tienda({ loggedInUserId }) {
  const [listaCategorias, setListaCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState([]);

  useEffect(() => {
    leerServicio();
  }, []);

  const leerServicio = () => {
    const rutaServicio = "http://localhost:8080/api_int_2024/categorias/getAll";
    fetch(rutaServicio)
      .then(response => response.json())
      .then(data => {
        setListaCategorias(data);
      });
  };

  const dibujarLista = () => {
    return (
      <ul className="list-group" id="lista-categorias">
        {listaCategorias.map(item => (
          <li
            className="list-group-item"
            style={{ marginBottom: '10px' }}
            key={item.idcategoria}
            title={item.descripcion}
            onClick={(event) => seleccionarCategoria(event, item)}
          >
            {item.nombre}
          </li>
        ))}
      </ul>
    );
  };

  const seleccionarCategoria = (event, item) => {
    setCategoriaSeleccionada(item);
    let itemsLista = document.querySelectorAll("#lista-categorias li");
    itemsLista.forEach(item => {
      item.classList.remove("active");
    });
    event.currentTarget.classList.add("active");
  };

  return (
    <section className="padded">
      <div className="container">
        <h2>Disfruta de nuestras colecciones</h2>
        <div className="row">
          <div className="col-md-2" style={{ backgroundColor: '#52846C', borderRadius: '10px', height: '400px' }}>
            <div className="categoria-container">
              <h4 className="p-2" style={{ color: '#333' }}>Categorías</h4>
              <hr />
              {dibujarLista()}
            </div>
          </div>
          <div className="col-md-10">
            <h3>{categoriaSeleccionada.nombre}</h3>
            <small>{categoriaSeleccionada.descripcion}</small>
            <Productos categoriaProductos={categoriaSeleccionada.idCategoria} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Tienda;

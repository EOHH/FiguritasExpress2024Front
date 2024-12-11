import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa'; // Iconos
import Modal from './Modal';
import { fetchData, handleCreate, handleDelete, handleUpdate } from './crudFunctions';
import './ProductManagement.css'; // Importar los estilos

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    precio: 0,
    condicion: '',
    stock: 0, // Campo stock
    idcategoria: 1,
    usuario: 1,
  });
  const [editItem, setEditItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchData('productos', setProducts);
  }, []);

  // Función para determinar el estado del inventario
  const getInventoryStatus = (stock) => {
    if (stock === 0) return 'Sin existencias';
    if (stock > 0 && stock <= 5) return `Bajo stock (${stock})`;
    return `Hay existencias (${stock})`;
  };

  return (
    <div className="padded">
      <h2>Crear Producto</h2>
      <form
        className="product-form"
        onSubmit={(e) =>
          handleCreate(e, 'productos', newProduct, setNewProduct, () =>
            fetchData('productos', setProducts)
          )
        }
      >
        <input
          type="text"
          placeholder="Nombre"
          value={newProduct.nombre}
          onChange={(e) => setNewProduct({ ...newProduct, nombre: e.target.value })}
        />
        <input
          type="number"
          placeholder="Precio"
          value={newProduct.precio}
          onChange={(e) => setNewProduct({ ...newProduct, precio: parseFloat(e.target.value) })}
        />
        <input
          type="text"
          placeholder="Condición"
          value={newProduct.condicion}
          onChange={(e) => setNewProduct({ ...newProduct, condicion: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
        />
        <button type="submit" className="add-btn">
          <FaPlus /> Crear Producto
        </button>
      </form>

      <h2>Productos</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Condición</th>
            <th>Inventario</th> {/* Nueva columna para el estado del inventario */}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.idProducto}>
              <td>{product.nombre}</td>
              <td>${product.precio.toFixed(2)}</td>
              <td>{product.condicion}</td>
              <td className={`inventory-status ${product.stock === 0 ? 'out-of-stock' : product.stock <= 5 ? 'low-stock' : 'in-stock'}`}>
                {getInventoryStatus(product.stock)}
              </td> {/* Mostrar el estado del stock */}
              <td className="action-buttons">
                <button
                  className="action-btn edit-btn"
                  onClick={() => {
                    setEditItem(product);
                    setIsEditModalOpen(true);
                  }}
                >
                  <FaEdit />
                </button>
                <button
                  className="action-btn delete-btn"
                  onClick={() =>
                    handleDelete(product.idProducto, 'productos', () =>
                      fetchData('productos', setProducts)
                    )
                  }
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditModalOpen && (
        <Modal
          item={editItem}
          setIsEditModalOpen={setIsEditModalOpen}
          handleUpdate={(e) =>
            handleUpdate(e, 'productos', editItem, setEditItem, () =>
              fetchData('productos', setProducts)
            )
          }
        />
      )}
    </div>
  );
};

export default ProductManagement;

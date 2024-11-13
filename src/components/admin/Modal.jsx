import React from 'react';

const Modal = ({ item, setIsEditModalOpen, handleUpdate }) => (
  <div className="modal">
    <div className="modal-content">
      <h2>Editar Item</h2>
      <form onSubmit={handleUpdate}>
        {Object.keys(item).map((key) => (
          <input
            key={key}
            type="text"
            placeholder={key}
            value={item[key]}
            onChange={(e) => item[key] = e.target.value}
          />
        ))}
        <button type="submit">Actualizar</button>
      </form>
      <button onClick={() => setIsEditModalOpen(false)}>Cerrar</button>
    </div>
  </div>
);

export default Modal;

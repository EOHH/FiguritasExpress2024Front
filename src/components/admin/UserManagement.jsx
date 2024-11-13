import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { fetchData, handleCreate, handleDelete, handleUpdate } from './crudFunctions';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });
  const [editItem, setEditItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchData('users', setUsers);
  }, []);

  return (
    <div>
      <h2>Crear Usuario</h2>
      <form onSubmit={(e) => handleCreate(e, 'users', newUser, setNewUser, () => fetchData('users', setUsers))}>
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <button type="submit">Crear Usuario</button>
      </form>

      <h2>Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => { setEditItem(user); setIsEditModalOpen(true); }}>Editar</button>
                <button onClick={() => handleDelete(user.id, 'users', () => fetchData('users', setUsers))}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditModalOpen && (
        <Modal
          item={editItem}
          setIsEditModalOpen={setIsEditModalOpen}
          handleUpdate={(e) => handleUpdate(e, 'users', editItem, setEditItem, () => fetchData('users', setUsers))}
        />
      )}
    </div>
  );
};

export default UserManagement;

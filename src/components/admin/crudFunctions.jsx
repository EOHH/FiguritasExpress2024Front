export const fetchData = async (endpoint, setData) => {
    try {
      const response = await fetch(`http://localhost:8080/api_int_2024/${endpoint}/getAll`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
    }
  };
  
  export const handleCreate = async (e, type, newItem, setNewItem, fetchFunction) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api_int_2024/${type}/store`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });
      if (!response.ok) throw new Error('Error al crear el elemento');
      fetchFunction();
      setNewItem({});
    } catch (error) {
      console.error(`Error creating ${type}:`, error);
    }
  };
  
  export const handleDelete = async (id, type, fetchFunction) => {
    try {
      const response = await fetch(`http://localhost:8080/api_int_2024/${type}/delete/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Error al eliminar el elemento');
      fetchFunction();
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
    }
  };
  
  export const handleUpdate = async (e, type, item, setItem, fetchFunction) => {
    e.preventDefault();
    try {
      const { id, ...updateData } = item;
      const response = await fetch(`http://localhost:8080/api_int_2024/${type}/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });
      if (!response.ok) throw new Error('Error al actualizar el elemento');
      fetchFunction();
      setItem(null);
    } catch (error) {
      console.error(`Error updating ${type}:`, error);
    }
  };
  
import React, { useEffect, useState } from 'react';
import { getCategories, deleteCategory } from '../../api/services/category.service.js';

const Table = ({ onEdit }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      let data = await getCategories();
      // Rectification: Removed debug logs and ensured array structure
      data = data.sort((a, b) => a.id - b.id);
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to fetch categories');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id);
        setCategories(categories.filter(category => category.id !== id));
      } catch (err) {
        alert('Delete failed');
      }
    }
  };

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ backgroundColor: '#f4f4f4' }}>
          <th>ID</th>
          <th>User ID</th>
          <th>Name</th>
          <th>Color</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {categories.length > 0 ? (
          categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.user_id}</td>
              <td>{category.name}</td>
              <td>
                <span style={{ 
                  display: 'inline-block', 
                  width: '12px', 
                  height: '12px', 
                  backgroundColor: category.color, 
                  marginRight: '8px',
                  borderRadius: '50%'
                }}></span>
                {category.color}
              </td>
              <td>
                <button onClick={() => onEdit(category)}>Edit</button>
                <button 
                  onClick={() => handleDelete(category.id)} 
                  style={{ marginLeft: '10px', color: 'red' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" style={{ textAlign: 'center' }}>No categories available.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
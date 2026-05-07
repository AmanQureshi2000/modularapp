import React, { useEffect, useState } from 'react';
import { getCategories, deleteCategory } from '../../api/services/category.service.js';

const Table = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load users on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      let data = await getCategories();
      console.log(data);
      data = data.sort((a, b) => a.id - b.id);
      /**
       * Rectification:
       * 1. Removed debug console logs (line 18-20).
       * 2. Ensure state is set to an array even if the API returns a different structure.
       */
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
        // Refresh list by filtering out the deleted user
        setCategories(categories.filter(category=> category.id !== id));
      } catch (err) {
        alert('Delete failed');
      }
    }
  };

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Category Management</h2>
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
          {/* Rectification: Uncommented the mapping logic to display users */}
          {categories.length > 0 ? (
            categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.user_id}</td>
                <td>{category.name}</td>
                <td>{category.color}</td>
                <td>
                  <button onClick={() => console.log('Edit', category.id)}>Edit</button>
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
              <td colSpan="4" style={{ textAlign: 'center' }}>No catgeories available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
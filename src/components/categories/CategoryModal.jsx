import React, { useState, useEffect } from 'react';
import { createCategory, updateCategory } from '../../api/services/category.service.js';

const CategoryModal = ({ category, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    user_id: '',
    name: '',
    color: '#000000' // Default to black
  });

  useEffect(() => {
    if (category) {
      setFormData({
        user_id: category.user_id || '',
        name: category.name || '',
        color: category.color || '#000000'
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (category) {
        await updateCategory(category.id, formData);
      } else {
        await createCategory(formData);
      }
      onSuccess();
    } catch (err) {
      alert('Operation failed. Please check your inputs.');
      console.error(err);
    }
  };

  const modalOverlayStyle = {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center',
    alignItems: 'center', zIndex: 1000
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', width: '400px' }}>
        <h3 style={{ marginTop: 0 }}>{category ? 'Edit Category' : 'Add New Category'}</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label>User ID</label>
            <input 
              type="number" 
              name="user_id" 
              value={formData.user_id} 
              onChange={handleChange} 
              required 
              style={{ width: '100%', padding: '8px', marginTop: '5px' }} 
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Category Name</label>
            <input 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              style={{ width: '100%', padding: '8px', marginTop: '5px' }} 
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Label Color</label>
            <input 
              type="color" 
              name="color" 
              value={formData.color} 
              onChange={handleChange} 
              style={{ width: '100%', height: '40px', padding: '2px', marginTop: '5px', cursor: 'pointer' }} 
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" onClick={onClose} style={{ padding: '8px 15px', cursor: 'pointer' }}>Cancel</button>
            <button 
              type="submit" 
              style={{ 
                padding: '8px 15px', 
                backgroundColor: '#007bff', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer' 
              }}
            >
              {category ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
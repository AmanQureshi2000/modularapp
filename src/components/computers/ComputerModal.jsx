import React, { useState, useEffect } from 'react';
import { createComputer, updateComputer } from '../../api/services/computer.service.js';

const ComputerModal = ({ computer, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    serial_number: '',
    purchase_date: '',
    price: ''
  });

  useEffect(() => {
    if (computer) {
      setFormData({
        brand: computer.brand || '',
        model: computer.model || '',
        serial_number: computer.serial_number || '',
        purchase_date: computer.purchase_date || '',
        price: computer.price || ''
      });
    }
  }, [computer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (computer) {
        await updateComputer(computer.computer_id, formData);
      } else {
        await createComputer(formData);
      }
      onSuccess();
    } catch (err) {
      alert('Operation failed.');
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
        <h3 style={{ marginTop: 0 }}>{computer ? 'Edit Computer' : 'Add New Computer'}</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label>Brand</label>
            <input name="brand" value={formData.brand} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Model</label>
            <input name="model" value={formData.model} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Serial Number</label>
            <input name="serial_number" value={formData.serial_number} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Purchase Date</label>
            <input type="date" name="purchase_date" value={formData.purchase_date} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Price</label>
            <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', padding: '8px 15px', border: 'none', borderRadius: '4px' }}>
              {computer ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComputerModal;
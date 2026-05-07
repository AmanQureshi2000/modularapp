import React, { useState, useEffect } from 'react';
import { createUser, updateUser } from '../../api/services/user.service.js';

const UserModal = ({ user, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    is_active: false
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        password: '', // Keep blank on edit
        is_active: user.is_active ?? false
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        await updateUser(user.id, formData);
      } else {
        await createUser(formData);
      }
      onSuccess();
    } catch (err) {
      alert('Operation failed.');
      console.error(err);
    }
  };

  const modalStyle = {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center',
    alignItems: 'center', zIndex: 1000
  };

  return (
    <div style={modalStyle}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', width: '400px' }}>
        <h3 style={{ marginTop: 0 }}>{user ? 'Edit User' : 'Add New User'}</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label>Username</label>
            <input name="username" value={formData.username} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Password {user && '(Leave blank to keep current)'}</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required={!user} style={{ width: '100%', padding: '8px' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>
              <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} />
              Active Account
            </label>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', padding: '8px 15px', border: 'none', borderRadius: '4px' }}>
              {user ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
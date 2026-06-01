import React, { useState, useEffect } from 'react';
import { createHabit, updateHabit } from '../../api/services/habit.service.js';

const HabitModal = ({ habit, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    frequency_type: 'daily',
    target_days_per_week: '',
    target_days_per_month: ''
  });

  useEffect(() => {
    if (habit) {
      setFormData({
        name: habit.name || '',
        description: habit.description || '',
        frequency_type: habit.frequency_type || 'daily',
        target_days_per_week: habit.target_days_per_week || '',
        target_days_per_month: habit.target_days_per_month || ''
      });
    }
  }, [habit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Clean up data - remove empty values
      const cleanData = {};
      for (let key in formData) {
        if (formData[key] !== '' && formData[key] !== null && formData[key] !== undefined) {
          cleanData[key] = formData[key];
        }
      }
      
      if (habit) {
        await updateHabit(habit.id, cleanData);
      } else {
        await createHabit(cleanData);
      }
      onSuccess();
    } catch (err) {
      alert('Operation failed. Please check your inputs.');
      console.error(err);
    }
  };

  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  };

  return (
    <div style={modalStyle}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', width: '450px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginTop: 0 }}>{habit ? 'Edit Habit' : 'Add New Habit'}</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label>Habit Name *</label>
            <input 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} 
            />
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <label>Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              rows="3"
              style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} 
            />
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <label>Frequency Type *</label>
            <select 
              name="frequency_type" 
              value={formData.frequency_type} 
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          
          {formData.frequency_type === 'weekly' && (
            <div style={{ marginBottom: '10px' }}>
              <label>Target Days Per Week (1-7)</label>
              <input 
                type="number" 
                name="target_days_per_week" 
                value={formData.target_days_per_week} 
                onChange={handleChange} 
                min="1" 
                max="7"
                style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} 
              />
              <small style={{ color: '#666' }}>How many days per week? (Optional)</small>
            </div>
          )}
          
          {formData.frequency_type === 'monthly' && (
            <div style={{ marginBottom: '10px' }}>
              <label>Target Days Per Month (1-31)</label>
              <input 
                type="number" 
                name="target_days_per_month" 
                value={formData.target_days_per_month} 
                onChange={handleChange} 
                min="1" 
                max="31"
                style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} 
              />
              <small style={{ color: '#666' }}>How many days per month? (Optional)</small>
            </div>
          )}
          
          <div style={{ marginBottom: '20px', marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" onClick={onClose} style={{ padding: '8px 15px', cursor: 'pointer', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}>
              Cancel
            </button>
            <button type="submit" style={{ padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              {habit ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HabitModal;
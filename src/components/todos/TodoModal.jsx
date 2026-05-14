import React, { useState, useEffect } from 'react';
import { createTodo, updateTodo } from '../../api/services/todo.service.js';

const TodoModal = ({ todo, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'pending',
    due_date: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title || '',
        description: todo.description || '',
        priority: todo.priority || 'medium',
        status: todo.status || 'pending',
        due_date: todo.due_date ? todo.due_date.split('T')[0] : ''
      });
    }
  }, [todo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (todo) {
        await updateTodo(todo.id, formData);
      } else {
        await createTodo(formData);
      }
      onSuccess();
    } catch (err) {
      alert(err.response?.data?.error || 'Operation failed.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const modalOverlayStyle = {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center',
    alignItems: 'center', zIndex: 1000
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', width: '500px', maxHeight: '80vh', overflowY: 'auto' }}>
        <h3 style={{ marginTop: 0 }}>{todo ? 'Edit Todo' : 'Add New Todo'}</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label>Title *</label>
            <input 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              required 
              style={{ width: '100%', padding: '8px' }} 
            />
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <label>Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              rows="3"
              style={{ width: '100%', padding: '8px' }} 
            />
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <label>Priority</label>
            <select 
              name="priority" 
              value={formData.priority} 
              onChange={handleChange} 
              required 
              style={{ width: '100%', padding: '8px' }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          
          {todo && (
            <div style={{ marginBottom: '10px' }}>
              <label>Status</label>
              <select 
                name="status" 
                value={formData.status} 
                onChange={handleChange} 
                style={{ width: '100%', padding: '8px' }}
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          )}
          
          <div style={{ marginBottom: '20px' }}>
            <label>Due Date</label>
            <input 
              type="date" 
              name="due_date" 
              value={formData.due_date} 
              onChange={handleChange} 
              style={{ width: '100%', padding: '8px' }} 
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" onClick={onClose} disabled={loading}>Cancel</button>
            <button 
              type="submit" 
              disabled={loading}
              style={{ 
                backgroundColor: '#007bff', 
                color: 'white', 
                padding: '8px 15px', 
                border: 'none', 
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Saving...' : (todo ? 'Update' : 'Create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoModal;
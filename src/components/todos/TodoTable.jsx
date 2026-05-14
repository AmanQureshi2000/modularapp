import React, { useEffect, useState } from 'react';
import { getTodos, deleteTodo, toggleTodoComplete } from '../../api/services/todo.service.js';

const TodoTable = ({ onEdit, filters, onRefresh }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, [filters]); // This will re-run when filters change

  const fetchTodos = async () => {
    try {
      setLoading(true);
      // Remove empty filters
      const activeFilters = {};
      if (filters.status && filters.status !== '') activeFilters.status = filters.status;
      if (filters.priority && filters.priority !== '') activeFilters.priority = filters.priority;
      if (filters.search && filters.search !== '') activeFilters.search = filters.search;
      
      console.log('Sending filters to backend:', activeFilters); // Debug log
      
      const response = await getTodos(activeFilters);
      console.log('Response from backend:', response); // Debug log
      
      // Handle both response formats
      const todosData = response.data || (Array.isArray(response) ? response : []);
      setTodos(Array.isArray(todosData) ? todosData : []);
    } catch (err) {
      setError('Failed to fetch todos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        await deleteTodo(id);
        await fetchTodos();
        if (onRefresh) onRefresh();
      } catch (err) {
        alert(err.response?.data?.error || 'Delete failed');
      }
    }
  };

  const handleToggleComplete = async (id, currentStatus) => {
    try {
      await toggleTodoComplete(id);
      await fetchTodos();
      if (onRefresh) onRefresh();
    } catch (err) {
      alert(err.response?.data?.error || 'Toggle failed');
      console.error(err);
    }
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: '#4caf50',
      medium: '#ff9800',
      high: '#f44336',
      urgent: '#9c27b0'
    };
    return colors[priority] || '#666';
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#ff9800',
      in_progress: '#2196f3',
      completed: '#4caf50',
      archived: '#9e9e9e'
    };
    return colors[status] || '#666';
  };

  if (loading) return <p>Loading todos...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ overflowX: 'auto' }}>
      <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th style={{ width: '50px' }}>Done</th>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.length > 0 ? (
            todos.map((todo) => (
              <tr key={todo.id} style={{ backgroundColor: todo.status === 'completed' ? '#f0f0f0' : 'white' }}>
                <td style={{ textAlign: 'center' }}>
                  <input 
                    type="checkbox" 
                    checked={todo.status === 'completed'}
                    onChange={() => handleToggleComplete(todo.id, todo.status)}
                    style={{ cursor: 'pointer', width: '20px', height: '20px' }}
                  />
                </td>
                <td style={{ textDecoration: todo.status === 'completed' ? 'line-through' : 'none' }}>
                  {todo.title}
                </td>
                <td>{todo.description || '-'}</td>
                <td>
                  <span style={{ 
                    backgroundColor: getPriorityColor(todo.priority), 
                    color: 'white', 
                    padding: '4px 8px', 
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {todo.priority}
                  </span>
                </td>
                <td>
                  <span style={{ 
                    backgroundColor: getStatusColor(todo.status), 
                    color: 'white', 
                    padding: '4px 8px', 
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {todo.status?.replace('_', ' ') || todo.status}
                  </span>
                </td>
                <td>{todo.due_date ? new Date(todo.due_date).toLocaleDateString() : '-'}</td>
                <td>{todo.created_at ? new Date(todo.created_at).toLocaleDateString() : '-'}</td>
                <td>
                  <button onClick={() => onEdit(todo)} style={{ marginRight: '5px' }}>Edit</button>
                  <button 
                    onClick={() => handleDelete(todo.id)} 
                    style={{ color: 'red' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center' }}>No todos available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TodoTable;
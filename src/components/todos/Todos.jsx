import React, { useState } from 'react';
import TodoTable from "./TodoTable";
import TodoModal from "./TodoModal";
import TodoStats from "./TodoStats";
import TodoFilters from "./TodoFilters";

export default function Todos() {
  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    search: ''
  });

  // This function will be passed to TodoTable to refresh stats
  const refreshStats = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleAdd = () => {
    setSelectedTodo(null);
    setShowModal(true);
  };

  const handleEdit = (todo) => {
    setSelectedTodo(todo);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedTodo(null);
  };

  const handleSuccess = () => {
    setRefreshKey(prev => prev + 1);  // Refresh stats after add/edit
    handleClose();
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setRefreshKey(prev => prev + 1);  // Refresh stats when filter changes
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Todo Management</h2>
        <button 
          onClick={handleAdd}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#28a745', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Add Todo
        </button>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ flex: '1' }}>
          <TodoStats refreshKey={refreshKey} />
        </div>
        <div style={{ flex: '1' }}>
          <TodoFilters filters={filters} onFilterChange={handleFilterChange} />
        </div>
      </div>
      
      {/* Pass refreshStats to TodoTable */}
      <TodoTable 
        key={refreshKey} 
        onEdit={handleEdit} 
        filters={filters}
        onRefresh={refreshStats}  // ← ADD THIS
      />

      {showModal && (
        <TodoModal 
          todo={selectedTodo} 
          onClose={handleClose} 
          onSuccess={handleSuccess} 
        />
      )}
    </div>
  );
}
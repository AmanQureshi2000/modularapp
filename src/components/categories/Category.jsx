import React, { useState } from 'react';
import Table from "./Table";
import CategoryModal from "./CategoryModal";

export default function Categories() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAdd = () => {
    setSelectedCategory(null);
    setShowModal(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedCategory(null);
  };

  const handleSuccess = () => {
    setRefreshKey(prev => prev + 1);
    handleClose();
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Category Management</h2>
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
          Add Category
        </button>
      </div>
      
      <Table key={refreshKey} onEdit={handleEdit} />

      {showModal && (
        <CategoryModal 
          category={selectedCategory} 
          onClose={handleClose} 
          onSuccess={handleSuccess} 
        />
      )}
    </div>
  );
}
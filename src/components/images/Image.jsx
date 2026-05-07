import React, { useState } from 'react';
import Table from "./Table";
import ImageModal from "./ImageModal";

export default function Images() {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAdd = () => {
    setSelectedImage(null);
    setShowModal(true);
  };

  const handleEdit = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  const handleSuccess = () => {
    setRefreshKey(prev => prev + 1); // Triggers Table refresh
    handleClose();
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Image Gallery Management</h2>
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
          Add Image
        </button>
      </div>
      
      <Table key={refreshKey} onEdit={handleEdit} />

      {showModal && (
        <ImageModal 
          image={selectedImage} 
          onClose={handleClose} 
          onSuccess={handleSuccess} 
        />
      )}
    </div>
  );
}
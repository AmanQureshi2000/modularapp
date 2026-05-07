import React, { useState } from 'react';
import Table from "./Table";
import ComputerModal from "./ComputerModal";

export default function Computers() {
  const [showModal, setShowModal] = useState(false);
  const [selectedComputer, setSelectedComputer] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAdd = () => {
    setSelectedComputer(null);
    setShowModal(true);
  };

  const handleEdit = (computer) => {
    setSelectedComputer(computer);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedComputer(null);
  };

  const handleSuccess = () => {
    setRefreshKey(prev => prev + 1); // Triggers Table re-fetch
    handleClose();
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Computer Management</h2>
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
          Add Computer
        </button>
      </div>
      
      <Table key={refreshKey} onEdit={handleEdit} />

      {showModal && (
        <ComputerModal 
          computer={selectedComputer} 
          onClose={handleClose} 
          onSuccess={handleSuccess} 
        />
      )}
    </div>
  );
}
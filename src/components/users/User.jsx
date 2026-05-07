import React, { useState } from 'react';
import Table from "./Table";
import UserModal from "./UserModal";

export default function Users() {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAdd = () => {
    setSelectedUser(null);
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleSuccess = () => {
    setRefreshKey(prev => prev + 1); // Forces Table refresh
    handleClose();
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>User Management</h2>
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
          Add User
        </button>
      </div>
      
      <Table key={refreshKey} onEdit={handleEdit} />

      {showModal && (
        <UserModal 
          user={selectedUser} 
          onClose={handleClose} 
          onSuccess={handleSuccess} 
        />
      )}
    </div>
  );
}
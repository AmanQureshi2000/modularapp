import React, { useState } from 'react';
import Table from "./Table";
import BookModal from "./BookModal";

export default function Books() {
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAdd = () => {
    setSelectedBook(null);
    setShowModal(true);
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  const handleSuccess = () => {
    // Incrementing the key forces the Table to re-mount/re-fetch
    setRefreshKey(prev => prev + 1);
    handleClose();
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Book Management</h2>
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
          Add Book
        </button>
      </div>
      
      {/* The key prop ensures the table refreshes after adding/editing */}
      <Table key={refreshKey} onEdit={handleEdit} />

      {showModal && (
        <BookModal 
          book={selectedBook} 
          onClose={handleClose} 
          onSuccess={handleSuccess} 
        />
      )}
    </div>
  );
}
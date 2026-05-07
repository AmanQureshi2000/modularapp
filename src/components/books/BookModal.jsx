import React, { useState, useEffect } from 'react';
import { createBook, updateBook } from '../../api/services/book.service.js';

const BookModal = ({ book, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    price: '',
    stock_count: '',
    published_date: ''
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || '',
        author: book.author || '',
        isbn: book.isbn || '',
        price: book.price || '',
        stock_count: book.stock_count || '',
        published_date: book.published_date || ''
      });
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (book) {
        await updateBook(book.id, formData);
      } else {
        await createBook(formData);
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
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', width: '400px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginTop: 0 }}>{book ? 'Edit Book' : 'Add New Book'}</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label>Title</label>
            <input name="title" value={formData.title} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Author</label>
            <input name="author" value={formData.author} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>ISBN</label>
            <input name="isbn" value={formData.isbn} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
          </div>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <div style={{ flex: 1 }}>
              <label>Price</label>
              <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label>Stock</label>
              <input type="number" name="stock_count" value={formData.stock_count} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
            </div>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Published Date</label>
            <input type="date" name="published_date" value={formData.published_date} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" onClick={onClose} style={{ padding: '8px 15px', cursor: 'pointer' }}>Cancel</button>
            <button type="submit" style={{ padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              {book ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookModal;
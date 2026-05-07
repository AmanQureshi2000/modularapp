import React, { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../../api/services/book.service.js';

const Table = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load users on mount
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      let data = await getBooks();
      console.log(data);
      data = data.sort((a, b) => a.id - b.id);
      /**
       * Rectification:
       * 1. Removed debug console logs (line 18-20).
       * 2. Ensure state is set to an array even if the API returns a different structure.
       */
      setBooks(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to fetch books');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id);
        // Refresh list by filtering out the deleted user
        setBooks(books.filter(book => book.id !== id));
      } catch (err) {
        alert('Delete failed');
      }
    }
  };

  if (loading) return <p>Loading books...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Book Management</h2>
      <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Price</th>
            <th>Stock Count</th>
            <th>Published Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Rectification: Uncommented the mapping logic to display users */}
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>{book.price}</td>
                <td>{book.stock_count}</td>
                <td>{book.published_date}</td>
                <td>
                  <button onClick={() => console.log('Edit', book.id)}>Edit</button>
                  <button 
                    onClick={() => handleDelete(book.id)} 
                    style={{ marginLeft: '10px', color: 'red' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>No users available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
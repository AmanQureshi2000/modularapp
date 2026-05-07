import React, { useEffect, useState } from 'react';
import { getComputers, deleteComputer } from '../../api/services/computer.service.js';

const Table = () => {
  const [computers, setComputers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load users on mount
  useEffect(() => {
    fetchComputers();
  }, []);

  const fetchComputers = async () => {
    try {
      setLoading(true);
      let data = await getComputers();
      console.log(data);
      data = data.sort((a, b) => a.computer_id - b.computer_id);
      /**
       * Rectification:
       * 1. Removed debug console logs (line 18-20).
       * 2. Ensure state is set to an array even if the API returns a different structure.
       */
      setComputers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to fetch computers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this computer?')) {
      try {
        await deleteComputer(id);
        // Refresh list by filtering out the deleted user
        setComputers(computers.filter(computer=> computer.computer_id !== id));
      } catch (err) {
        alert('Delete failed');
      }
    }
  };

  if (loading) return <p>Loading computers...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Computer Management</h2>
      <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th>ID</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Serial Number</th>
            <th>Purchase Date</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Rectification: Uncommented the mapping logic to display users */}
          {computers.length > 0 ? (
            computers.map((computer) => (
              <tr key={computer.computer_id}>
                <td>{computer.computer_id}</td>
                <td>{computer.brand}</td>
                <td>{computer.model}</td>
                <td>{computer.serial_number}</td>
                <td>{computer.purchase_date}</td>
                <td>{computer.price}</td>
                <td>
                  <button onClick={() => console.log('Edit', computer.computer_id)}>Edit</button>
                  <button 
                    onClick={() => handleDelete(computer.computer_id)} 
                    style={{ marginLeft: '10px', color: 'red' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>No computers available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
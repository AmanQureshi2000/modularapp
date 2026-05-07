import React, { useEffect, useState } from 'react';
import { getComputers, deleteComputer } from '../../api/services/computer.service.js';

const Table = ({ onEdit }) => {
  const [computers, setComputers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchComputers();
  }, []);

  const fetchComputers = async () => {
    try {
      setLoading(true);
      let data = await getComputers();
      // Rectification: Removed debug logs and ensured array structure
      data = data.sort((a, b) => a.computer_id - b.computer_id);
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
        setComputers(computers.filter(comp => comp.computer_id !== id));
      } catch (err) {
        alert('Delete failed');
      }
    }
  };

  if (loading) return <p>Loading computers...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
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
        {computers.length > 0 ? (
          computers.map((computer) => (
            <tr key={computer.computer_id}>
              <td>{computer.computer_id}</td>
              <td>{computer.brand}</td>
              <td>{computer.model}</td>
              <td>{computer.serial_number}</td>
              <td>{computer.purchase_date}</td>
              <td>${computer.price}</td>
              <td>
                <button onClick={() => onEdit(computer)}>Edit</button>
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
            <td colSpan="7" style={{ textAlign: 'center' }}>No computers available.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
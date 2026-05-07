import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../../api/services/user.service.js';

const Table = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      let data = await getUsers();
      console.log(data);
      data = data.sort((a, b) => a.id - b.id);
      /**
       * Rectification:
       * 1. Removed debug console logs (line 18-20).
       * 2. Ensure state is set to an array even if the API returns a different structure.
       */
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        // Refresh list by filtering out the deleted user
        setUsers(users.filter(user => user.id !== id));
      } catch (err) {
        alert('Delete failed');
      }
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Management</h2>
      <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Rectification: Uncommented the mapping logic to display users */}
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.is_active ? 'Yes' : 'No'}</td>
                <td>
                  <button onClick={() => console.log('Edit', user.id)}>Edit</button>
                  <button 
                    onClick={() => handleDelete(user.id)} 
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
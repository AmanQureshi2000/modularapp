import React, { useEffect, useState } from 'react';
import { getHabits, deleteHabit, archiveHabit, restoreHabit,getArchivedHabits } from '../../api/services/habit.service.js';

const HabitTable = ({ onEdit }) => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showArchived, setShowArchived] = useState(false);
  const [archivedHabits, setArchivedHabits] = useState([]);

  useEffect(() => {
    if (showArchived) {
      fetchArchivedHabits();
    } else {
      fetchHabits();
    }
  }, [showArchived]);

  const fetchHabits = async () => {
    try {
      setLoading(true);
      let data = await getHabits();
      setHabits(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to fetch habits');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchArchivedHabits = async () => {
    try {
      setLoading(true);
      // You'll need to add getArchivedHabits to your service
      let data = await getArchivedHabits();
      setArchivedHabits(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to fetch archived habits');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this habit?')) {
      try {
        await deleteHabit(id);
        fetchHabits();
      } catch (err) {
        alert('Delete failed');
      }
    }
  };

  const handleArchive = async (id) => {
    if (window.confirm('Archive this habit? You can restore it later.')) {
      try {
        await archiveHabit(id);
        fetchHabits();
      } catch (err) {
        alert('Archive failed');
      }
    }
  };

  const handleRestore = async (id) => {
    try {
      await restoreHabit(id);
      fetchArchivedHabits();
    } catch (err) {
      alert('Restore failed');
    }
  };

  const getFrequencyLabel = (type, target) => {
    if (type === 'daily') return 'Daily';
    if (type === 'weekly') return target ? `${target} days/week` : 'Weekly';
    if (type === 'monthly') return target ? `${target} days/month` : 'Monthly';
    return type;
  };

  if (loading) return <p>Loading habits...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  const currentData = showArchived ? archivedHabits : habits;

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setShowArchived(false)}
          style={{ 
            padding: '8px 15px', 
            marginRight: '10px',
            backgroundColor: !showArchived ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Active Habits
        </button>
        <button 
          onClick={() => setShowArchived(true)}
          style={{ 
            padding: '8px 15px',
            backgroundColor: showArchived ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Archived Habits
        </button>
      </div>

      <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Frequency</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((habit) => (
              <tr key={habit.id}>
                <td>{habit.id}</td>
                <td><strong>{habit.name}</strong></td>
                <td>{habit.description || '-'}</td>
                <td>{getFrequencyLabel(habit.frequency_type, habit.target_days_per_week || habit.target_days_per_month)}</td>
                <td>{new Date(habit.created_at).toLocaleDateString()}</td>
                <td>
                  {!showArchived ? (
                    <>
                      <button onClick={() => onEdit(habit)}>Edit</button>
                      <button 
                        onClick={() => handleArchive(habit.id)} 
                        style={{ marginLeft: '10px', backgroundColor: '#ffc107' }}
                      >
                        Archive
                      </button>
                      <button 
                        onClick={() => handleDelete(habit.id)} 
                        style={{ marginLeft: '10px', color: 'red' }}
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => handleRestore(habit.id)} 
                        style={{ backgroundColor: '#28a745', color: 'white' }}
                      >
                        Restore
                      </button>
                      <button 
                        onClick={() => handleDelete(habit.id)} 
                        style={{ marginLeft: '10px', color: 'red' }}
                      >
                        Delete Permanently
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>
                {showArchived ? 'No archived habits.' : 'No habits available. Add your first habit!'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HabitTable;
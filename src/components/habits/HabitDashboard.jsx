import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboard, completeHabit, uncompleteHabit } from '../../api/services/habit.service.js';

const HabitDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const data = await getDashboard();
      setDashboard(data);
    } catch (err) {
      setError('Failed to load dashboard');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (habit) => {
    try {
      if (habit.completedToday) {
        const completionId = habit.completionId;
        await uncompleteHabit(completionId);
      } else {
        await completeHabit(habit.id);
      }
      await fetchDashboard();
    } catch (err) {
      alert('Failed to update habit completion');
      console.error(err);
    }
  };

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      {/* Navigation Bar */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '30px',
        paddingBottom: '20px',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <h1 style={{ margin: 0 }}>Habit Tracker</h1>
        <button 
          onClick={() => navigate('/habits/manage')}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Manage Habits
        </button>
      </div>

      {/* Stats Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        color: 'white', 
        padding: '30px', 
        borderRadius: '10px',
        marginBottom: '30px'
      }}>
        <p style={{ marginTop: '10px', fontSize: '18px' }}>{dashboard?.date}</p>
        
        <div style={{ display: 'flex', gap: '40px', marginTop: '20px' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '32px' }}>{dashboard?.stats?.totalHabits || 0}</h2>
            <p style={{ margin: 0, opacity: 0.9 }}>Total Habits</p>
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '32px' }}>{dashboard?.stats?.completedToday || 0}</h2>
            <p style={{ margin: 0, opacity: 0.9 }}>Completed Today</p>
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '32px' }}>{dashboard?.stats?.completionRate || 0}%</h2>
            <p style={{ margin: 0, opacity: 0.9 }}>Completion Rate</p>
          </div>
        </div>
      </div>

      {/* Today's Habits Section */}
      <div>
        <h2>Today's Habits</h2>
        {dashboard?.habits?.map(habit => (
          <div 
            key={habit.id}
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <input
                  type="checkbox"
                  checked={habit.completedToday}
                  onChange={() => handleToggleComplete(habit)}
                  style={{
                    width: '24px',
                    height: '24px',
                    cursor: 'pointer'
                  }}
                />
                <div>
                  <h3 style={{ margin: 0, textDecoration: habit.completedToday ? 'line-through' : 'none' }}>
                    {habit.name}
                  </h3>
                  {habit.description && (
                    <p style={{ margin: '5px 0 0', color: '#666', fontSize: '14px' }}>
                      {habit.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '14px', color: '#666' }}>
                Streak: 🔥 {habit.streak?.current_streak || 0} days
              </div>
              <div style={{ fontSize: '12px', color: '#999' }}>
                Best: {habit.streak?.longest_streak || 0}
              </div>
            </div>
          </div>
        ))}

        {dashboard?.habits?.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <p>No habits yet. Click "Manage Habits" to create your first habit!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HabitDashboard;
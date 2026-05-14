import React, { useEffect, useState } from 'react';
import { getTodoStats } from '../../api/services/todo.service.js';

const TodoStats = ({ refreshKey }) => {  // ← ADD THIS: receive refreshKey
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, [refreshKey]);  // ← ADD THIS: re-run when refreshKey changes

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await getTodoStats();
      const statsData = response.data || response;
      setStats(statsData);
    } catch (err) {
      setError('Failed to fetch stats');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading stats...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!stats) return null;

  return (
    <div style={{ 
      padding: '15px', 
      backgroundColor: '#f8f9fa', 
      borderRadius: '8px',
      border: '1px solid #dee2e6'
    }}>
      <h3 style={{ marginTop: 0, marginBottom: '15px' }}>Statistics</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
        <div style={{ textAlign: 'center', padding: '10px', backgroundColor: 'white', borderRadius: '4px' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>{stats.total || 0}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Total Tasks</div>
        </div>
        <div style={{ textAlign: 'center', padding: '10px', backgroundColor: 'white', borderRadius: '4px' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>{stats.completed || 0}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Completed</div>
        </div>
        <div style={{ textAlign: 'center', padding: '10px', backgroundColor: 'white', borderRadius: '4px' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffc107' }}>{stats.pending || 0}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Pending</div>
        </div>
        <div style={{ textAlign: 'center', padding: '10px', backgroundColor: 'white', borderRadius: '4px' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#17a2b8' }}>{stats.in_progress || 0}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>In Progress</div>
        </div>
      </div>
      
      {(stats.high_priority_pending !== undefined || stats.overdue !== undefined) && (
        <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px solid #dee2e6' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', fontSize: '12px' }}>
            {stats.high_priority_pending !== undefined && (
              <div>High Priority Pending: <strong style={{ color: '#f44336' }}>{stats.high_priority_pending}</strong></div>
            )}
            {stats.urgent_pending !== undefined && (
              <div>Urgent Pending: <strong style={{ color: '#9c27b0' }}>{stats.urgent_pending}</strong></div>
            )}
            {stats.overdue !== undefined && (
              <div>Overdue: <strong style={{ color: '#ff9800' }}>{stats.overdue}</strong></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoStats;
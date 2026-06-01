import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HabitTable from "./HabitTable";
import HabitModal from "./HabitModal";

export default function Habits() {
  const [showModal, setShowModal] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  const handleAdd = () => {
    setSelectedHabit(null);
    setShowModal(true);
  };

  const handleEdit = (habit) => {
    setSelectedHabit(habit);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedHabit(null);
  };

  const handleSuccess = () => {
    setRefreshKey(prev => prev + 1);
    handleClose();
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Navigation Bar */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px',
        paddingBottom: '20px',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <div>
          <button 
            onClick={() => navigate('/habits')}
            style={{ 
              padding: '8px 15px', 
              backgroundColor: '#6c757d', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer',
              marginRight: '15px'
            }}
          >
            ← Back to Dashboard
          </button>
          <h2 style={{ margin: 0, display: 'inline-block' }}>Habit Management</h2>
        </div>
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
          + Add Habit
        </button>
      </div>
      
      <HabitTable key={refreshKey} onEdit={handleEdit} />

      {showModal && (
        <HabitModal 
          habit={selectedHabit} 
          onClose={handleClose} 
          onSuccess={handleSuccess} 
        />
      )}
    </div>
  );
}
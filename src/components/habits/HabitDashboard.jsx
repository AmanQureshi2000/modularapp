import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboard, completeHabit, uncompleteHabit,getChartData } from '../../api/services/habit.service.js';
import HabitCharts from './HabitCharts.jsx';

const HabitDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState('today'); // 'today', 'week', 'month'
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboard();
    fetchChartData();
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

 const fetchChartData = async () => {
    try {
      const data = await getChartData();
      setChartData(data);
    } catch (err) {
      console.error('Failed to load chart data:', err);
    }
  };

  const handleToggleComplete = async (habit) => {
    try {
      if (habit.completedToday) {
        await uncompleteHabit(habit.completionId);
      } else {
        await completeHabit(habit.id);
      }
      await fetchDashboard();
    } catch (err) {
      alert('Failed to update habit completion');
      console.error(err);
    }
  };

  const getStreakIcon = (streak) => {
    if (streak >= 30) return '🔥🔥🔥';
    if (streak >= 14) return '🔥🔥';
    if (streak >= 7) return '🔥';
    if (streak >= 3) return '⭐';
    return '🟢';
  };

  const getMotivationalMessage = (completionRate) => {
    if (completionRate === 100) return "Perfect day! You're crushing it! 🎉";
    if (completionRate >= 75) return "Great progress! Keep going! 💪";
    if (completionRate >= 50) return "Good job! You're halfway there! 👍";
    if (completionRate >= 25) return "Nice start! Let's complete more! 🌟";
    if (completionRate > 0) return "Every step counts! You've got this! ✨";
    return "Start your day by completing some habits! 🚀";
  };

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '48px' }}>⏳</div>
        <p>Loading your habits...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
      <p>{error}</p>
      <button onClick={fetchDashboard}>Try Again</button>
    </div>
  );

  const completionRate = dashboard?.stats?.completionRate || 0;
  const motivationalMessage = getMotivationalMessage(completionRate);

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header with Gradient */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        color: 'white', 
        padding: '30px 20px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <div>
              <h1 style={{ margin: 0, fontSize: '32px' }}>📊 Habit Tracker</h1>
              <p style={{ margin: '10px 0 0', opacity: 0.9 }}>{motivationalMessage}</p>
            </div>
            <button 
              onClick={() => navigate('/habits/manage')}
              style={{ 
                padding: '12px 24px', 
                backgroundColor: 'rgba(255,255,255,0.2)', 
                color: 'white', 
                border: '2px solid white',
                borderRadius: '8px', 
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '16px',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
            >
              ⚙️ Manage Habits
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        {/* Date Picker and View Toggle */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '12px',
          marginBottom: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
            <div>
              <label style={{ fontWeight: 'bold', marginRight: '10px' }}>📅 Date:</label>
              <input 
                type="date" 
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ddd' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => setViewMode('today')}
                style={{ 
                  padding: '8px 16px',
                  backgroundColor: viewMode === 'today' ? '#667eea' : '#e0e0e0',
                  color: viewMode === 'today' ? 'white' : '#333',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Today
              </button>
              <button 
                onClick={() => setViewMode('week')}
                style={{ 
                  padding: '8px 16px',
                  backgroundColor: viewMode === 'week' ? '#667eea' : '#e0e0e0',
                  color: viewMode === 'week' ? 'white' : '#333',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                This Week
              </button>
              <button 
                onClick={() => setViewMode('month')}
                style={{ 
                  padding: '8px 16px',
                  backgroundColor: viewMode === 'month' ? '#667eea' : '#e0e0e0',
                  color: viewMode === 'month' ? 'white' : '#333',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                This Month
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px', 
          marginBottom: '30px' 
        }}>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '20px', 
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            borderTop: '4px solid #667eea'
          }}>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#667eea' }}>
              {dashboard?.stats?.totalHabits || 0}
            </div>
            <div style={{ color: '#666', marginTop: '10px' }}>Total Habits</div>
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '20px', 
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            borderTop: '4px solid #48bb78'
          }}>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#48bb78' }}>
              {dashboard?.stats?.completedToday || 0}
            </div>
            <div style={{ color: '#666', marginTop: '10px' }}>Completed Today</div>
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '20px', 
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            borderTop: '4px solid #ed8936'
          }}>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#ed8936' }}>
              {completionRate}%
            </div>
            <div style={{ color: '#666', marginTop: '10px' }}>Completion Rate</div>
            <div style={{ 
              marginTop: '10px', 
              height: '8px', 
              backgroundColor: '#e0e0e0', 
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{ 
                width: `${completionRate}%`, 
                height: '100%', 
                backgroundColor: '#ed8936',
                transition: 'width 0.5s ease'
              }} />
            </div>
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '20px', 
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            borderTop: '4px solid #f56565'
          }}>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#f56565' }}>
              {dashboard?.habits?.reduce((max, habit) => Math.max(max, habit.streak?.longest_streak || 0), 0)}
            </div>
            <div style={{ color: '#666', marginTop: '10px' }}>Best Streak</div>
          </div>
        </div>

        {chartData && dashboard && (
        <div style={{ marginBottom: '30px' }}>
          <HabitCharts 
            habitsData={{
              habits: dashboard.habits,
              completionRate: dashboard.stats?.completionRate || 0,
              length: dashboard.habits?.length || 0
            }}
            weeklyData={chartData.weeklyData}
            monthlyData={chartData.monthlyData}
          />
        </div>
      )}

        {/* Today's Habits Section */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>✅</span> Today's Habits
            <span style={{ fontSize: '14px', color: '#666', fontWeight: 'normal' }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </h2>

          {dashboard?.habits?.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#999' }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>📝</div>
              <h3>No habits yet!</h3>
              <p>Click "Manage Habits" to create your first habit and start tracking.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '15px' }}>
              {dashboard?.habits?.map(habit => {
                const currentStreak = habit.streak?.current_streak || 0;
                const longestStreak = habit.streak?.longest_streak || 0;
                const streakIcon = getStreakIcon(currentStreak);
                
                return (
                  <div 
                    key={habit.id}
                    style={{
                      backgroundColor: habit.completedToday ? '#f0fff4' : 'white',
                      padding: '20px',
                      borderRadius: '12px',
                      border: `2px solid ${habit.completedToday ? '#48bb78' : '#e0e0e0'}`,
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleToggleComplete(habit)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px' }}>
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          backgroundColor: habit.completedToday ? '#48bb78' : '#e0e0e0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 'bold'
                        }}>
                          {habit.completedToday ? '✓' : '○'}
                        </div>
                        <div>
                          <h3 style={{ 
                            margin: 0, 
                            textDecoration: habit.completedToday ? 'line-through' : 'none',
                            color: habit.completedToday ? '#999' : '#333'
                          }}>
                            {habit.name}
                          </h3>
                          {habit.description && (
                            <p style={{ margin: '5px 0 0', color: '#666', fontSize: '14px' }}>
                              {habit.description}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div style={{ textAlign: 'right', minWidth: '150px' }}>
                        <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
                          {streakIcon} Current: {currentStreak} day{currentStreak !== 1 ? 's' : ''}
                        </div>
                        <div style={{ fontSize: '12px', color: '#999' }}>
                          🏆 Best: {longestStreak} day{longestStreak !== 1 ? 's' : ''}
                        </div>
                        {habit.frequency_type !== 'daily' && (
                          <div style={{ fontSize: '12px', color: '#667eea', marginTop: '5px' }}>
                            {habit.frequency_type === 'weekly' ? '📅 Weekly goal' : '📆 Monthly goal'}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Quick Stats Footer */}
          {dashboard?.habits?.length > 0 && (
            <div style={{ 
              marginTop: '20px', 
              paddingTop: '20px', 
              borderTop: '1px solid #e0e0e0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px',
              fontSize: '14px',
              color: '#666'
            }}>
              <div>
                🎯 Completion Goal: {completionRate < 100 ? `${100 - completionRate} more to go!` : 'Perfect score! 🎉'}
              </div>
              <div>
                💪 Keep pushing! Every habit counts.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HabitDashboard;
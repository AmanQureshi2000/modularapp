import React from 'react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const HabitCharts = ({ habitsData, weeklyData, monthlyData }) => {
  
  // Weekly Completion Chart (Line Chart)
  const weeklyCompletionData = {
    labels: weeklyData?.labels || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Habits Completed',
        data: weeklyData?.completions || [0, 0, 0, 0, 0, 0, 0],
        borderColor: 'rgb(102, 126, 234)',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: 'rgb(102, 126, 234)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: 'Target',
        data: weeklyData?.targets || [habitsData?.length || 0, habitsData?.length || 0, habitsData?.length || 0, habitsData?.length || 0, habitsData?.length || 0, habitsData?.length || 0, habitsData?.length || 0],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.05)',
        borderWidth: 2,
        borderDash: [5, 5],
        tension: 0.4,
        fill: false,
        pointRadius: 0,
      },
    ],
  };

  const weeklyOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          boxWidth: 10,
        },
      },
      title: {
        display: true,
        text: 'Weekly Progress',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += context.parsed.y;
            if (context.dataset.label === 'Habits Completed') {
              const total = habitsData?.length || 1;
              const percentage = Math.round((context.parsed.y / total) * 100);
              label += ` (${percentage}%)`;
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: habitsData?.length || 10,
        title: {
          display: true,
          text: 'Number of Habits',
          font: {
            weight: 'bold',
          },
        },
      },
      x: {
        title: {
          display: true,
          text: 'Day of Week',
          font: {
            weight: 'bold',
          },
        },
      },
    },
  };

  // Overall Completion Doughnut Chart
  const completionRate = habitsData?.completionRate || 0;
  const doughnutData = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [completionRate, 100 - completionRate],
        backgroundColor: ['#48bb78', '#e0e0e0'],
        borderColor: ['#38a169', '#cbd5e0'],
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          boxWidth: 10,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: `Today's Progress: ${completionRate}%`,
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${value}%`;
          },
        },
      },
    },
  };

  // Monthly Progress Bar Chart
  const monthlyProgressData = {
    labels: monthlyData?.labels || ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Completed Habits',
        data: monthlyData?.completions || [0, 0, 0, 0],
        backgroundColor: 'rgba(102, 126, 234, 0.7)',
        borderColor: 'rgb(102, 126, 234)',
        borderWidth: 1,
        borderRadius: 8,
        hoverBackgroundColor: 'rgba(102, 126, 234, 0.9)',
      },
      {
        label: 'Missed Habits',
        data: monthlyData?.missed || [0, 0, 0, 0],
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 1,
        borderRadius: 8,
        hoverBackgroundColor: 'rgba(239, 68, 68, 0.9)',
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          boxWidth: 10,
        },
      },
      title: {
        display: true,
        text: 'Monthly Overview',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: ${value}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Habits',
          font: {
            weight: 'bold',
          },
        },
        stacked: false,
      },
      x: {
        title: {
          display: true,
          text: 'Time Period',
          font: {
            weight: 'bold',
          },
        },
      },
    },
  };

  // Streak Distribution Bar Chart
  const streakData = {
    labels: habitsData?.habits?.map(h => h.name?.substring(0, 15)) || [],
    datasets: [
      {
        label: 'Current Streak (days)',
        data: habitsData?.habits?.map(h => h.streak?.current_streak || 0) || [],
        backgroundColor: 'rgba(237, 137, 54, 0.7)',
        borderColor: 'rgb(237, 137, 54)',
        borderWidth: 1,
        borderRadius: 8,
      },
      {
        label: 'Longest Streak (days)',
        data: habitsData?.habits?.map(h => h.streak?.longest_streak || 0) || [],
        backgroundColor: 'rgba(102, 126, 234, 0.7)',
        borderColor: 'rgb(102, 126, 234)',
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const streakOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          boxWidth: 10,
        },
      },
      title: {
        display: true,
        text: 'Habit Streaks Comparison',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Days',
          font: {
            weight: 'bold',
          },
        },
      },
      x: {
        title: {
          display: true,
          text: 'Habits',
          font: {
            weight: 'bold',
          },
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '20px', marginBottom: '30px' }}>
      {/* Doughnut Chart - Overall Progress */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        height: '350px'
      }}>
        <Doughnut data={doughnutData} options={doughnutOptions} />
      </div>

      {/* Line Chart - Weekly Progress */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        height: '350px'
      }}>
        <Line data={weeklyCompletionData} options={weeklyOptions} />
      </div>

      {/* Bar Chart - Streak Comparison */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        height: '400px'
      }}>
        <Bar data={streakData} options={streakOptions} />
      </div>

      {/* Bar Chart - Monthly Progress */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        height: '400px'
      }}>
        <Bar data={monthlyProgressData} options={barOptions} />
      </div>
    </div>
  );
};

export default HabitCharts;
import { Routes, Route } from 'react-router-dom';
import Habits from '../components/habits/Habits';  // Adjust path based on your structure
import HabitDashboard from '../components/habits/HabitDashboard';

const HabitRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HabitDashboard />} />
      <Route path="/manage" element={<Habits />} />
    </Routes>
  );
};

export default HabitRoutes;
import { Routes, Route } from 'react-router-dom';
import Users from '../components/users/User';

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
    </Routes>
  );
};

export default UserRoutes;

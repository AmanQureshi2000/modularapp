import { Routes, Route } from 'react-router-dom';
import Computers from '../components/computers/Computer';

const ComputerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Computers />} />
    </Routes>
  );
};

export default ComputerRoutes;

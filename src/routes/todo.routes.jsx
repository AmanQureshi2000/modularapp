import { Routes, Route } from 'react-router-dom';
import Todos from '../components/todos/Todos';

const TodoRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Todos />} />
    </Routes>
  );
};

export default Todos;

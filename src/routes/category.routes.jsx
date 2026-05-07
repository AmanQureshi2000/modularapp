import { Routes, Route } from 'react-router-dom';
import Categories from '../components/categories/Category';

const CategoryRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Categories />} />
    </Routes>
  );
};

export default CategoryRoutes;

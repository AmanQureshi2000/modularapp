import { Routes, Route } from 'react-router-dom';
import Books from '../components/books/Book';

const BookRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Books />} />
    </Routes>
  );
};

export default BookRoutes;

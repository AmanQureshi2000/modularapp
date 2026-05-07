import { Routes, Route } from 'react-router-dom';
import Images from '../components/images/Image';

const ImageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Images />} />
    </Routes>
  );
};

export default ImageRoutes;

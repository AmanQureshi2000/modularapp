import { Routes, Route } from 'react-router-dom';
import Youtube from '../components/youtube/Youtube';

const YoutubeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Youtube />} />
    </Routes>
  );
};

export default YoutubeRoutes;

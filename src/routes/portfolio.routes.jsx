import { Routes, Route } from 'react-router-dom';
import Portfolio from '../components/portfolio/Portfolio';

const PortfolioRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
    </Routes>
  );
};

export default PortfolioRoutes;

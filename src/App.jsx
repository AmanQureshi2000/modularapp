// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserRoutes,BookRoutes,ComputerRoutes,CategoryRoutes,ImageRoutes,YoutubeRoutes,PortfolioRoutes } from './routes'; // Clean single-line import
import Portfolio from './components/portfolio/Portfolio';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users/*" element={<UserRoutes />} />
        <Route path="/books/*" element={<BookRoutes />} />
        <Route path="/computers/*" element={<ComputerRoutes />} />
        <Route path="/categories/*" element={<CategoryRoutes />} />
        <Route path="/images/*" element={<ImageRoutes />} />
        <Route path="/youtube/*" element={<YoutubeRoutes/>} />
        <Route path="/portfolio/*" element={<PortfolioRoutes/>}/>
        <Route path="/" element={<h1>Welcome</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserRoutes,BookRoutes,ComputerRoutes,CategoryRoutes } from './routes'; // Clean single-line import

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users/*" element={<UserRoutes />} />
        <Route path="/books/*" element={<BookRoutes />} />
        <Route path="/computers/*" element={<ComputerRoutes />} />
        <Route path="/categories/*" element={<CategoryRoutes />} />
        <Route path="/" element={<h1>Welcome</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

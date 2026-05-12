// App.jsx
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Import your lazy-loaded routes
import { 
  UserRoutes, 
  BookRoutes, 
  ComputerRoutes, 
  CategoryRoutes, 
  ImageRoutes, 
  YoutubeRoutes, 
  PortfolioRoutes 
} from './routes'; 

function App() {
  return (
    <BrowserRouter>
      {/* Suspense catches the "waiting" state of lazy components */}
      <Suspense fallback={<div style={{ padding: '20px' }}>Loading page...</div>}>
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
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
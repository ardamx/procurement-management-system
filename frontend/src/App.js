import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainMenu from './pages/MainMenu';
import SupplierPage from './pages/SupplierPage';
import PartPage from './pages/PartPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/suppliers" element={<SupplierPage />} />
        <Route path="/parts" element={<PartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
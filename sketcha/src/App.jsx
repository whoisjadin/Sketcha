import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Landing from './pages/Landing';
import Webapp from './pages/Webapp';
import './assets/mobile_icon.png';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sketch" element={<Webapp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
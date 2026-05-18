import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../AdminDashboard';
import Home from '../CarpetAccelerator';

function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
      <Route path="/AdminDashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default AppRoutes;
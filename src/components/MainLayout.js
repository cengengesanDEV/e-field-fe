import React from 'react';
import Navbar from './parents/Navbar';
import Footer from './parents/Footer';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div className='' style={{ minHeight: '100vh' }}>
      <div style={{ maxHeight: '20vh' }}>
        <Navbar />
      </div>
      <div style={{ minHeight: '70vh' }}>
        <Outlet />
      </div>
      <div style={{ height: '10vh' }}>
        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;

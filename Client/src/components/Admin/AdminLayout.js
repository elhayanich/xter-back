import React from 'react';
import SideBar from './sideBar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <SideBar />   {}
      <main style={{ flex: 1, padding: '20px' }}>
        <Outlet />  {}
      </main>
    </div>
  );
};

export default AdminLayout;

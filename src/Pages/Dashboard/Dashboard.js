import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <>
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-sidebar"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          {/* <!-- Page content here --> */}
          <Outlet />
        </div>
        {/* lg:fixed lg:h-screen */}
        <div className="drawer-side shadow-xl lg:mr-4">
          <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 overflow-y-auto w-48 bg-base-100 text-base-content">
            {/* <!-- Sidebar content here --> */}
            <li>
              <Link to={'/dashboard'}>My Appointment</Link>
            </li>
            <li>
              <Link to={'my-review'}>My Review</Link>
            </li>
            <li>
              <Link to={'users'}>All Users</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

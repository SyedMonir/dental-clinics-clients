import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import useAdmin from '../../hooks/useAdmin';
import Loading from '../Shared/Loading';

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  const [admin] = useAdmin(user);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    // console.log(error);
  }

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
            {admin && (
              <>
                <li>
                  <Link to={'users'}>All Users</Link>
                </li>
                <li>
                  <Link to={'add-doctor'}>Add Doctor</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

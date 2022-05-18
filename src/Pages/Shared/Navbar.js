import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, NavLink } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from './Loading';

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    // console.log(error);
  }
  const logout = () => {
    signOut(auth);
    localStorage.removeItem('accessToken');
  };
  const menuItem = (
    <>
      <li>
        <NavLink to={'/'}>Home</NavLink>
      </li>
      <li>
        <NavLink to={'/appointment'}>Appointment</NavLink>
      </li>
      <li>
        <NavLink to={'/reviews'}>Reviews</NavLink>
      </li>
      <li>
        <NavLink to={'/contact-us'}>Contact Us</NavLink>
      </li>
      <li>
        <NavLink to={'/about'}>About</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to={'/dashboard'}>Dashboard</NavLink>
        </li>
      )}
      <li>
        {user ? (
          <button onClick={logout} className="btn btn-ghost">
            Sign-out
          </button>
        ) : (
          <NavLink to={'/login'}>Login</NavLink>
        )}
      </li>
    </>
  );
  return (
    <>
      <nav className="navbar sticky top-0 z-50 bg-base-100 justify-between shadow-lg uppercase px-12 mb-4">
        {/* For Mobile */}
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex="0" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex="1"
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menuItem}
            </ul>
          </div>
          <Link to={'/'} className="btn btn-ghost normal-case text-xl">
            DentalClinics
          </Link>
        </div>
        {/* For Computer */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">{menuItem}</ul>
        </div>
        {user && (
          <div className="navbar-end">
            <label
              tabIndex="2"
              htmlFor="dashboard-sidebar"
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;

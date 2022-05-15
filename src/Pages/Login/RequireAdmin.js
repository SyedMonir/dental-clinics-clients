import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import auth from '../../firebase.init';
import useAdmin from '../../hooks/useAdmin';
import Loading from '../Shared/Loading';

const RequireAdmin = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const [admin, adminLoading] = useAdmin(user);

  if (loading || adminLoading) {
    return <Loading />;
  }
  if (error) {
    // console.log(error);
  }

  if (!user || !admin) {
    signOut(auth);
    return <Navigate to="/login" />;
  }

  return children;
};

export default RequireAdmin;

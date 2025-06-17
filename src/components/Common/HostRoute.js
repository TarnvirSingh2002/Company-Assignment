import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const HostRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  // Redirect to login if not authenticated, or to home if not a host
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isHost) {
    return <Navigate to="/" replace />; // Or a more specific "access denied" page
  }

  return children;
};

export default HostRoute;
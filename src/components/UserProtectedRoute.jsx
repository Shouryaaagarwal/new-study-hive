import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const UserProtectedRoute = ({ children }) => {
  const { Usersignin } = useSelector((state) => state.user);

  if (!Usersignin) {
    return <Navigate to="/user/signin" replace />;
  }

  return children;
};

export default UserProtectedRoute;

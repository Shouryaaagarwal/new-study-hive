import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
  const { signin } = useSelector((state) => state.admin);

  if (!signin) {
    return <Navigate to="/admin/signin" replace />;
  }

  return children;
};

export default AdminProtectedRoute;

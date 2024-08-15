import React from 'react'
import { Navigate } from 'react-router-dom' 
import { useSelector } from 'react-redux'

function UniversalProtector({children}) {
    const { Usersignin } = useSelector((state) => state.user); 
    const { signin } = useSelector((state) => state.admin);

    if (!Usersignin && !signin) {
      return <Navigate to="/"  replace />;
    }    
    
   


return children;
    
  
}

export default UniversalProtector

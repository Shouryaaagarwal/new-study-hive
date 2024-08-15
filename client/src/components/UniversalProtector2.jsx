import React from 'react'
import { Navigate } from 'react-router-dom' 
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

function UniversalProtector2({children}) {
 const{Usersignin}  = useSelector(state=>state.user) ; 
 const {signin}  =  useSelector(state=>state.admin) ;  

     
 if(Usersignin || signin){
  return <Navigate to = "/home"  replace/>
 }
  
  


return children;
    
  
}

export default UniversalProtector2 


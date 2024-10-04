import React, { useEffect } from 'react';
import loader from '../assets/cargando.gif'; 
import { useNavigate } from 'react-router';

function LoadingPage() { 
  const navigate = useNavigate();

  useEffect(() => {    
    const timer = setTimeout(() => {
      navigate('/error'); 
    }, 100000);

    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className='w-full h-screen bg-black'> 

      <div className='w-full h-[100vh] flex flex-col items-center justify-center bg-black'>
        <img  className="w-40 h-40"  src={loader} alt="Loading..." />
     </div> 
     <div className='h-[60vh] bg-black'> 

     </div>
     

         
    </div>
  );
}

export default LoadingPage;

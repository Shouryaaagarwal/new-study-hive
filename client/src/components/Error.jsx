import React from 'react' 
import error from  "../assets/error.gif"
import { useNavigate } from 'react-router' 
import { IoIosArrowBack } from "react-icons/io";


function Error() { 
    const navigate =  useNavigate() ; 
    const handleClick = ()=>{
        navigate("/home") ; 
    }
  return (
    <div className='w-full h-screen flex items-center justify-center bg-black '> 

        <button onClick={handleClick}  className='text-white'> 
        <IoIosArrowBack size={30} />
                
            </button> 
    <div className='bg-black'>
      <img  className=" "  src={error} alt="Loading..." /> 

 
    </div> 
   

  </div>
  )
}
// https://docs.google.com/document/d/1nhrSrOMc2qVu55M1hFdV4iIceJH3ZEb7kx4-WdZukLY/edit
export default Error

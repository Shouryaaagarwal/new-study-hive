import React from 'react' 
import { LuDownload } from "react-icons/lu"; 
import { FaRegStar } from "react-icons/fa";



function subject() { 
  const handlestar=()=>{
        
  } 
  const handledownload=()=>{

  }
  return (
    <div className='w-[90%] h-20 bg-black text-white mt-3 rounded-lg'>
      <div className='flex gap-3 flex-row px-2 items-center '> 
        <p className="mt-5 w-[50%] border-2 px-3 border-black rounded" >Input</p> 
        <button  onClick={handledownload}  className='mt-5'> 
        <LuDownload size={22} />
        </button>   
           <button  onClick={handlestar}   className='mt-5'> 
        <FaRegStar size={22} />
           </button>

      </div>
    </div>
  )
}

export default subject

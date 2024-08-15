 
import React from 'react';
import { MdArrowOutward } from 'react-icons/md';
import { Link } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom'; 
import { RxCross1 } from "react-icons/rx";


function SignInAs() {  
  const navigate = useNavigate();
  const handleclick=()=>{
    navigate("/home") ; 
  }
  return ( 
    <div className=' bg-black w-full '>
      <div className=' bg-black items-center justify-center flex gap-5 '>

        <Link
          to="/admin/signin"
          className="bg-black hover:scale-105 hover:transition  hover:duration-300 px-7 py-5 border-[1px] opacity-[0.9] rounded-lg text-white mt-7 text-sm font-normal flex items-center justify-center gap-3 group shadow-md"
        >
           Admin
          <MdArrowOutward
            className="transition-transform duration-300 ease-in-out group-hover:animate-rotate"
            size={14}
          />
        </Link>
        <Link
          to="/user/signin" 
          className="bg-black hover:scale-105 hover:transition  hover:duration-300 px-7 py-5 border-[1px] opacity-[0.9] rounded-lg text-white mt-7 text-sm font-normal flex items-center justify-center gap-3 group shadow-md"
        >
           User
          <MdArrowOutward
            className="transition-transform duration-300 ease-in-out group-hover:animate-rotate"
            size={14}
          />
        </Link>
      </div>
    </div>
      
  );
}

export default SignInAs;


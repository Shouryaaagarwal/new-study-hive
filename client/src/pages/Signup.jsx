import React, { useState } from "react";
// import Buttons from "../components/Buttons";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MdArrowOutward } from "react-icons/md";
import Navigation from "../components/Navigation";
import Contact from "../components/Contacts"; 
import { useNavigate } from "react-router-dom";
 import GoogleOauth from "../components/GoogleOuth"
import { useDispatch, useSelector } from "react-redux";
import { usersigninStart, usersignupFailure, usersignupStart, usersignupSuccess } from "../Redux/Slices/userSlice";
import LoadingPage from "../components/LoadingPage";
import GoogleOuth from "../components/GoogleOuth";
function Signup() { 
  const navigate = useNavigate() ;  
  const dispatch = useDispatch() ;  
  const {loading}  =  useSelector(state=>state.user) ; 
    
  const [formData, setFormData]=useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try { 
      dispatch(usersignupStart()) ; 
      const res = await fetch(`${process.env.BACKEND}/api/user/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success ===false){
        dispatch(usersignupFailure(data.message)) ; 
        return  ; 
      }  
      dispatch(usersignupSuccess(data)) ; 
      navigate("/user/signin")
    } catch (error) {   
      dispatch(usersignupFailure(error)) ; 

    }
  };

  return ( 
    <div className="w-full h-screen bg-black ">  

    <div>  

   <Navigation/>
    <div className="w-full bg-black text-white   flex items-center justify-center gap-3 flex-col">
      <h1 className="text-[40px] sm:text-[50px] mukta-bold mt-10">User Sign-Up</h1>
      <div className="flex flex-col w-full h-[90%] gap-5 items-center">

        <form
          onSubmit={handleSubmit}
          className="flex flex-col mt-10  gap-4 items-center"
        >
         <input
              type="text"
              id="username"
              placeholder="username"
              value={formData.username}
              onChange={handleChange}
              className="w-[60vw] h-[40px] mt-2 p-2 border-[1px] bg-black focus:outline-none opacity-[0.8] rounded-md mukta-light sm:w-[40vw]"
            />
         <input
              type="email"
              id="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
              className="w-[60vw] h-[40px] mt-2 p-2 border-[1px] bg-black focus:outline-none opacity-[0.8] rounded-md mukta-light sm:w-[40vw]"
            />
         <input
              type="password"
              id="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
              className="w-[60vw] h-[40px] mt-2 p-2 border-[1px] bg-black focus:outline-none opacity-[0.8] rounded-md mukta-light sm:w-[40vw]"
            />

          <div className="flex gap-5 justify-center items-center  mt-4 sm:flex-row sm:gap-10 sm:flex sm:w-[80%] w-[100%]   flex-col">
            <button
              type="submit"
              className="hover:scale-110 border-[1px] opacity-[0.9] transition-transform duration-300 hover:rounded bg-black px-6 py-5 text-white text-sm font-normal flex items-center justify-center gap-3 group"
              >
              Sign-Up
              <MdArrowOutward
                className="transition-transform duration-300 ease-in-out group-hover:animate-rotate "
                size={14}
              />
            </button>  
            

            <div className="hover:scale-110  border-[1px] opacity-[0.8] transition-transform duration-300 hover:rounded overflow-hidden"> 

             <GoogleOuth />
              </div>
            
            
          </div>
        </form>
      </div>
    </div>  
    
       </div>  
       <div className="w-full md:h-[62vh] h-[40vh]  bg-black"> </div>

    </div>
  );
}

export default Signup;

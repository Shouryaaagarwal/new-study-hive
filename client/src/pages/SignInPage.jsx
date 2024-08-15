import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router";
import Contact from "../components/Contacts";
import Navigation from "../components/Navigation";
import { Link } from "react-router-dom"; 
import GoogleOuth from "../components/GoogleOuth";
import { useDispatch, useSelector } from "react-redux";
import { usersigninFailure, usersigninStart, usersigninSuccess } from "../Redux/Slices/userSlice";
import LoadingPage from "../components/LoadingPage";

function SignInPage() {   

  const navigate = useNavigate(); 
  const dispatch  =  useDispatch() ;  
  const {currentUser , usersignin , usersignout , error , loading} =  useSelector(state=>state.user) ;
  const [formData, setFormData] = useState({
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
      dispatch(usersigninStart()) ;
      const res = await fetch(`${process.env.BACKEND}/api/user/auth/signIn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: 'include' , 
      });
      const data = await res.json();
      
      if(data.statuscode===400){
        dispatch(usersigninFailure(data.message)) ;  
        return ;
      } 
      dispatch(usersigninSuccess(data)) ; 
      navigate("/home")  
      

    } catch (error) {
      dispatch(usersigninFailure(error)) ;  
    }
  };

  return (
    <div className="w-full h-screen bg-black text-white"> 

   <div> 
      <Navigation />
      
      <div className="w-full  flex items-center justify-center gap-3 flex-col">
        <h1 className="text-[50px] mukta-medium opacity-[0.9] mt-14 ">User Sign-In</h1>
        <div className="flex flex-col w-full h-[90%] gap-5 items-center">
          <div
            className="flex flex-col gap-4 items-center"
          >
            <input
              type="email"
              id="email"
              placeholder="email"
              onChange={handleChange}
              className="w-[60vw] h-[40px] mt-8 p-2 border-[1px] bg-black focus:outline-none opacity-[0.8] rounded-md mukta-light sm:w-[40vw]"
            />
            <input
              type="password"
              id="password"
              placeholder="password"
              onChange={handleChange}
              className="w-[60vw] h-[40px] mt-2 p-2 border-[1px] bg-black focus:outline-none opacity-[0.8] rounded-md mukta-light sm:w-[40vw]"
            /> 
             
                  {error?<p className="text-red-700 mukta-medium font-bold">Invalid Credentials !!!</p>:""}
              <div className="flex flex-col md:flex-row  sm:gap-10 sm:flex-row gap-4 justify-center mt-4 w-[40vw] sm:flex-wrap">
              <button
                type="button" 
                onClick={handleSubmit}
                className="hover:scale-110 border-[1px] opacity-[0.9] transition-transform duration-300 hover:rounded bg-black px-6 py-5 text-white text-sm font-normal flex items-center justify-center gap-3 group"
              >
                Sign-In
                <MdArrowOutward
                  className="transition-transform duration-300 ease-in-out group-hover:animate-rotate"
                  size={14}
                />
              </button> 
              <div className="hover:scale-110  flex justify-center border-[1px] opacity-[0.8] transition-transform duration-300 hover:rounded overflow-hidden"> 

             <GoogleOuth />
              </div>

           
            </div>
          </div>
      <h1 className="mukta-extralight font-thin mt-2  text-center">
        Don't have an account?{" "}
        <Link to="/user/signup" className="underline mukta-extrabold mb-10">Sign-Up</Link>
      </h1>
        </div>
      </div> 
      
      </div>
      <div className="w-full md:h-[62vh] h-[40vh]  bg-black"> </div>

    </div>
  );
}

export default SignInPage;

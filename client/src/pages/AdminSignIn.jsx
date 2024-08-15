
import React, { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { adminsigninFailure, adminsigninStart, adminsigninSuccess } from "../Redux/Slices/adminSlice";
import LoadingPage from "../components/LoadingPage";
import Navigation from "../components/Navigation";
import { checkedtrue } from "../Redux/Slices/checksignin";

function AdminSignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.admin); 
  const {signedin}  = useSelector(state=>state.check) ; 
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    try {
      dispatch(adminsigninStart());
      const res = await fetch("http://localhost:3000/api/admin/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          adminemail: formData.email,
          adminname: formData.username,
          isAdmin: true
        }),
        credentials: "include",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(adminsigninFailure(data.message));
        return;
      }
      dispatch(adminsigninSuccess(data)); 
      dispatch(checkedtrue()) ; 
      navigate("/admin/profile");
    } catch (error) {
      dispatch(adminsigninFailure(error.message));
    }
  };

  return (
    <div className="w-full h-screen bg-black text-white"> 
      {loading ? <LoadingPage /> : <div> 
        <Navigation/>
        <div className="w-full flex items-center justify-center gap-3 flex-col">
          <h1 className="text-[40px]  sm:text-[50px]  md:text-[50px] opacity-[0.9] mukta-bold mt-16">Admin Sign-In</h1> 
                <p className="mukta-light font-thin w-[90%] sm:w-[50%] sm:text-lg text-center text-sm leading-6  opacity-[0.9]">Welcome to the Admin Sign-In page of Study hive. Please enter your username and email to access administrative features</p>
          <div className="flex flex-col w-full h-[90%] gap-5 items-center">
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <div className="flex flex-col gap-4 items-center"> 
            <input
                type="text"
                id="username"
                placeholder="Admin Name"
                value={formData.username}
                onChange={handleChange}
                className="w-[60vw] h-[40px] p-2 mt-6   border-[1px] font-semibold bg-black focus:outline-none opacity-[0.8] rounded-md mukta-extralight md:w-[40vw] sm:w-[40vw]"
                />
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-[60vw] h-[40px] mt-2 p-2 border-[1px] font-semibold bg-black focus:outline-none opacity-[0.8] rounded-md mukta-extralight sm:w-[40vw]"
              />
              
                {error && <p className="text-red-700 mukta-extralight font-semibold">{error}</p>}
        
              <div className="flex flex-col sm:flex sm:gap-10 sm:flex-row gap-4 justify-center mt-4 w-[40vw] sm:flex-wrap">
                <button
                  type="button"    
                  onClick={handleSubmit}
                  className="bg-black border-[1px] px-6 py-5 hover:scale-110 transition-transform duration-500 hover:rounded text-white text-sm font-normal flex items-center justify-center gap-3 group"
                >
                  Sign-In
                  <MdArrowOutward
                    className="transition-transform duration-300 ease-in-out group-hover:animate-rotate"
                    size={14}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      <div className="w-full md:h-[60vh] sm:h-[30vh] h-[35vh] sm:mt-40 mt-40 md:mt-[100px] bg-black"> </div> 

      </div>} 

    </div>
  );
}

export default AdminSignIn;


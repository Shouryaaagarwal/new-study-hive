
import React, { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router";
import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  adminsignoutFailure,
  adminsignoutStart,
  adminsignoutSuccess,
} from "../Redux/Slices/adminSlice";
import LoadingPage from "../components/LoadingPage";
import { checkedfalse } from "../Redux/Slices/checksignin";
import { reset } from "../Redux/Slices/starslice";

function AdminProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentAdmin, loading, error } = useSelector((state) => state.admin); 
  const { signedin } = useSelector((state) => state.check);
  const [formData, setFormData] = useState({
    adminname: currentAdmin?.adminname || "",
    email: currentAdmin?.adminemail || "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      dispatch(adminsignoutStart(true));
      const res = await fetch("http://localhost:3000/api/admin/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(adminsignoutFailure(data.message));
        return;
      }
      dispatch(adminsignoutSuccess(data));   
      dispatch(reset())
      dispatch(checkedfalse());
      navigate("/home");
    } catch (error) {
      dispatch(adminsignoutFailure(error.message));
    }
  };

  
 

  return (
    <div className="w-full h-screen bg-black text-white">
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="w-full  h-screen">
          <Navigation />
          <div className="w-full bg-black  flex items-center justify-center gap-3 flex-col">
            <h1 className="text-[40px] sm:text-[40px] md:text-[50px] mukta-bold opacity-[0.9] mt-10">
              Admin Profile
            </h1>
            <p className="opacity-[0.9] sm:w-[60%] md:w-[70%] w-[90%] text-center mukta-light font-thin">
              Welcome to your Admin Profile on StudyHive. Here, you can create and manage subject resources. Additionally, you have access to student feedback to address any issues or concerns promptly.
            </p>

            <div className="flex flex-col w-full h-[100%] mt-10 gap-5 items-center">
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              <form className="flex flex-col gap-4 items-center">
                <input
                  type="text"
                  id="adminname"
                  placeholder="Admin Name"
                  readOnly
                  value={formData.adminname}
                  className="w-[60vw] h-[40px] mt-6 p-2 border-[1px] font-thin bg-black focus:outline-none opacity-[0.8] rounded-md mukta-extralight sm:w-[40vw]"
                />
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  readOnly
                  value={formData.email}
                  className="w-[60vw] h-[40px] mt-2 border-[1px] bg-black focus:outline-none opacity-[0.8] p-2 font-thin rounded-md mukta-extralight sm:w-[40vw]"
                />
                {error && <p className="text-red-700">Unable to sign out</p>}
                <div className="flex flex-col sm:flex sm:gap-10 sm:flex-row gap-4 justify-center mt-8  w-[40vw] sm:flex-wrap">
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="bg-black px-6 border-[1px] py-5 hover:scale-110 transition-transform duration-500 hover:rounded text-white text-sm font-normal flex items-center justify-center gap-3 group"
                  >
                    Sign-Out
                    <MdArrowOutward
                      className="transition-transform duration-300 ease-in-out group-hover:animate-rotate"
                      size={14}
                    />
                  </button>
                  <Link
                    to="/admin/create"
                    className="bg-black px-6 py-5 border-[1px] hover:scale-110 transition-transform duration-500 hover:rounded text-white text-sm font-normal flex items-center justify-center gap-3 group"
                  >
                    Create
                    <MdArrowOutward
                      className="transition-transform duration-300 ease-in-out group-hover:animate-rotate"
                      size={14}
                    />
                  </Link>
                  <Link
                    to="/admin/comments"
                    className="bg-black px-6 py-5 border-[1px] hover:scale-110 transition-transform duration-500 hover:rounded text-white text-sm font-normal flex items-center justify-center gap-3 group"
                  >
                    Comment
                    <MdArrowOutward
                      className="transition-transform duration-300 ease-in-out group-hover:animate-rotate"
                      size={14}
                    />
                  </Link>
                </div>
              </form>
            </div>
          <div className="w-full h-[40vh]  sm:h-[30vh]  md:mt-[120px] md:h-[51vh] bg-black"> </div>
          </div> 

        </div>

      )} 
    </div>
  );
}

export default AdminProfile;


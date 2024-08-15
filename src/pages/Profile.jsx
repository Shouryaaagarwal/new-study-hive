
import React, { useState } from "react";
import Navigation from "../components/Navigation";
import { MdArrowOutward } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  googleusersignin,
  googleusersignout,
  usersignoutFailure,
  usersignoutStart,
  usersignoutSuccess,
  userupdateFailure,
  userupdateStart,
  userupdateSuccess,
} from "../Redux/Slices/userSlice";
import LoadingPage from "../components/LoadingPage";
import { reset } from "../Redux/Slices/starslice";

function Profile() {
  const { Usersignin, currentUser, loading, error, GoogleUser } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    password: "",
  });
  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      dispatch(usersignoutStart());
      const res = await fetch(`${process.env.BACKEND}/api/user/auth/signout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
        credentials: "include",
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(usersignoutFailure(data.message));
        return;
      }

      dispatch(usersignoutSuccess(data.message));
      if (GoogleUser === true) {
        dispatch(googleusersignout());
      }
      dispatch(reset());

      navigate("/home");
    } catch (error) {
      dispatch(usersignoutFailure(error.message));
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      dispatch(userupdateStart());

      const updateData = {
        username: formData.username,
        email: formData.email,
      };

      if (formData.password) {
        updateData.password = formData.password;
      }

      const res = await fetch(
        `${process.env.BACKEND}/api/user/auth/updateuser/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success === false) {
        dispatch(userupdateFailure(data.message));
        return;
      }

      dispatch(userupdateSuccess(data));
      navigate("/home");
    } catch (error) {
      dispatch(userupdateFailure(error.message));
    }
  };

  return (
    <div className="w-full h-screen">
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="w-full h-screen bg-black text-white ">
          <Navigation />
          {GoogleUser ? (
           <div className="flex flex-col items-center justify-center mt-10 px-4 sm:px-8 md:px-16">
           <div className="text-3xl sm:text-4xl text-center mukta-light mt-6">
             Google User
           </div>
           <div className="w-full sm:w-[50%] mt-4 mx-auto flex items-center justify-center opacity-[0.7]">
             <p className="text-center mukta-extralight text-sm sm:text-base md:text-lg">
               Note: Google users cannot update their details directly. Please use your Google account to make changes or contact support for assistance.
             </p>
           </div>
           <div className="flex flex-col sm:flex-row md:flex-row items-center bg-black justify-center gap-6 sm:gap-10 mt-6 sm:mt-10">
             <button
               type="button"
               onClick={handleSignOut}
               className="hover:scale-110 transition-transform duration-500 hover:rounded border-2 border-gray-400 opacity-[0.8] bg-black px-4 sm:px-6 py-3 sm:py-5 text-sm sm:text-base font-normal flex items-center justify-center gap-2 sm:gap-3 group"
             >
               Sign-Out
               <MdArrowOutward
                 className="transition-transform duration-500 ease-in-out group-hover:animate-rotate"
                 size={14}
               />
             </button>
         
             {Usersignin && (
               <Link
                 to="/profile/yourfolder"
                 className="hover:scale-110 transition-transform duration-500 hover:rounded border-2 border-gray-400 opacity-[0.8] bg-black px-4 sm:px-6 py-3 sm:py-5 text-sm sm:text-base font-normal flex items-center justify-center gap-2 sm:gap-3 group"
               >
                 Your Folder
                 <MdArrowOutward
                   className="transition-transform duration-500 ease-in-out group-hover:animate-rotate"
                   size={14}
                 />
               </Link>
             )}
           </div>
         </div>
         
         
          ) : (
            <form>
              <div className="text-center mt-14 flex items-center justify-center gap-2 flex-col">
                <h1 className="mukta-light opacity-[0.9] text-[50px]">
                  Profile
                </h1>
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  value={formData.username}
                  className="w-[60vw] h-[40px] mt-8 p-2 border-[1px] bg-black focus:outline-none opacity-[0.8] rounded-md mukta-light sm:w-[40vw]"
                  placeholder="username"
                />
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  className="w-[60vw] h-[40px] mt-8 p-2 border-[1px] bg-black focus:outline-none opacity-[0.8] rounded-md mukta-light sm:w-[40vw]"
                  placeholder="email"
                />
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  className="w-[60vw] h-[40px] mt-8 p-2 border-[1px] bg-black focus:outline-none opacity-[0.8] rounded-md mukta-light sm:w-[40vw]"
                  placeholder="password"
                />
                {error ? (
                  <p className="text-red-700 mukta-medium font-semibold">
                    Cannot Update the Credentials
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="flex flex-col sm:flex-row md:flex-row items-center bg-black justify-center gap-10 mt-10">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="hover:scale-110 transition-transform duration-500 hover:rounded border-2 border-grray-400 opacity-[0.8] bg-black px-6 py-5 text-white text-sm font-normal flex items-center justify-center gap-3 group"
                >
                  Sign-Out
                  <MdArrowOutward
                    className="transition-transform duration-500 ease-in-out group-hover:animate-rotate"
                    size={14}
                  />
                </button>
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="hover:scale-110 transition-transform duration-500 hover:rounded border-2 border-grray-400 opacity-[0.8] bg-black px-6 py-5 text-white text-sm font-normal flex items-center justify-center gap-3 group"
                >
                  Update
                  <MdArrowOutward
                    className="transition-transform duration-500 ease-in-out group-hover:animate-rotate"
                    size={14}
                  />
                </button>
                {Usersignin && (
                  <Link
                    to="/profile/yourfolder"
                    className="hover:scale-110 transition-transform duration-500 hover:rounded border-2 border-grray-400 opacity-[0.8] bg-black px-6 py-5 text-white text-sm font-normal flex items-center justify-center gap-3 group"
                  >
                    Your Folder
                    <MdArrowOutward
                      className="transition-transform duration-500 ease-in-out group-hover:animate-rotate"
                      size={14}
                    />
                  </Link>
                )}
              </div>
            </form>
          )}
                 <div className="w-full md:h-[62vh] h-[40vh]  bg-black"> </div>
        </div>
      )} 


    </div>
  );
}

export default Profile;

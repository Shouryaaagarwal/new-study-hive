
import React, { useState } from "react";
import Navigation from "../components/Navigation";
import { Link, NavLink } from "react-router-dom";
import Buttons from "../components/Buttons";
import { IoBookSharp } from "react-icons/io5";

import SignInAs from "../components/SignInAs";
import { useSelector } from "react-redux";
import { MdArrowOutward } from "react-icons/md";

function Home2() {
  const { currentAdmin, signin, signout } = useSelector((state) => state.admin);
  const { currentUser, Usersignin, usersignout, usersignup } = useSelector(
    (state) => state.user
  );

  return (
    <div className="w-full h-screen bg-black text-white ">
      <div className="bg-black w-full pb-10 flex flex-col  items-center   ">
        <h1 className=" mt-16 sm:mt-16 md:mt-16  mukta-bold sm:text-[30px] md:text-[30px] text-[20px] text-white opacity-[0.2] uppercase">
          Welcome to studyhive
        </h1>
        <h1 className="mukta-light font-semibold sm:text-[30px] md:text-[40px] text-[30px]   text-center   ">
          Everything You Need for Smarter Studying <br />
          <span className="text-center"> All in One Place</span>
        </h1>
        <p className=" text-xs sm:text-sm md:text-sm  w-[100%] sm:w-[70%] md:w-[50%] sm:mt-14 md:mt-16   p-2  text-center mt-10 opacity-[0.7] leading-5">
          At StudyHive, we bring all your essential study materials into one
          convenient platform. Whether you need question papers, detailed
          subject notes, or important lecture links, you'll find everything
          here. Enjoy a streamlined and organized learning experience, tailored
          to meet all your academic needs in one place. Welcome to smarter
          studying with StudyHive!
        </p>
        <p className="mt-[150px] sm:mt-[120px] md:mt-[100px] mukta-extralight">
          How Would like to sign in ?
        </p>

        <SignInAs />
      </div> 
      <div className="w-full md:h-[55vh] h-[40vh]  bg-black"> </div>


    </div>
  );
}

export default Home2;

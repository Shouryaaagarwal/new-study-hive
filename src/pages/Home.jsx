
import React from "react";
import Navigation from "../components/Navigation";
import { IoBookSharp } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="w-full h-screen bg-black text-white">
      <Navigation />
      <div className="w-full bg-black flex flex-col items-center">
        <div className="flex items-center justify-center mt-20 sm:mt-10">
          <h1 className="text-white opacity-[0.5] sm:px-10 px-2 text-[60px] font-semibold sm:text-[70px] md:text-[100px]">
            STUDY<span className="text-white opacity-[0.4]">HIVE</span>
          </h1>
        </div>
        <p className="w-[80%] sm:w-[50%] md:w-[45%] text-center opacity-[0.8] text-xs sm:text-sm mt-8">
          Access all your exam resources in one place—detailed notes, past
          question papers, and essential links. Simplify your study experience
          with StudyHive, your go-to hub for academic success.
        </p>
        <div className="mt-10">
          <Link to="/select" className=" text-white px-6 py-3  rounded-lg mukta-semibold border-[1px] text-lg  hover:bg-white hover:opacity-[0.8] hover:text-black transition duration-300">
            Explore Resources
          </Link>
        </div>
        <div className="w-full flex flex-wrap justify-center mt-16">
          <div className="hover:bg-white hover:opacity-[0.7]  text-white hover:transition-transform hove:duration-300 border-[1px] hover:text-black p-6 rounded-lg m-4 w-[80%] sm:w-[30%] text-center">
            <IoBookSharp className="text-4xl mb-4" />
            <h2 className="text-xl font-semibold mb-2">Notes</h2>
            <p className="text-sm">Comprehensive notes for all subjects.</p>
          </div>
          <div className="hover:bg-white hover:opacity-[0.7]  text-white hover:transition-transform hove:duration-300 border-[1px] hover:text-black p-6 rounded-lg m-4 w-[80%] sm:w-[30%] text-center">
            <MdArrowOutward className="text-4xl mb-4" />
            <h2 className="text-xl font-semibold mb-2">Question Papers</h2>
            <p className="text-sm">Access previous exam papers easily.</p>
          </div>
          <div className="hover:bg-white hover:opacity-[0.7]  text-white hover:transition-transform hove:duration-300 border-[1px] hover:text-black p-6 rounded-lg m-4 w-[80%] sm:w-[30%] text-center">
              <IoBookSharp className="text-4xl mb-4" />
            <h2 className="text-xl font-semibold mb-2">Links</h2>
            <p className="text-sm">Important links for additional resources.</p>
          </div>
        </div>   
        <footer className="w-full  py-10 text-center mt-16">
        <div className='flex items-center justify-center mt-0 pt-0'>
    <hr className='w-[80%] sm:w-[80%] md:w-[60%] h-[0.6px] px-10 rounded-full opacity-[0.5] bg-white' />
  </div>
  <div className="text-white text-center mt-10 ">
          <h5 className="text-xs font-normal">
          &copy; 2024 StudyHive. All rights reserved.
          </h5>  
          <h5></h5>
        </div>
        </footer>
        <div className="w-full md:h-[50vh] h-[40vh]  bg-black"> </div>
        </div> 

    </div>
  );
}

export default Home;

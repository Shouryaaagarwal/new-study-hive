
import React from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";

function BeSemester() {
  const navigate = useNavigate();
  

  return (  
    <div className="bg-black  w-full h-[100vh]  text-white ">
      <Navigation />
      <div className="mt-10  bg-black  flex items-center justify-center">

        <div className="flex   flex-col   items-center justify-center gap-2 mx-auto w-[80%]  sm:w-[100%] bg-black p-5 rounded-lg"> 

          <h1 className="mb-3 text-white opacity-[0.7] sm:text-[40px] md:text-[40px] text-[20px] mukta-bold font-semibold">
            Bachelor's Of Engineering
          </h1>
          {/* </div> */}
          <div className="w-full flex   bg-black  gap-10 mt-10 flex-wrap items-center justify-center">
            <Link
              to="/b.e/i.t/subjects"
              className="border-[1px]  border-white text-white opacity-[0.9] sm:px-[4%] px-[12%] py-5 mukta-light hover:scale-110 transition-transform duration-300 rounded-md"
            >
              <h3>Information Technology (I.T)</h3>
            </Link>
            <Link
              to="/b.e/cse/subjects"
              className="border-white opacity-[0.9] border-[1px] sm:px-[5.1%] px-[16%] py-5 text-white mukta-light rounded-md hover:scale-110 transition-transform duration-300"
            >
              <h3>Computer Science (CSE)</h3>
            </Link>
            <Link
              to="/b.e/ece/subjects"
              className="border-white opacity-[0.9] border-[1px] sm:px-[2.3%] px-[4%] py-5 text-white mukta-light rounded-md hover:scale-110 transition-transform duration-300"
            >
              <h3>Electronics & Communication (ECE)</h3>
            </Link>
            <Link
              to="/b.e/eee/subjects"
              className="border-white opacity-[0.9] border-[1px] sm:px-[4%] px-[12%] py-5 text-white mukta-light rounded-md hover:scale-110 transition-transform duration-300"
            >
              <h3>Electrical & Electronics (EEE)</h3>
            </Link>   
            <Link
              to="/b.e/mech/subjects"
              className=" border-white opacity-[0.9] border-[1px] sm:px-[5%] px-[14%] py-5 text-white mukta-light rounded-md hover:scale-110 transition-transform duration-300"
            >
              <h3>Mechanical Eng. (Mech)</h3>
            </Link>
            <Link
              to="/b.e/biotech/subjects"
              className=" border-white opacity-[0.9] border-[1px] sm:px-[5%] px-[14%] py-5 text-white mukta-light rounded-md hover:scale-110 transition-transform duration-300"
            >
              <h3>Bio-Technology (BioTech)</h3>
            </Link>   
           
          </div>
        </div>
      </div> 
      <div className="w-full h-[40vh] md:h-[60vh] sm:mt-40 md:mt-40 bg-black"> </div>

    </div>
  );
}
 

export default BeSemester;  


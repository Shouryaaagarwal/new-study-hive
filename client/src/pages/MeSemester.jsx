
import React from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";

function MeSemester() {
  const navigate = useNavigate(); 
  const handleclick = ()=>{
    navigate(-1);
  }
  return (
    <div className="bg-black w-full h-screen">
      <Navigation />
      <div className="mt-10 bg-black flex items-center justify-center">
        
        <div className="flex flex-col items-center justify-center gap-2 mx-auto w-[80%] h-[90%] sm:w-[100%] bg-black p-5 rounded-lg">
          <h1 className="mb-3 text-white opacity-[0.7]  sm:text-[40px] md:text-[40px] text-[20px] mukta-bold font-semibold">
            Master's Of Engineering
          </h1>
          <div className="w-full flex  gap-10 mt-10 flex-wrap items-center justify-center">
            <Link
              to="/m.e/i.t/subjects"
              className="border-[1px]  border-white text-white opacity-[0.9] sm:px-[4%] px-[12%] py-5 mukta-light hover:scale-110 transition-transform duration-300 rounded-md"
            >
              <h3>Information Technology (I.T)</h3>
            </Link>   
            <Link
              to="/m.e/cybersec/subjects"
              className="border-white opacity-[0.9] border-[1px] sm:px-[4%] px-[25%] py-5 text-white mukta-light rounded-md hover:scale-110 transition-transform duration-300"
            >
              <h3>Cyber Security  </h3>
            </Link>  
            <Link
              to="/m.e/mtsciences/subjects"
              className="border-white opacity-[0.9] border-[1px] sm:px-[4%] px-[20%] py-5 text-white mukta-light rounded-md hover:scale-110 transition-transform duration-300"
            >
              <h3>Material Sciences </h3>
            </Link>   
            <Link
              to="/m.e/microelectronics/subjects"
              className="border-white opacity-[0.9] border-[1px] sm:px-[4%] px-[20%] py-5 text-white mukta-light rounded-md hover:scale-110 transition-transform duration-300"
            >
              <h3>Micro Electronics </h3>
            </Link>
            <Link
              to="/m.e/cse/subjects"
              className="border-white opacity-[0.9] border-[1px] sm:px-[5.1%] px-[16%] py-5 text-white mukta-light rounded-md hover:scale-110 transition-transform duration-300"
            >
              <h3>Computer Science (CSE)</h3>
            </Link>
            <Link
              to="/m.e/ece/subjects"
              className="border-white opacity-[0.9] border-[1px] sm:px-[2.3%] px-[4%] py-5 text-white mukta-light rounded-md hover:scale-110 transition-transform duration-300"
            >
              <h3>Electronics & Communication (ECE)</h3>
            </Link>
            <Link
              to="/m.e/eee/subjects"
              className="border-white opacity-[0.9] border-[1px] sm:px-[4%] px-[12%] py-5 text-white mukta-light rounded-md hover:scale-110 transition-transform duration-300"
            >
              <h3>Electrical Eng. (Power System)</h3>
            </Link>
            <Link
              to="/m.e/biotech/subjects"
              className=" border-white opacity-[0.9] border-[1px] sm:px-[5%] px-[14%] py-5 text-white mukta-light rounded-md hover:scale-110 transition-transform duration-300"
            >
              <h3>Bio-Technology (BioTech)</h3>
            </Link>
          </div>
        </div>
      </div> 
      <div className="w-full md:h-[60vh] sm:h-[30vh] h-[0.5vh] sm:mt-20 md:mt-20  bg-black"> </div>

    </div>
  );
}

export default MeSemester;


// import React, { useState } from "react";
// import { MdArrowOutward } from "react-icons/md";
// import { useNavigate } from "react-router";
// import Navigation from "../components/Navigation";

// function CreateSubjectList() {
//   const [degree, setDegree] = useState(""); 
//   const [error  , seterror] =  useState("") ; 
//   const [branch, setBranch] = useState(""); 
//   const navigate = useNavigate(); 

//   const handleSubmit = (event) => { 
//     event.preventDefault();  
//     if(!degree || !branch){
//       seterror("Please Fill All the fields") ;  
//       return  ; 
//      } 
//      seterror("") ; 
//     navigate(`${degree}/${branch}`); 
     
//   }; 

//   const handleClick = () => {
//     navigate("/admin/profile");
//   }
  
//   return (
//     <div className="w-full h-screen bg-black"> 
//       <Navigation/> 
//       <div className="w-full"> 
//         <div className="w-[100%] mx-auto mt-0 flex items-center justify-center">
//           <form action="" className="" onSubmit={handleSubmit}>
//             <div className="w-[100%] px-[50px] py-[80px] rounded-md text-white flex flex-col items-center justify-center gap-9"> 
//               <h1 className="text-[40px] mukta-light">Choose Degree And Branch</h1>
//               <div className="grid grid-cols-2 gap-x-4 ">
//                 <div className="flex flex-col">
//                   <label htmlFor="degree" className="mukta-light font-normal">Master's/Bachelor's</label>
//                   <select
//                     name="degree"
//                     value={degree}
//                     id="degree"
//                     className="bg-black text-white border-[1px] rounded-md p-2"
//                     onChange={(e) => setDegree(e.target.value)}
//                   >  
//                     <option value="">Select Degree</option>
//                     <option value="b.e">B.E</option>
//                     <option value="m.e">M.E</option>
//                   </select>
//                 </div>
//                 <div className="flex flex-col">
//                   <label htmlFor="branch" className="mukta-light font-normal">Branch</label>
//                   <select
//                     name="branch"
//                     id="branch" 
//                     value={branch}
//                     className="bg-black text-white border-[1px] rounded-md p-2 "
//                     onChange={(e) => setBranch(e.target.value)}
//                   >
//                     <option value="">Select Branch</option>
//                     <option value="i.t">Information Technology</option>
//                     <option value="cse">Computer Science</option>
//                     <option value="ece">Electronics and Communication</option>
//                     <option value="eee">Electrical and Electronics</option>
//                     <option value="mech">Mechanical Engineering</option>
//                     <option value="biotech">Biotechnology</option> 
//                     <option value="microelectronics">Micro Electronics</option> 
//                     <option value="matscience">Material Science</option> 
//                     <option value="cybersecurity">Cyber Security</option>
//                   </select>
//                 </div>
//               </div> 
//               {error?<p className="text-red-700 mukta-light text-sm">{error}</p>:""}
//               <div className="flex flex-row gap-5"> 
//                 <button
//                   type="button" 
//                   onClick={handleClick}
//                   className="bg-black border-[1px] hover:scale-110 transition-transform duration-300 hover:rounded px-5 py-4 text-white text-sm font-normal flex items-center justify-center gap-3 group"
//                 >
//                   Go back
//                   <div>
//                     <MdArrowOutward
//                       className="transition-transform duration-300 ease-in-out group-hover:animate-rotate"
//                       size={14}
//                     />
//                   </div>
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-black border-[1px] hover:scale-110 transition-transform duration-300 hover:rounded px-5 text-white text-sm font-normal py-4 flex items-center justify-center gap-3 group"
//                 >
//                   Next
//                   <div>
//                     <MdArrowOutward
//                       className="transition-transform duration-300 ease-in-out group-hover:animate-rotate"
//                       size={14}
//                     />
//                   </div>
//                 </button> 
//               </div>
//             </div>
//           </form>
//         </div>
//       </div> 
//       <div className="w-full sm:mt-20 md:mt-20  h-[45vh]  sm:h-[30vh]  md:h-[60vh] bg-black"> </div>
//     </div>
//   );
// }
 



// export default CreateSubjectList;


import React, { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router";
import Navigation from "../components/Navigation";

function CreateSubjectList() {
  const [degree, setDegree] = useState(""); 
  const [error, setError] = useState(""); 
  const [branch, setBranch] = useState(""); 
  const navigate = useNavigate(); 

  const handleSubmit = (event) => { 
    event.preventDefault();  
    if(!degree || !branch){
      setError("Please Fill All the fields");  
      return; 
    } 
    setError(""); 
    navigate(`${degree}/${branch}`); 
  }; 

  const handleClick = () => {
    navigate("/admin/profile");
  }

  // Define subject options based on degree
  const beSubjects = [
    { value: "i.t", label: "Information Technology" },
    { value: "cse", label: "Computer Science" },
    { value: "ece", label: "Electronics and Communication" },
    { value: "eee", label: "Electrical and Electronics" },
    { value: "mech", label: "Mechanical Engineering" },
    { value: "biotech", label: "Biotechnology" }
  ];

  const meSubjects = [ 
    { value: "i.t", label: "Information Technology" },
    { value: "cse", label: "Computer Science" },
    { value: "ece", label: "Electronics and Communication" },
    { value: "eee", label: "Electrical and Electronics" },
    { value: "mech", label: "Mechanical Engineering" },
    { value: "biotech", label: "Biotechnology" } , 
    { value: "microelectronics", label: "Micro Electronics" },
    { value: "matscience", label: "Material Science" },
    { value: "cybersecurity", label: "Cyber Security" }
  ];

  const subjects = degree === "b.e" ? beSubjects : meSubjects;

  return (
    <div className="w-full h-screen bg-black"> 
      <Navigation/> 
      <div className="w-full"> 
        <div className="w-[100%] mx-auto mt-0 flex items-center justify-center">
          <form action="" className="" onSubmit={handleSubmit}>
            <div className="w-[100%] px-[50px] py-[80px] rounded-md text-white flex flex-col items-center justify-center gap-9"> 
              <h1 className="text-[40px] mukta-light">Choose Degree And Branch</h1>
              <div className="grid grid-cols-2 gap-x-4 ">
                <div className="flex flex-col">
                  <label htmlFor="degree" className="mukta-light font-normal">Master's/Bachelor's</label>
                  <select
                    name="degree"
                    value={degree}
                    id="degree"
                    className="bg-black text-white border-[1px] rounded-md p-2"
                    onChange={(e) => setDegree(e.target.value)}
                  >  
                    <option value="">Select Degree</option>
                    <option value="b.e">B.E</option>
                    <option value="m.e">M.E</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="branch" className="mukta-light font-normal">Branch</label>
                  <select
                    name="branch"
                    id="branch" 
                    value={branch}
                    className="bg-black text-white border-[1px] rounded-md p-2"
                    onChange={(e) => setBranch(e.target.value)}
                  >
                    <option value="">Select Branch</option>
                    {subjects.map((subject) => (
                      <option key={subject.value} value={subject.value}>{subject.label}</option>
                    ))}
                  </select>
                </div>
              </div> 
              {error && <p className="text-red-700 mukta-light text-sm">{error}</p>}
              <div className="flex flex-row gap-5"> 
                <button
                  type="button" 
                  onClick={handleClick}
                  className="bg-black border-[1px] hover:scale-110 transition-transform duration-300 hover:rounded px-5 py-4 text-white text-sm font-normal flex items-center justify-center gap-3 group"
                >
                  Go back
                  <div>
                    <MdArrowOutward
                      className="transition-transform duration-300 ease-in-out group-hover:animate-rotate"
                      size={14}
                    />
                  </div>
                </button>
                <button
                  type="submit"
                  className="bg-black border-[1px] hover:scale-110 transition-transform duration-300 hover:rounded px-5 text-white text-sm font-normal py-4 flex items-center justify-center gap-3 group"
                >
                  Next
                  <div>
                    <MdArrowOutward
                      className="transition-transform duration-300 ease-in-out group-hover:animate-rotate"
                      size={14}
                    />
                  </div>
                </button> 
              </div>
            </div>
          </form>
        </div>
      </div> 
      <div className="w-full sm:mt-20 md:mt-20  h-[45vh]  sm:h-[30vh]  md:h-[60vh] bg-black"> </div>
    </div>
  );
}

export default CreateSubjectList;


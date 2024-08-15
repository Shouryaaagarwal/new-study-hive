

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { IoLinkSharp } from "react-icons/io5";
import { MdInsertComment } from "react-icons/md";
import { FaStar, FaRegFilePdf } from "react-icons/fa";
import LoadingPage from "../components/LoadingPage";
import Navigation from "../components/Navigation";
import { IoIosArrowDropdown, IoMdArrowRoundBack } from "react-icons/io";
import { toggleStar } from "../Redux/Slices/starslice";
import { stardoclink } from "../../../api/controllers/hit.controller";
import { subjectFailure, subjectfetcherror } from "../Redux/Slices/subjectSlice";
import { errorhandler } from "../Utils/errorhandler.js";

function MainData() {
  const { signin, loading } = useSelector((state) => state.admin);
  const { degree, branch, subject } = useParams();
  const [subjectData, setSubjectData] = useState([]);
  const [showPDF, setShowPDF] = useState(false);
  const [showQuestionPapers, setShowQuestionPapers] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [showDocumentationLink, setShowDocumentationLink] = useState(false);
  const navigate = useNavigate();

  const { Usersignin } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.BACKEND}/api/get/${degree}/${branch}/subjects/${subject}/data`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (data.success === false) {
          dispatch(subjectfetcherror(data.message));
          return;
        }
        setSubjectData(data);
      } catch (error) {

      }   dispatch(subjectFailure()) ; 
    };

    fetchData();
  }, [degree, branch, subject]);

  const handleBack = () => {
    navigate(-1);
  };

  const togglequesstar = async (id) => {
    try {
      const res = await fetch(
        `${process.env.BACKEND}/api/star/questionpaper/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data.success === false) {
            errorhandler(404 , "Something Went Wrong")
        return;
      }
      setSubjectData((prevData) =>
        prevData.map((item) =>
          item._id === id
            ? { ...item, starquestionotes: !item.starquestionotes }
            : item
        )
      );

      dispatch(
        toggleStar({
          id: data._id,
          starquestionotes: data.starquestionotes,   
          starsubjectnotes :data.starsubjectnotes , 
          starlecandpdflink :data.starlecandpdflink , 
          stardoclink : data.stardoclink , 
          data: data,
        })
      );
     

    } catch (error) {
          errorhandler(404 , "Somthing Went Wrong")
    }
  };

  const togglesubjectnotes = async (id) => {
    try {
      const res = await fetch(
        `${process.env.BACKEND}/api/star/subjectnotes/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );   
      const data  =  await res.json() ; 
      if (data.success === false) {
            errorhandler(404, "Something Went Wrong") ; 
        return;
      } 
      setSubjectData((prevData) =>
        prevData.map((item) =>
          item._id === id
           ? {...item, starsubjectnotes:!item.starsubjectnotes }
            : item ) ) 
            dispatch(
              toggleStar({
                id: data._id,
                starquestionotes: data.starquestionotes,   
                starsubjectnotes :data.starsubjectnotes , 
                starlecandpdflink :data.starlecandpdflink , 
                stardoclink : data.stardoclink , 
                data: data,
              })
            );   
        

    } catch (error) {
          errorhandler(404 , "Something Went Wrong") ; 
    }
  };      
 
  const togglelecandpdflink = async (id) => {
    try {
      const res = await fetch(
        `${process.env.BACKEND}/api/star/lecandpdflink/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );   
      const data  =  await res.json() ; 
      if (data.success === false) {
            errorhandler(404 , "Something Went Wrong")       
        return;
      } 
      setSubjectData((prevData) =>
        prevData.map((item) =>
          item._id === id
           ? {...item, starlecandpdflink:!item.starlecandpdflink }
            : item ) ) 
            dispatch(
              toggleStar({
                id: data._id,
                starquestionotes: data.starquestionotes,   
                starsubjectnotes :data.starsubjectnotes , 
                starlecandpdflink :data.starlecandpdflink , 
                stardoclink : data.stardoclink , 
                data: data,
              })
            );   
     
    } catch (error) {
          errorhandler(404 , "Something Went Wrong")
    }
  };   
      
  const toggledoclink = async (id) => {
    try {
      const res = await fetch(
        `${process.env.BACKEND}/api/star/doclink/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );   
      const data  =  await res.json() ; 
      if (data.success === false) {
        errorhandler(404 , "Something Went Wrong")
        return;
      } 
      setSubjectData((prevData) =>
        prevData.map((item) =>
          item._id === id
           ? {...item, stardoclink:!item.stardoclink }
            : item ) ) 
            dispatch(
              toggleStar({
                id: data._id,
                starquestionotes: data.starquestionotes,   
                starsubjectnotes :data.starsubjectnotes , 
                starlecandpdflink :data.starlecandpdflink , 
                stardoclink : data.stardoclink , 
                data: data,
              })
            );   
          
    } catch (error) {
      errorhandler(404 , "Something Went Wrong")
    }
  };  
  
  return ( 
<div className="w-full h-screen bg-black"> 

  {subjectData.length > 0 ? <div className="w-full h-screen bg-black text-white ">
    <div className="w-full bg-[#000] h-20 ">
      <div className="flex items-center justify-center gap-6 sm:gap-10 md:gap-16 w-[100%] sm:w-[70%] mx-auto">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `text-white text-center text-xs sm:text-sm md:text-[13px] opacity-[0.8] my-8 font-normal hover:scale-110 transition-transform duration-300 ${
              isActive
                ? "text-white opacity-[1] scale-125 font-bold mukta-bold"
                : ""
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/b.e"
          className={({ isActive }) =>
            `text-white text-center text-xs sm:text-sm md:text-[13px] opacity-[0.8] my-8 font-normal hover:scale-110 transition-transform duration-300 ${
              isActive
                ? "text-white opacity-[1] scale-125 font-bold mukta-bold"
                : ""
            }`
          }
        >
          B.E
        </NavLink>

        <NavLink
          to="/m.e"
          className={({ isActive }) =>
            `text-white text-center text-xs sm:text-sm md:text-[13px] opacity-[0.8] my-8 font-normal hover:scale-110 transition-transform duration-300 ${
              isActive
                ? "text-white opacity-[1] scale-125 font-bold mukta-bold"
                : ""
            }`
          }
        >
          M.E
        </NavLink>

        {signin ? (
          <div className="hover:scale-110 transition-transform duration-300">
            <NavLink
              to="/admin/profile"
              className={({ isActive }) =>
                `text-white text-center text-xs sm:text-sm md:text-[13px] opacity-[0.8] my-8 font-normal hover:scale-110 transition-transform duration-300 ${
                  isActive
                    ? "text-white opacity-[1] scale-125 font-bold mukta-bold"
                    : ""
                }`
              }
            >
              Admin
            </NavLink>
          </div>
        ) : (
          <></>
        )}

        {Usersignin ? (
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `text-white text-center text-xs sm:text-sm md:text-[13px] opacity-[0.8] my-8 font-normal hover:scale-110 transition-transform duration-300 ${
                isActive
                  ? "text-white opacity-[1] scale-125 font-bold mukta-bold"
                  : ""
              }`
            }
          >
            User
          </NavLink>
        ) : (
          <></>
        )}

        {signin ? (
          <></>
        ) : (
          <NavLink
            to="/contactus"
            className={({ isActive }) =>
              `text-white text-center text-xs sm:text-sm md:text-[13px] opacity-[0.8] my-8 font-normal hover:scale-110 transition-transform duration-300 ${
                isActive
                  ? "text-white opacity-[1] scale-125 font-bold mukta-bold"
                  : ""
              }`
            }
          >
            Contact
          </NavLink>
        )}

        {signin ? (
          <NavLink
            to={`/admin/create/${degree}/${branch}/${subject}`}
            className={({ isActive }) =>
              `text-white text-center text-xs sm:text-sm md:text-[13px] opacity-[0.8] my-8 font-normal hover:scale-110 transition-transform duration-300 ${
                isActive
                  ? "text-white opacity-[1] scale-125 font-bold mukta-bold"
                  : ""
              }`
            }
          >
            Add
          </NavLink>
        ) : (
          <></>
        )}

        {signin ? (
          <NavLink
            to={`/${degree}/${branch}/subjects/${subject}/delete`}
            className={({ isActive }) =>
              `text-white text-center text-xs sm:text-sm md:text-[13px] opacity-[0.8] my-8 font-normal hover:scale-110 transition-transform duration-300 ${
                isActive
                  ? "text-white opacity-[1] scale-125 font-bold mukta-bold"
                  : ""
              }`
            }
          >
            Update
          </NavLink>
        ) : (
          <></>
        )}
      </div>
      <div className="flex items-center justify-center w-full  mt-0 pt-0">
        <hr className="w-[80%] sm:w-[80%] md:w-[60%] h-[0.6px] px-10 rounded-full opacity-[0.5] bg-white" />
      </div>
    </div>

    <div className="w-[100%] bg-black sm:pt-10 pt-8  px-2 sm:px-10 overflow-y-auto">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-white sm:pt-10 pt-4 text-4xl mukta-light ml-5">
          {degree.toUpperCase()}-{branch.toUpperCase()}-
          {subject.toUpperCase()}
        </h1>
        <button
          className="mukta-light font-thin mt-4 mr-4 sm:mr-20 "
          onClick={handleBack}
        >
          <IoMdArrowRoundBack size={24} />
        </button>
      </div>
      <p className="text-white w-[90%] sm:w-[70%] mt-1 mukta-extralight font-thin opacity-[0.6] ml-5">
        Here, you can access all the available resources for{" "}
        {subject.toUpperCase()} subject. Trust your seniors—they've curated
        these materials from the top students, ensuring you have reliable and
        high-quality notes, question papers, and more. Use these resources to
        excel in your studies with confidence!
      </p>

      <div className="w-full  mt-5">
        <div className="section">
          <div
            className="section-title flex justify-between cursor-pointer mb-3 ml-4 border-[1px] text-white w-[70.5%] px-4 h-16 py-4 rounded-xl"
            onClick={() => setShowPDF(!showPDF)}
          >
            <div className="mukta-extralight font-semibold">
              Subject Notes
            </div>
            <div>
              <button
                className={`hover:scale-105 hover:opacity-[0.3] hover:transition-transform hover:duration-300 ${
                  showPDF ? "rotate-180 opacity-[0.4]" : ""
                }`}
              >
                <IoIosArrowDropdown size={24} />
              </button>
            </div>
          </div>
          {showPDF && (
            <div className="bg-white bg-opacity-[0.1] w-[90%] p-1 mr-2 pt-[5px] mb-4 sm:ml-14 ml-4 rounded-xl mt-3">
              <div className="section-content ml-1 flex flex-col gap-2 pb-1 w-[99%] rounded-lg">
                {subjectData.map(
                  (item) =>
                    item.subjectnotesUrls.length > 0 && (
                      <div
                        key={item._id}
                        className="flex gap-2 py-2 bg-black rounded-lg"
                      >
                        <div className="flex sm:w-[100%] text-[10px] sm:text-sm w-[42%] h-14 p-4 py-3 ml-2 bg-black text-white border-[1px] border-opacity-[0.3] border-white rounded-lg">
                        {item.pdfdescription || "No data available"}
                        </div>
                        <div className="sm:ml-6 ml-1 gap-3 bg-black flex sm:gap-5 md:gap-10 text-white w-[40%] p-4 py-3 rounded-lg">
                          <div className="flex   sm:ml-10 ml-4 flex-col gap-4">
                            {item.subjectnotesUrls.map((url, urlIndex) => (
                              <button
                                type="button"
                                onClick={() => window.open(url, "_blank")}
                                key={urlIndex}
                              >
                                <FaRegFilePdf className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] hover:opacity-[0.5] hover:transition-transform hover:duration-300 hover:scale-105" />
                              </button>
                            ))}
                          </div> 
                          {Usersignin?<div className="text-white">
                            <Link
                              className="hover:scale-110 transition-transform duration-300"
                              to={`/${degree}/${branch}/subjects/${subject}/comment/subject-notes/${item._id}`}
                            >
                              <MdInsertComment className="hover:opacity-[0.5] hover:transition-transform hover:duration-300 hover:scale-105 w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]" />
                            </Link>
                          </div>:""}
                          
                            
                          {Usersignin? <div>
                            <button
                              className={`${
                                item.starsubjectnotes ? "text-yellow-400" : ""
                              } flex items-center justify-center hover:opacity-[0.5] hover:transition-transform hover:duration-300 hover:scale-105`}
                              onClick={() => togglesubjectnotes(item._id)}
                            >
                              <FaStar size={22} />
                            </button>
                          </div>:""}
                         
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          )}
        </div>

        <div className="section">
          <div
            className="section-title flex justify-between cursor-pointer mb-3 ml-4 border-[1px] text-white w-[70.5%] px-4 h-16 py-4 rounded-xl"
            onClick={() => setShowQuestionPapers(!showQuestionPapers)}
          >
            <div className="mukta-extralight font-semibold">
              Question Paper
            </div>
            <div>
              <button
                className={`hover:scale-105 hover:opacity-[0.3] hover:transition-transform hover:duration-300 ${
                  showQuestionPapers ? "rotate-180 opacity-[0.4]" : ""
                }`}
              >
                <IoIosArrowDropdown size={24} />
              </button>
            </div>
          </div>
          {showQuestionPapers && (
            <div className="bg-white bg-opacity-[0.1] w-[90%] p-1 mr-2 pt-[5px] mb-4 sm:ml-14 ml-4 rounded-xl mt-3">
              <div className="section-content ml-1 flex flex-col gap-2 pb-1 w-[99%] rounded-lg">
                {subjectData.map(
                  (item) =>
                    item.questionpaperUrls.length > 0 && (
                      <div
                        key={item._id}
                        className="flex gap-2 py-2 bg-black rounded-lg"
                      >
                        <div className="flex sm:w-[100%] text-[10px] sm:text-sm w-[42%] h-14 p-4 py-3 ml-2 bg-black text-white border-[1px] border-opacity-[0.3] border-white rounded-lg">
                        {item.questionpaperdec || "No Data Available"}
                        </div>
                        <div className="sm:ml-6 ml-1 gap-3 bg-black flex sm:gap-5 md:gap-10 text-white w-[40%] p-4 py-3 rounded-lg">
                        <div className="flex   sm:ml-10 ml-4 flex-col gap-4">
                        {item.questionpaperUrls.map((url, urlIndex) => (
                              <Link
                                onClick={() => window.open(url, "_blank")}
                                key={urlIndex}
                              >
                                <FaRegFilePdf className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] hover:opacity-[0.5] hover:transition-transform hover:duration-300 hover:scale-105" />
                              </Link>
                            ))}
                          </div>   
                          {Usersignin? <div className="text-white">
                            <Link
                              className="hover:scale-110 transition-transform duration-300"
                              to={`/${degree}/${branch}/subjects/${subject}/comment/question-paper/${item._id}`}
                            >
                              <MdInsertComment className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] hover:opacity-[0.5] hover:transition-transform hover:duration-300 hover:scale-105" />
                            </Link>
                          </div>:""}
                         
                           
                          {Usersignin?<div>
                            <button
                              className={`${
                                item.starquestionotes ? "text-yellow-400" : ""
                              } hover:opacity-[0.5] hover:transition-transform hover:duration-300 hover:scale-105`}
                              onClick={() => togglequesstar(item._id)}
                            >
                              <FaStar size={24} />
                            </button>
                          </div>:""}
                          
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          )}
        </div>

        <div className="section">
          <div
            className="section-title flex justify-between cursor-pointer mb-3 ml-4 border-[1px] text-white w-[70.5%] px-4 h-16 py-4 rounded-xl"
            onClick={() => setShowLinks(!showLinks)}
          >
            <div className="mukta-extralight font-semibold">
              Lecture and Pdf Links
            </div>
            <div>
              <button
                className={`hover:scale-105 hover:opacity-[0.3] hover:transition-transform hover:duration-300 ${
                  showLinks ? "rotate-180 opacity-[0.4]" : ""
                }`}
              >
                <IoIosArrowDropdown size={24} />
              </button>
            </div>
          </div>
          {showLinks && (
            <div className="bg-white bg-opacity-[0.1] w-[90%] p-1 mr-2 pt-[5px] mb-4 sm:ml-14 ml-4 rounded-xl mt-3">
              <div className="section-content ml-1 flex flex-col gap-2 pb-1 w-[99%] rounded-lg">
                {subjectData.map(
                  (item ) =>
                    item.links.length > 0 && (
                      <div
                        key={item._id}
                        className="flex gap-2 py-2 bg-black rounded-lg"
                      >
                        <div className="flex sm:w-[100%] text-[10px] sm:text-sm w-[42%] h-14 p-4 py-3 ml-2 bg-black text-white border-[1px] border-opacity-[0.3] border-white rounded-lg">
                          {item.linkdescription || "Click the Link button"}
                        </div>
                        <div className="sm:ml-6 ml-1 gap-3 bg-black flex sm:gap-5 md:gap-10 text-white w-[40%] p-4 py-3 rounded-lg">
                        <div className="flex   sm:ml-10 ml-4 flex-col gap-4">
                        {item.links.map((url, urlindex) => {
                              return (
                                <Link to={url || "#"}  key = {urlindex} target="_blank">
                                  <IoLinkSharp className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] hover:opacity-[0.5] hover:transition-transform hover:duration-300 hover:scale-105" />
                                </Link>
                              );
                            })}
                          </div>   
                          {Usersignin? <div className="text-white">
                            <Link
                              className="hover:scale-110 transition-transform duration-300"
                              to={`/${degree}/${branch}/subjects/${subject}/comment/links/${item._id}`}
                            >
                              <MdInsertComment className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] hover:opacity-[0.5] hover:transition-transform hover:duration-300 hover:scale-105" />
                            </Link>
                          </div>:""}
                         
                         

<div>
                            {Usersignin? <button
                              className={`${
                                item.starlecandpdflink ? "text-yellow-400" : ""
                              } hover:opacity-[0.5] hover:transition-transform hover:duration-300 hover:scale-105`}
                              onClick={() => togglelecandpdflink(item._id)}
                            >
                              <FaStar size={24} />
                            </button>:""}
                           
                          </div>

                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          )}
        </div>

        <div className="section">
          <div
            className="section-title flex justify-between cursor-pointer mb-3 ml-4 border-[1px] text-white w-[70.5%] px-4 h-16 py-4 rounded-xl"
            onClick={() => setShowDocumentationLink(!showDocumentationLink)}
          >
            <div className="mukta-extralight font-semibold">
              Documentation Link
            </div>
            <div>
              <button
                className={`hover:scale-105 hover:opacity-[0.3] hover:transition-transform hover:duration-300 ${
                  showDocumentationLink ? "rotate-180 opacity-[0.4]" : ""
                }`}
              >
                <IoIosArrowDropdown size={24} />
              </button>
            </div>
          </div>
          {showDocumentationLink && (
            <div className="bg-white bg-opacity-[0.1] w-[90%] p-1 mr-2 pt-[5px] mb-4 sm:ml-14 ml-4 rounded-xl mt-3">
              <div className="section-content ml-1 flex flex-col gap-2 pb-1 w-[99%] rounded-lg">
                {subjectData.map(
                  (item) =>
                    item.documentationlink.length > 0 && (
                      <div
                        key={item._id}
                        className="flex gap-2 py-2 bg-black rounded-lg"
                      >
                        <div className="flex sm:w-[100%] text-[10px] sm:text-sm w-[42%] h-14 p-4 py-3 ml-2 bg-black text-white border-[1px] border-opacity-[0.3] border-white rounded-lg">
                          {item.documentationlinkdesc || "No Data Available"}
                        </div>
                        <div className="sm:ml-6 ml-1 gap-3 bg-black flex sm:gap-5 md:gap-10 text-white w-[40%] p-4 py-3 rounded-lg">
                        <div className="flex   sm:ml-10 ml-4 flex-col gap-4">
                        {item.documentationlink.map((url, urlindex) => {
                              return (
                                <Link  key = {urlindex} 
                                  to={url || "#"}
                                  target="_blank"
                                  className="bg-black  text-white text-xs  rounded-lg flex items-center"
                                >
                                  <IoLinkSharp className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] hover:opacity-[0.5] hover:transition-transform hover:duration-300 hover:scale-105" />
                                </Link>
                              );
                            })}
                          </div>   
                          {Usersignin? <div className="text-white">
                            <Link
                              className="hover:scale-110 transition-transform duration-300"
                              to={`/${degree}/${branch}/subjects/${subject}/comment/documentation-link/${item._id}`}
                            >
                              <MdInsertComment className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] hover:opacity-[0.5] hover:transition-transform hover:duration-300 hover:scale-105" />
                            </Link>
                          </div>:""}
                         
                       
                            {Usersignin? <div>
                           <button
                              className={`${
                                item.stardoclink ? "text-yellow-400" : ""
                              } hover:opacity-[0.5] hover:transition-transform hover:duration-300 hover:scale-105`}
                              onClick={() => toggledoclink(item._id)}
                            >
                              <FaStar size={24} />
                            </button>
                          </div>:""}
                          
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
  <div className="w-full md:h-[60vh] h-[40vh]  bg-black"> </div>
    </div>
  </div>: <LoadingPage />}   
</div>
  
    
  );
}

export default MainData;


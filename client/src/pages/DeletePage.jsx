

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { IoLinkSharp } from "react-icons/io5";
import { FaRegFilePdf } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { deleteerror } from "../Redux/Slices/deleteSlice";   
import LoadingPage from "../components/LoadingPage";
import { IoIosArrowDropdown, IoMdArrowRoundBack } from "react-icons/io";
import { GrDocumentUpdate } from "react-icons/gr";
import { formatDate } from "../../../api/Utils/date";   
import {
  subjectFailure,
  
} from "../Redux/Slices/subjectSlice";

function DeletePage() {
  const { signin } = useSelector((state) => state.admin);
  const { error } = useSelector((state) => state.delete);
  const { Usersignin } = useSelector((state) => state.user);
  const { degree, branch, subject } = useParams();
  const [subjectData, setSubjectData] = useState({});
  const [showPDF, setShowPDF] = useState(false);
  const [showQuestionPapers, setShowQuestionPapers] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [showDocumentationLink, setShowDocumentationLink] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        dispatch(subjectFailure()) ; 
          return ; 
      }
    };

    fetchData();
  }, [degree, branch, subject, dispatch]);

  const handledoclink = async (id, urlIndex , url) => {
    try {
      const res = await fetch(
        `${process.env.BACKEND}/api/delete/doclink/${id}/${urlIndex}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data.success === false) {   
        dispatch(deleteerror(data.message));

        return;
      }
      setSubjectData((prevSubjectData) =>
        prevSubjectData.map((item) =>
          item._id === id
            ? {
                ...item,
                documentationlink: item.documentationlink.filter((_, index) => index !== urlIndex),
              }
            : item
        )
      );
    } catch (error) {   
      dispatch(deleteerror(error.message));

    }
  };


  const handlelink = async (id, urlindex , url) => {
    try {
      const res = await fetch(
        `${process.env.BACKEND}/api/delete/leclink/${id}/${urlindex}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteerror(data.message));
        return;
      }
        setSubjectData((prevSubjectData) =>
      prevSubjectData.map((item) =>
        item._id === id
          ? {
              ...item,
              links: item.links.filter((_, index) => index !== urlindex),
            }
          : item
      )
    );

    } catch (error) {
      dispatch(deleteerror(error.message));
    }
  };

  const handleDeletequestionpaperPDF = async (subjectid, urlindex, link) => {
    try {
      const storage = getStorage();
      const desertRef = ref(storage, link);
      await deleteObject(desertRef)
        .then(async () => {
          try {
            const res = await fetch(
              `${process.env.BACKEND}/api/delete/questionpaperspdf/${subjectid}/${urlindex}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            const data = await res.json();
            if (data.success === false) {
                  subjectFailure() ; 
              return;
            }

            setSubjectData(
              subjectData.map((prev) => ({
                ...prev,
                questionpaperUrls: prev.questionpaperUrls.filter(
                  (_, index) => index !== urlindex
                ),
              }))
            );
          } catch (error) {
                dispatch(subjectFailure()) ; 
             }
        })
        .catch((error) => {
          dispatch(deleteerror(error.message));
        });

    } catch (error) {
          dispatch(deleteerror(error)) ; 
    }
  };

  const handleDeletePDF = async (subjectid, urlIndex, link) => {
    try {
      

      const storage = getStorage();
      const desertRef = ref(storage, link);
      await deleteObject(desertRef)
        .then(async () => {
          try {
            const res = await fetch(
              `{${process.env.BACKEND}/api/delete/subjectnotespdf/${subjectid}/${urlIndex}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            const data = await res.json();
            if (data.success === false) {
                  dispatch(deleteerror(data.message)) ; 
              return;
            }

            setSubjectData(
              subjectData.map((prev) => ({
                ...prev,
                subjectnotesUrls: prev.subjectnotesUrls.filter(
                  (_, index) => index !== urlIndex
                ),
              }))
            );
                } catch (error) {
                      dispatch(deleteerror(error)) ; 
                 }
        })
        .catch((error) => {
          dispatch(deleteerror(error.message));
        });

    } catch (error) {
          dispatch(deleteerror(error.message)) ; 
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full h-screen bg-black text-white  ">
      {subjectData.length > 0 ? (
        <div className="w-full bg-black ">
          {/* <div className="fixed w-full "> */}
          <div className="w-full bg-[#000] h-20 ">
            <div className="flex items-center justify-center gap-4  sm:gap-10  md:gap-16  w-[100%] sm:w-[70%] mx-auto">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `text-white text-center text-xs sm:text-sm md:text-[13px] opacity-[0.8] my-8 font-normal hover:scale-110 transition-transform duration-300 ${
                    isActive
                      ? "text-white opacity-[1] scale-125 font-bold mukta-bold "
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
                      ? "text-white text-sm  opacity-[1] scale-125 font-bold mukta-bold "
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
                      ? "text-white  opacity-[1] scale-125 font-bold mukta-bold "
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
                          ? "text-white opacity-[1] scale-125 font-bold mukta-bold "
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
                        ? "text-white  text-sm opacity-[1] scale-125 font-bold mukta-bold "
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
                        ? " text-white opacity-[1] scale-125 font-bold mukta-bold  "
                        : ""
                    }`
                  }
                >
                  Contact
                </NavLink>
              )}

              {signin ? (
                <NavLink
                  to={`/${degree}/${branch}/subjects/${subject}/delete`}
                  className={({ isActive }) =>
                    `text-white text-center text-xs sm:text-sm md:text-[13px] opacity-[0.8] my-8 font-normal hover:scale-110 transition-transform duration-300 ${
                      isActive
                        ? " text-white opacity-[1] scale-125 font-bold mukta-bold  "
                        : ""
                    }`
                  }
                >
                  Update
                </NavLink>
              ) : (
                <></>
              )}

              {signin ? (
                <NavLink
                  to={`/${degree}/${branch}/subjects/${subject}/docdelete`}
                  className={({ isActive }) =>
                    `text-white text-center text-xs sm:text-sm md:text-[13px] opacity-[0.8] my-8 font-normal hover:scale-110 transition-transform duration-300 ${
                      isActive
                        ? " text-white opacity-[1] scale-125 font-bold mukta-bold  "
                        : ""
                    }`
                  }
                >
                  Doc Delete
                </NavLink>
              ) : (
                <></>
              )}
            </div>

            <div className="flex items-center justify-center mt-0 pt-0">
              <hr className="w-[80%] sm:w-[80%] md:w-[60%] h-[0.6px] px-10 rounded-full opacity-[0.5] bg-white" />
            </div>
          </div>
          {/* </div> */}

          <div className="w-[100%] sm:pt-10 pt-8  px-2 sm:px-10 overflow-y-auto">
            <div className="flex w-full items-center  justify-between">
              <h1 className="text-4xl mx-5 mukta-light">
                {subject.toUpperCase()}{" "}
                <span className="text-xs mukta-light font-thin opacity-[0.4]">
                  Update
                </span>
              </h1>
              <button
                className="mukta-light font-thin mt-4 mr-4 sm:mr-20 "
                onClick={handleBack}
              >
                <IoMdArrowRoundBack size={24} />
              </button>
            </div>
            <p className="w-[80%] opacity-[0.6] sm:w-[60%] mx-5 mukta-extralight font-thin text-sm mt-1">
              As an admin, you have the flexibility and authority to update and
              delete content as needed to maintain the quality and relevance of
              our platform. Use these features responsibly to ensure the best
              experience for our users.
            </p>
           

            <div className="w-full mt-7  ">
              {/* <div className="section ">
                <div
                  className="section-title flex  justify-between   cursor-pointer mb-3 ml-4 border-[1px] text-white w-[70.5%] px-4 h-16 py-4 rounded-xl"
                  onClick={() => setShowPDF(!showPDF)}
                >
                  <div className="mukta-extralight font-semibold">
                    Subject Notes
                  </div>
                  <div className="">
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
                  <div className="bg-white bg-opacity-[0.1] pt-[5px] mb-4 ml-14 rounded-xl mt-3">
                    <div className="section-content ml-1 flex flex-col gap-2 pb-1 w-[99%] rounded-lg">
                      {subjectData.map(
                        (item) =>
                          item.subjectnotesUrls.length > 0 && (
                            <div
                              key={item._id}
                              className="flex gap-2 py-2 bg-black rounded-lg"
                            >
                              <div className="w-[100%] h-14 p-4 py-3 ml-2 bg-black text-white border-[1px] border-opacity-[0.3] border-white rounded-lg">
                                {item.pdfdescription || "No data available"}
                              </div>
                              <div className="ml-6 bg-black flex gap-10 text-white w-[40%] p-4 py-3 rounded-lg">
                                <div className="flex flex-row gap-10">
                                  <div className="flex flex-col gap-4">
                                    {item.subjectnotesUrls.map(
                                      (url, urlIndex) => (
                                        <Link
                                          className=""
                                          onClick={() =>
                                            window.open(url, "_blank")
                                          }
                                          key={urlIndex}
                                        >
                                          <FaRegFilePdf
                                            className=""
                                            size={24}
                                          />
                                        </Link>
                                      )
                                    )}
                                  </div>
                                  <div>
                                    <div className="flex flex-col gap-2  ">
                                      {item.subjectnotesUrls.map(
                                        (url, urlIndex) => (
                                          <div className="text-red-600  hover:scale:110 transition-transform duration-300">
                                            <button
                                              className="hover:scale:110 transition-transform duration-300"
                                              onClick={() =>
                                                handleDeletePDF(
                                                  item._id,
                                                  urlIndex,
                                                  url
                                                )
                                              }
                                            >
                                              <MdDelete size={26} />
                                            </button>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                  <div>
                                    <button>
                                      <GrDocumentUpdate size={24} />
                                    </button>
                                  </div>
                                  <div className="text-xs">
                                    {formatDate(item.createdAt)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                )}
              </div> */}
              <div className="section">
                <div
                  className="section-title flex justify-between p-4 cursor-pointer mb-3 ml-4 border-[1px] text-white w-[70.5%]  h-16 py-4 rounded-xl"
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
                              {item.subjectnotesUrls.map(
                                    (url, urlIndex) => (
                                      <Link
                                        onClick={() =>
                                          window.open(url, "_blank")
                                        }
                                        key={urlIndex}
                                      >
                                        <FaRegFilePdf className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]" />
                                      </Link>
                                    )
                                  )}
                                </div>
                                <div className="text-red-600 flex flex-col gap-2">
                                  {item.subjectnotesUrls.map(
                                    (url, urlIndex) => (
                                      <div
                                        key={urlIndex}
                                        className="text-red-600 hover:scale-110 transition-transform duration-300"
                                      >
                                        <button
                                          className="hover:scale-110 transition-transform duration-300"
                                          onClick={() =>
                                            handleDeletePDF(
                                              item._id,
                                              urlIndex,
                                              url
                                            )
                                          }
                                        >
                                          <MdDelete className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]" />
                                        </button>
                                      </div>
                                    )
                                  )}
                                </div>
                                <div>
                                  <Link to={`/${degree}/${branch}/subjects/${subject}/update-subject-notes/${item._id}`}>
                                    <GrDocumentUpdate className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]" />
                                  </Link>
                                </div>
                                
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* <div className="section">
                <div
                  className="section-title flex  justify-between   cursor-pointer mb-3 ml-4 border-[1px] text-white w-[70.5%] px-4 h-16 py-4 rounded-xl"
                  onClick={() => setShowQuestionPapers(!showQuestionPapers)}
                >
                  <div className="mukta-extralight font-semibold">
                    Question Papers
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
                  <div className="bg-white bg-opacity-[0.1] pt-[5px] mb-4 ml-14 rounded-xl mt-3">
                    <div className="section-content ml-1 flex flex-col gap-2 pb-1 w-[99%] rounded-lg">
                      {subjectData.map(
                        (item) =>
                          item.questionpaperUrls.length > 0 && (
                            <div
                              key={item._id}
                              className="flex gap-2 py-2 bg-black rounded-lg"
                            >
                              <div className="w-[100%] h-14 p-4 py-3 ml-2 bg-black text-white border-[1px] border-opacity-[0.3] border-white rounded-lg">
                                {item.questionpaperdec || "No Data Available"}
                              </div>
                              <div className="ml-6 bg-black flex gap-10 text-white w-[40%] p-4 py-3 rounded-lg">
                                <div className="flex flex-col gap-4">
                                  {item.questionpaperUrls.map(
                                    (url, urlIndex) => (
                                      <Link
                                        className=""
                                        onClick={() =>
                                          window.open(url, "_blank")
                                        }
                                        key={urlIndex}
                                      >
                                        <FaRegFilePdf className="" size={24} />
                                      </Link>
                                    )
                                  )}
                                </div>
                                <div className="text-red-600 flex flex-col gap-2">
                                  {item.questionpaperUrls.map(
                                    (url, urlIndex) => (
                                      <div
                                        key={urlIndex}
                                        className="text-red-600 hover:scale-110 transition-transform duration-300"
                                      >
                                        <button
                                          className="hover:scale-110 transition-transform duration-300"
                                          onClick={() =>
                                            handleDeletequestionpaperPDF(
                                              item._id,
                                              urlIndex,
                                              url
                                            )
                                          }
                                        >
                                          <MdDelete size={26} />
                                        </button>
                                      </div>
                                    )
                                  )}
                                </div>
                                <div>
                                  <button>
                                    <GrDocumentUpdate size={24} />
                                  </button>
                                </div>
                                <div className="text-xs">
                                  {formatDate(item.createdAt)}
                                </div>
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                )}
              </div> */}
              <div className="section">
                <div
                  className="section-title flex justify-between cursor-pointer mb-3 ml-4 border-[1px] text-white w-[70.5%] px-4 h-16 py-4 rounded-xl"
                  onClick={() => setShowQuestionPapers(!showQuestionPapers)}
                >
                  <div className="mukta-extralight font-semibold">
                    Question Papers
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
                              {item.questionpaperUrls.map(
                                    (url, urlIndex) => (
                                      <Link
                                        onClick={() =>
                                          window.open(url, "_blank")
                                        }
                                        key={urlIndex}
                                      >
                                        <FaRegFilePdf className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]" />
                                      </Link>
                                    )
                                  )}
                                </div>
                                <div className="text-red-600 flex flex-col gap-2">
                                  {item.questionpaperUrls.map(
                                    (url, urlIndex) => (
                                      <div
                                        key={urlIndex}
                                        className="text-red-600 hover:scale-110 transition-transform duration-300"
                                      >
                                        <button
                                          className="hover:scale-110 transition-transform duration-300"
                                          onClick={() =>
                                            handleDeletequestionpaperPDF(
                                              item._id,
                                              urlIndex,
                                              url
                                            )
                                          }
                                        >
                                          <MdDelete className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]" />
                                        </button>
                                      </div>
                                    )
                                  )}
                                </div>
                                <div>
                                  <Link  to={`/${degree}/${branch}/subjects/${subject}/update-question-paper/${item._id}`}>
                                    <GrDocumentUpdate className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]" />
                                  </Link>
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
                  className="section-title flex  justify-between   cursor-pointer mb-3 ml-4 border-[1px] text-white w-[70.5%] px-4 h-16 py-4 rounded-xl"
                  onClick={() => setShowLinks(!showLinks)}
                >
                  <div className="mukta-extralight font-semibold">
                    Lecture Links and Pdf Links
                  </div>
                  <div>
                    <button
                      className={`hover:scale-105 hover:opacity-[0.3] hover:transition-transform hover:duration-300 ${
                        showLinks ? "rotate-180 opacity-[0.4]" : ""
                      }`}
                    >
                      <IoIosArrowDropdown className="" size={24} />
                    </button>
                  </div>
                </div>
                {showLinks && (
                  <div className="bg-white bg-opacity-[0.1] w-[90%] p-1 mr-2 pt-[5px] mb-4 sm:ml-14 ml-4 rounded-xl mt-3">
                    <div className="section-content ml-1 flex flex-col gap-2 pb-1 w-[99%] rounded-lg">
                      {subjectData.map(
                        (item) =>
                          item.links.length > 0 && (
                            <div
                              key={item._id}
                              className="flex gap-2 py-2 bg-black rounded-lg"
                            >
                          <div className="flex sm:w-[100%] text-[10px] sm:text-sm w-[42%] h-14 p-4 py-3 ml-2 bg-black text-white border-[1px] border-opacity-[0.3] border-white rounded-lg">
                          {item.linkdescription ||
                                  "Click the Link button"}
                              </div>
                              <div className="sm:ml-6  ml-1 gap-3 bg-black flex sm:gap-5 md:gap-10  text-white w-[40%] p-4 py-3 rounded-lg">
                                {/* <div className="text-white">
                                  <Link
                                    to={item.links || "#"}
                                    className="bg-black text-white text-xs py-4 rounded-lg"
                                  >
                                    <IoLinkSharp className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]" />
                                  </Link>
                                </div> */}
                            <div className="flex   sm:ml-10 ml-4 flex-col gap-4">
                            {item.links.map((url, urlIndex) => (
                                    <Link
                                      onClick={() => window.open(url, "_blank")}
                                      key={urlIndex}
                                    >
                                      <IoLinkSharp className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]" />
                                    </Link>
                                  ))}
                                </div>

                                <div className="text-red-600 flex flex-col gap-2">
                                  {item.links.map((url, urlIndex) => (
                                    <div
                                      key={urlIndex}
                                      className="text-red-600 hover:scale-110 transition-transform duration-300"
                                    >
                                      <button
                                        className="hover:scale-110 transition-transform duration-300"
                                        onClick={() =>
                                          handlelink(
                                            item._id,
                                            urlIndex,
                                            url
                                          )
                                        }
                                      >
                                          <MdDelete className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]" />
                                          </button>
                                    </div>
                                  ))}
                                </div>
                                {/* <div className="text-red-600 flex flex-col gap-2">
                                  <button
                                    className="hover:scale-110 transition-transform duration-300"
                                    onClick={() => handlelink(item._id)}
                                  >
                                    <MdDelete className=" w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]" />
                                  </button>
                                </div> */}
                                <div>
                                  <Link to={`/${degree}/${branch}/subjects/${subject}/update-links/${item._id}`}>
                                    <GrDocumentUpdate className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]" />
                                  </Link>
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
                  onClick={() =>
                    setShowDocumentationLink(!showDocumentationLink)
                  }
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
                          {item.documentationlinkdesc ||
                                  "Click the Link button"}
                              </div>
                              <div className="sm:ml-6 ml-1 gap-3 bg-black flex sm:gap-5 md:gap-10 text-white w-[40%] p-4 py-3 rounded-lg">
                                {/* <div className="text-white">
                                  <Link
                                    to={item.documentationlink || "#"}
                                    className="bg-black text-white text-xs py-4 rounded-lg"
                                  >
                                    <IoLinkSharp className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]" />
                                  </Link>
                                </div> */}
                            <div className="flex   sm:ml-10 ml-4 flex-col gap-4">
                            {item.documentationlink.map(
                                    (url, urlIndex) => (
                                      <Link
                                        onClick={() =>
                                          window.open(url, "_blank")
                                        }
                                        key={urlIndex}
                                      >
                                        <IoLinkSharp className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]" />
                                      </Link>
                                    )
                                  )}
                                </div>

                                <div className="text-red-600 flex flex-col gap-2">
                                  {item.documentationlink.map(
                                    (url, urlIndex) => (
                                      <div
                                        key={urlIndex}
                                        className="text-red-600 hover:scale-110 transition-transform duration-300"
                                      >
                                        <button
                                          className="hover:scale-110 transition-transform duration-300"
                                          onClick={() =>
                                            handledoclink(
                                              item._id,
                                              urlIndex,
                                              url
                                            )
                                          }
                                        >
                                          <MdDelete className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]" />
                                          </button>
                                      </div>
                                    )
                                  )}
                                </div>

                                {/* <div className="text-red-600 flex flex-col gap-2">
                                  <button
                                    className="hover:scale-110 transition-transform duration-300"
                                    onClick={() => handledoclink(item._id)}
                                  >
                                    <MdDelete className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]" />
                                  </button>
                                </div> */}
                                <div>
                                  <Link to={`/${degree}/${branch}/subjects/${subject}/update-doclinks/${item._id}`}>
                                    <GrDocumentUpdate className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]" />
                                  </Link>
                                </div>
                                
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div> 
          <div className="w-full md:h-[62vh] h-[40vh]  bg-black"> </div>

        </div>
      ) : (
        <LoadingPage></LoadingPage>
      )}
    </div>
  );
}

export default DeletePage;

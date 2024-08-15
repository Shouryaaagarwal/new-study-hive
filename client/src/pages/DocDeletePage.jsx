
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { deleteerror } from "../Redux/Slices/deleteSlice";
import LoadingPage from "../components/LoadingPage";
import { TiTick } from "react-icons/ti";
import { IoWarning } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { errorhandler } from "../../../api/Utils/errorhandler";

function DocDeletePage() {
  const { degree, branch, subject } = useParams();
  const [subjectData, setSubjectData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.delete);
  const { signin } = useSelector((state) => state.admin);
  const { Usersignin } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchSubjectsData = async () => {
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
          dispatch(errorhandler(404, "Subject Not Found"));
          return;
        }

        setSubjectData(data);
      } catch (error) {
        dispatch(errorhandler(404, "Something went wrong"));
        return;
      }
    };
    fetchSubjectsData();
  }, [subject, degree, branch]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 200000);
  }, []);

  const handleDelete = async (id) => {
    const res = await fetch(
      `${process.env.BACKEND}/api/delete/subjectDoc/${id}`,
      {
        method: "DELETE",
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
    setSubjectData((prevData) => {
      const updatedData = prevData.filter((item) => item._id !== id);
      if (updatedData.length === 0) {
        navigate(`/${degree}/${branch}/subjects`);
      }
      return updatedData;
    });
  };

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className="">
      {subjectData.length > 0 ? (
        <div className="w-full h-screen bg-black text-white">
          <div className="w-full bg-[#000] h-20">
            <div className="flex items-center justify-center gap-4 sm:gap-10 md:gap-16 w-[100%] sm:w-[70%] mx-auto">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `text-white text-center text-xs sm:text-sm md:text-[13px] opacity-[0.8] my-8 font-normal hover:scale-110 transition-transform duration-300 ${
                    isActive ? "text-white opacity-[1] scale-125 font-bold mukta-bold" : ""
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/b.e"
                className={({ isActive }) =>
                  `text-white text-center text-xs sm:text-sm md:text-[13px] opacity-[0.8] my-8 font-normal hover:scale-110 transition-transform duration-300 ${
                    isActive ? "text-white text-sm opacity-[1] scale-125 font-bold mukta-bold" : ""
                  }`
                }
              >
                B.E
              </NavLink>

              <NavLink
                to="/m.e"
                className={({ isActive }) =>
                  `text-white text-center text-xs sm:text-sm md:text-[13px] opacity-[0.8] my-8 font-normal hover:scale-110 transition-transform duration-300 ${
                    isActive ? "text-white opacity-[1] scale-125 font-bold mukta-bold" : ""
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
                        isActive ? "text-white opacity-[1] scale-125 font-bold mukta-bold" : ""
                      }`
                    }
                  >
                    Admin
                  </NavLink>
                </div>
              ) : null}

              {Usersignin ? (
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `text-white text-center text-xs sm:text-sm md:text-[13px] opacity-[0.8] my-8 font-normal hover:scale-110 transition-transform duration-300 ${
                      isActive ? "text-white text-sm opacity-[1] scale-125 font-bold mukta-bold" : ""
                    }`
                  }
                >
                  User
                </NavLink>
              ) : null}

              {!signin && (
                <NavLink
                  to="/contactus"
                  className={({ isActive }) =>
                    `text-white text-center text-xs sm:text-sm md:text-[13px] opacity-[0.8] my-8 font-normal hover:scale-110 transition-transform duration-300 ${
                      isActive ? "text-white opacity-[1] scale-125 font-bold mukta-bold" : ""
                    }`
                  }
                >
                  Contact
                </NavLink>
              )}

              {signin && (
                <>
                  <NavLink
                    to={`/${degree}/${branch}/subjects/${subject}/delete`}
                    className={({ isActive }) =>
                      `text-white text-center text-xs sm:text-sm md:text-[13px] opacity-[0.8] my-8 font-normal hover:scale-110 transition-transform duration-300 ${
                        isActive ? "text-white opacity-[1] scale-125 font-bold mukta-bold" : ""
                      }`
                    }
                  >
                    Update
                  </NavLink>

                  <NavLink
                    to={`/${degree}/${branch}/subjects/${subject}/docdelete`}
                    className={({ isActive }) =>
                      `text-white text-center text-xs sm:text-sm md:text-[12px] opacity-[0.8] my-8 font-normal hover:scale-110 transition-transform duration-300 ${
                        isActive ? "text-white opacity-[1] scale-125 font-bold mukta-bold" : ""
                      }`
                    }
                  >
                    Doc Delete
                  </NavLink>
                </>
              )}
            </div>

            <div className="flex items-center justify-center mt-0 pt-0">
              <hr className="w-[80%] sm:w-[80%] md:w-[60%] h-[0.6px] px-10 rounded-full opacity-[0.5] bg-white" />
            </div>
          </div>
          <div className="w-full bg-black">
            <div className="flex w-[100%] items-center justify-between sm:justify-between">
              <h1 className="text-3xl mukta-light pt-10 px-10">
                {degree.toUpperCase()}-{branch.toUpperCase()}-{subject.toUpperCase()}
              </h1>

              <button
                className="mukta-light font-thin mt-6 mr-4 sm:mr-20"
                onClick={handleClick}
              >
                <IoMdArrowRoundBack className="font-thin" size={24} />
              </button>
            </div>
            <p className="px-10 w-[90%] sm:w-[70%] mukta-extralight font-thin text-sm opacity-[0.7]">
              On the Delete Subject Document Page, the admin can review the
              presence of data in critical fields for each subject. After
              verifying the information, the admin has the option to delete the
              subject if necessary. This page ensures that all key details are
              checked before any deletion is performed.
            </p>
            <div className="flex bg-black pb-10 gap-10 flex-wrap px-10">
              {subjectData.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-4 text-white mt-5 rounded-lg px-5 border-[1px] opacity-[0.8] bg-black w-[85%] sm:w-[40%] md:w-[30%] h-[40vh]"
                >
                  <h1 className="text-2xl mt-3 mukta-extralight text-center">
                    {`Doc${index + 1}`}
                  </h1>
                  <div className="flex gap-16 justify-center">
                    <div>
                      <h5 className="mukta-light font-thin text-[0.9rem]">
                        Lecture Links -{" "}
                      </h5>
                    </div>

                    <div>
                      <span
                        className={`${
                          item.links.length > 0 ? "text-red-700" : "text-green-700"
                        }`}
                      >
                        {item.links.length > 0 ? (
                          <IoWarning size={18} />
                        ) : (
                          <TiTick />
                        )}
                      </span>
                    </div>
                  </div>
                  <div
                    className="mukta-light font-thin text-[0.9rem] flex gap-2 justify-center"
                  >
                    Documentation Links -{" "}
                    <span
                      className={`${
                        item.documentationlink.length > 0
                          ? "text-red-700"
                          : "text-green-700"
                      } ml-2`}
                    >
                      {item.documentationlink.length > 0 ? (
                        <IoWarning size={18} />
                      ) : (
                        <TiTick />
                      )}
                    </span>
                  </div>
                  <h5
                    className="mukta-light font-thin text-[0.9rem] flex gap-2 justify-center"
                  >
                    Subject Notes pdf -{" "}
                    <span
                      className={`${
                        item.subjectnotesUrls.length > 0
                          ? "text-red-700"
                          : "text-green-700"
                      } ml-7`}
                    >
                      {item.subjectnotesUrls.length > 0 ? (
                        <IoWarning size={18} />
                      ) : (
                        <TiTick size={18} />
                      )}
                    </span>
                  </h5>
                  <h5
                    className="mukta-light font-thin text-[0.9rem] flex gap-2 justify-center"
                  >
                    Question Paper pdf -{" "}
                    <span
                      className={`${
                        item.questionpaperUrls.length > 0
                          ? "text-red-700"
                          : "text-green-700"
                      } ml-5`}
                    >
                      {item.questionpaperUrls.length > 0 ? (
                        <IoWarning size={18} />
                      ) : (
                        <TiTick size={18} />
                      )}
                    </span>
                  </h5>

                  <div className="flex justify-center mt-3">
                    {item.links.length === 0 &&
                    item.documentationlink.length === 0 &&
                    item.subjectnotesUrls.length === 0 &&
                    item.questionpaperUrls.length === 0 ? (
                      <button
                        type="button"
                        onClick={() => handleDelete(item._id)}
                        className="hover:scale-110 transition-transform duration-300 px-7 py-2 rounded-lg mb-6 text-[0.9rem] bg-green-700"
                      >
                        Delete
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          <div className="w-full md:h-[50vh] h-[40vh]  bg-black"> </div>
          </div> 

        </div>
      ) : (
        <LoadingPage />
      )}
    </div>
  );
}

export default DocDeletePage;

 
 
 
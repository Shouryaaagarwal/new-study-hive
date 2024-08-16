

import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { NavLink } from "react-router-dom";
import validator from "validator";
import { formatDate } from "../Utils/date.js"
import { IoArrowBack } from "react-icons/io5";

function Updatelecturelinks() {
  const [subjectData, setSubjectData] = useState({
    linkdescription: "",
    links: [],
  });

  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { signin } = useSelector((state) => state.admin);
  const { Usersignin } = useSelector((state) => state.user);

  const { degree, branch, subject, id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const findData = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BE}/api/get/getsubject/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        if (data.success === false) {
          setErrorMessage(data.message);
          setSuccessMessage("");
          return;
        }
        setSubjectData(data);
        setErrorMessage("");
        setSuccessMessage("");
      } catch (error) {
        setErrorMessage("Something went wrong while fetching data.");
        setSuccessMessage("");
      }
    };
    findData();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BE}/api/update/subjects/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(subjectData),
        }
      );

      const data = await res.json();
      if (data.success === false) {
        setErrorMessage(data.message);
        setSuccessMessage("");
        return;
      }
      setSuccessMessage("Subject data updated successfully.");
      setErrorMessage("");
      navigate(-1);
    } catch (error) {
      setErrorMessage("Something went wrong during update.");
      setSuccessMessage("");
    }
  };

  const handleChange = (e) => {
    setSubjectData({
      ...subjectData,
      [e.target.id]: e.target.value,
    });
  };

  const handleLink = async (id, url, urlIndex) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BE}/api/delete/leclink/${id}/${urlIndex}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data.success === false) {
        setErrorMessage(data.message);
        setSuccessMessage("");
        return;
      }
      setSubjectData({
        ...subjectData,
        links: subjectData.links.filter((_, index) => index !== urlIndex),
      });
      setSuccessMessage("Lecture Link is Deleted.");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Something went wrong while deleting link.");
      setSuccessMessage("");
    }
  };

  const handleLinksAddition = () => {
    const newLink = input.trim();
    if (newLink && validator.isURL(newLink)) {
      if (subjectData.links.length < 3) {
        setSubjectData((prevState) => ({
          ...prevState,
          links: [...prevState.links, newLink],
        }));
        setInput("");
        setSuccessMessage("Link added successfully.");
        setErrorMessage("");
      } else {
        setErrorMessage("You can only add up to 3 links.");
        setSuccessMessage("");
      }
    } else {
      setErrorMessage("Please enter a valid URL.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="w-full h-screen bg-black text-white">
      <div className="flex flex-col w-full bg-black ">
        <div className="flex items-center justify-center gap-4 sm:gap-10 md:gap-16 w-[100%] sm:w-[70%] mx-auto">
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
                  ? "text-white text-sm opacity-[1] scale-125 font-bold mukta-bold "
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
                  ? "text-white opacity-[1] scale-125 font-bold mukta-bold "
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
                    ? "text-white text-sm opacity-[1] scale-125 font-bold mukta-bold "
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
        <div className="flex flex-col gap-8 p-3">
        <div className="flex items-center mt-8 justify-center gap-10 px-4 py-2">   
        <div className="flex justify-between gap-3 sm:gap-5 md:gap-10 "> 

          <IoArrowBack
            size={24}
            className="cursor-pointer text-white hover:text-gray-400 transition-colors"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-center text-3xl">
            {degree.toUpperCase()}-{branch.toUpperCase()}-{subject.toUpperCase()}
            <span className="text-xs opacity-[0.4]"> Update Links</span>
          </h1>
            </div>
        </div>
          <h1 className="text-center text-sm "> Created At <span className="text-xs mx-2 text-center opacity-[0.4]">
                                  {formatDate(subjectData.createdAt)}
                                </span></h1>  
          <div className="flex gap-10 items-center justify-center p-3">
            <label htmlFor="linkdescription" className="text-xs sm:text-lg">Links Description</label>
            <input
              type="text"
              className="bg-black  text-white w-[70%]  text-xs sm:text-sm sm:w-[25%]  border-[1px] rounded p-3"
              value={subjectData.linkdescription || ""}
              placeholder="lecturelinksdesc..."
              onChange={handleChange}
              id="linkdescription"
            />
          </div>
          <div className="flex flex-col">
            {subjectData.links.map((url, urlIndex) => (
              <div key={urlIndex} className="flex items-center justify-center gap-5">
                <input value={url} readOnly  className="text-white mb-2 text-sm bg-black border-[1px] rounded-md p-2"/>
                 
                <div className="text-red-600 flex flex-col gap-2">
                  <button
                    className="hover:scale-110 transition-transform duration-300"
                    onClick={() => handleLink(subjectData._id, url, urlIndex)}
                  >
                    <MdDelete size={24} />
                  </button>
                </div>
              </div>
            ))}
          </div>

         
          {/* <div className="flex gap-5 items-center justify-center p-3">
            <input
              type="url"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              className="bg-black border-[1px] rounded p-2 text-sm text-white mt-10"
              placeholder="add links"
            />
            <button
              type="button"
              onClick={handleLinksAddition}
              className="bg-black border-[1px] text-white mt-10 px-4 py-2 text-sm hover:scale-105 hover:opacity-[0.5] hover:transition-transform hover:duration-300 hover:rounded"
            >
              Add
            </button>   
            <button
              type="button"
              onClick={handleUpdate}
              className="bg-black text-white border-[1px] hover:opacity-[0.6] hover:scale-105 px-6 py-3 transition-transform duration-300 rounded text-sm font-normal"
            >
              Update
            </button>
          </div> */}      
          {errorMessage && (
            <div className="text-red-600 text-xs  text-center ">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="text-green-600 text-center ">
              {successMessage}
            </div>
          )}
 <div className="flex gap-5 flex-col sm:flex-row items-center justify-center p-3 mt-10">
  <input
    type="url"
    onChange={(e) => setInput(e.target.value)}
    value={input}
    className="bg-black border-[1px] rounded p-2 text-sm text-white"
    placeholder="add links"
  />
  <button
    type="button"
    onClick={handleLinksAddition}
    className="bg-black border-[1px] text-white px-4 py-2 text-sm hover:scale-105 hover:opacity-[0.5] hover:transition-transform hover:duration-300 hover:rounded"
  >
    Add
  </button>
  <button
    type="button"
    onClick={handleUpdate}
    className="bg-black text-white border-[1px] hover:opacity-[0.6] hover:scale-105 px-6 py-3 transition-transform duration-300 rounded text-sm font-normal"
  >
    Update
  </button>
</div>

          

          <div className="flex justify-center mt-10 items-center">
            {/* <button
              type="button"
              onClick={handleUpdate}
              className="bg-black mb-2 text-white border-[1px] hover:opacity-[0.6] hover:scale-105 px-6 py-3 transition-transform duration-300 rounded text-sm font-normal"
            >
              Update
            </button> */}
          </div>
        </div>
      </div> 
      <div className="w-full md:h-[60vh] h-[40vh]  bg-black"> </div>

    </div>
  );
}

export default Updatelecturelinks;


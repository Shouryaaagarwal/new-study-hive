import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { NavLink } from "react-router-dom";
import { formatDate } from "../../../api/Utils/date";
import { IoArrowBack } from "react-icons/io5";

function Updatedoclinks() {
  const [subjectData, setSubjectData] = useState({
    documentationlinkdesc: "",
    documentationlink: [],
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
          `${process.env.BACKEND}/api/get/getsubject/${id}`,
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
          return;
        }
        setSubjectData(data);
        setErrorMessage("");
        setSuccessMessage("");
      } catch (error) {
        setErrorMessage("Something went wrong while fetching data.");
      }
    };
    findData();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `${process.env.BACKEND}/api/update/subjects/${id}`,
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
        return;
      }
      setSuccessMessage("Subject data updated successfully.");
      navigate(-1);
    } catch (error) {
      setErrorMessage("Something went wrong during update.");
    }
  };

  const handleChange = (e) => {
    setSubjectData({
      ...subjectData,
      [e.target.id]: e.target.value,
    });
  };

  const handleDocLink = async (id, url, urlIndex) => {
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
        setErrorMessage(data.message);
        return;
      }
      setSubjectData({
        ...subjectData,
        documentationlink: subjectData.documentationlink.filter(
          (_, index) => index !== urlIndex
        ),
      });
      setSuccessMessage("Document link is deleted.");
    } catch (error) {
      setErrorMessage("Something went wrong while deleting link.");
    }
  };
  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleLinksAddition = () => {
    const newLink = input.trim();
    if (newLink && isValidURL(newLink)) {
      if (subjectData.documentationlink.length < 3) {
        setSubjectData((prevState) => ({
          ...prevState,
          documentationlink: [...prevState.documentationlink, newLink],
        }));
        setInput("");
        setSuccessMessage("Document Link added successfully.");
        setErrorMessage("");
      } else {
        setErrorMessage("You can only add up to 3 documents.");
        setSuccessMessage("");
      }
    } else {
      setErrorMessage("Please enter a valid URL.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="w-full h-screen bg-black text-white">
      <div className="flex flex-col bg-black">
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
          {signin && (
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
          )}
          {Usersignin && (
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `text-white text-center text-xs sm:text-sm md:text-[13px] opacity-[0.8] my-8 font-normal hover:scale-110 transition-transform duration-300 ${
                  isActive
                    ? "text-white opacity-[1] scale-125 font-bold mukta-bold "
                    : ""
                }`
              }
            >
              User
            </NavLink>
          )}
          {!signin && (
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
          {signin && (
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
          )}
          {signin && (
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
          )}
        </div>
        <div className="flex items-center  bg-black justify-center mt-0 pt-0">
          <hr className="w-[80%] sm:w-[80%] md:w-[60%] h-[0.6px] px-10 rounded-full opacity-[0.5] bg-white" />
        </div>
        <div className="flex flex-col gap-8 p-3 bg-black">
          <div className="flex items-center mt-8 justify-center gap-10 px-4 py-2">
            <div className="flex justify-between gap-3 sm:gap-5 md:gap-10 ">
              <IoArrowBack
                size={24}
                className="cursor-pointer text-white hover:text-gray-400 transition-colors"
                onClick={() => navigate(-1)}
              />
              <h1 className="text-center text-3xl">
                {degree.toUpperCase()}-{branch.toUpperCase()}-
                {subject.toUpperCase()}
                <span className="text-xs opacity-[0.4]">
                  {" "}
                  Update Documentation Link
                </span>
              </h1>
            </div>
          </div>
          <h1 className="text-center text-sm">
            Created At{" "}
            <span className="text-xs mx-2 text-center opacity-[0.4]">
              {formatDate(subjectData.createdAt)}
            </span>
          </h1>
          <div className="flex gap-10 items-center justify-center p-3">
            <label
              htmlFor="documentationlinkdesc"
              className="text-xs sm:text-lg"
            >
              Documentation Description
            </label>
            <input
              type="text"
              className="bg-black text-white w-[70%] text-xs sm:text-sm sm:w-[25%] border-[1px] rounded p-3"
              value={subjectData.documentationlinkdesc || ""}
              placeholder="Enter documentation description"
              id="documentationlinkdesc"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            {subjectData.documentationlink.map((url, urlIndex) => (
              <div
                key={urlIndex}
                className="flex items-center justify-center gap-5"
              >
                <input
                  value={url}
                  readOnly
                  className="text-white mb-2 text-sm bg-black border-[1px] rounded-md p-2"
                />

                <div className="text-red-600 flex flex-col gap-2">
                  <button
                    className="hover:scale-110 transition-transform duration-300"
                    onClick={() =>
                      handleDocLink(subjectData._id, url, urlIndex)
                    }
                  >
                    <MdDelete size={24} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {errorMessage && (
            <p className="text-red-700 text-xs text-center">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-500 text-xs text-center">
              {successMessage}
            </p>
          )}
        </div>
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
            className="bg-black border-[1px]  text-white px-4 py-2 text-sm hover:scale-105 hover:opacity-[0.5] hover:transition-transform hover:duration-300 hover:rounded"
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
      </div> 
      <div className="w-full md:h-[57vh] h-[40vh] md:mt-20   bg-black"> </div>

    </div>
  );
}

export default Updatedoclinks;

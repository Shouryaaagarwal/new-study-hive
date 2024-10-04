
import { deleteObject, getStorage, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { FaRegFilePdf } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { app } from "../Firebase";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useSelector } from "react-redux";  
import { formatDate } from "../Utils/date.js"
import { IoArrowBack } from "react-icons/io5";

function UpdateQuestionPaper() {
  const [subjectData, setSubjectData] = useState({
    questionpaperdec: "",
    questionpaperUrls: [],
  });

  const [filePerc2, setFilePerc2] = useState(0);
  const [subjectfile, setSubjectFile] = useState(null);
  const [error, setError] = useState("");
  const { signin } = useSelector((state) => state.admin);
  const { Usersignin } = useSelector((state) => state.user);
  const { degree, branch, subject, id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
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
          setError("Failed to load subject data.");
          return;
        }
        setSubjectData(data);
      } catch (error) {
        setError("Failed to load subject data.");
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setSubjectData({
      ...subjectData,
      [e.target.id]: e.target.value,
    });
  };

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
        setError("Failed to update subject data.");
        return;
      }
      navigate(-1);
    } catch (error) {
      setError("Failed to update subject data.");
    }
  };

  const handleDeletePDF = async (subjectId, urlIndex, link) => {
    try {
      const storage = getStorage();
      const desertRef = ref(storage, link);
      await deleteObject(desertRef);

      const res = await fetch(
        `${import.meta.env.VITE_BE}/api/delete/questionpaperspdf/${subjectId}/${urlIndex}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      if (data.success === false) {
        setError("Failed to delete the file.");
        return;
      }

      setSubjectData((prevData) => ({
        ...prevData,
        questionpaperUrls: prevData.questionpaperUrls.filter(
          (_, index) => index !== urlIndex
        ),
      }));
    } catch (error) {
      setError("Failed to delete the file.");
    }
  };

  const handleSubjectPdfUpload = (e) => {
    if (subjectfile && subjectfile.length > 0 && subjectfile.length < 3) {
      const promises = Array.from(subjectfile).map((file) =>
        storeSubjectPdf(file)
      );
      Promise.all(promises)
        .then((urls) => {
          setSubjectData((prevState) => ({
            ...prevState,
            questionpaperUrls: prevState.questionpaperUrls.concat(urls),
          }));
          setError("");
        })
        .catch((error) => {
          setError("Failed to upload files.");
        });
    } else {
      setError("You can upload up to 3 files only.");
    }
  };

  const storeSubjectPdf = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFilePerc2(Math.round(progress));
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col">
      <div className="flex flex-col flex-grow">
        <div className="flex items-center justify-center gap-4 sm:gap-10 md:gap-16 w-full sm:w-4/5 mx-auto">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `text-white text-center text-xs sm:text-sm md:text-[13px] opacity-80 my-8 font-normal hover:scale-110 transition-transform duration-300 ${
                isActive
                  ? "text-white opacity-100 scale-125 font-bold"
                  : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/b.e"
            className={({ isActive }) =>
              `text-white text-center text-xs sm:text-sm md:text-[13px] opacity-80 my-8 font-normal hover:scale-110 transition-transform duration-300 ${
                isActive
                  ? "text-white opacity-100 scale-125 font-bold"
                  : ""
              }`
            }
          >
            B.E
          </NavLink>
          <NavLink
            to="/m.e"
            className={({ isActive }) =>
              `text-white text-center text-xs sm:text-sm md:text-[13px] opacity-80 my-8 font-normal hover:scale-110 transition-transform duration-300 ${
                isActive
                  ? "text-white opacity-100 scale-125 font-bold"
                  : ""
              }`
            }
          >
            M.E
          </NavLink>
          {signin && (
            <div className="hover:scale-110 transition-transform duration-300">
              <NavLink
                to="/admin/profile"
                className={({ isActive }) =>
                  `text-white text-center text-xs sm:text-sm md:text-[13px] opacity-80 my-8 font-normal hover:scale-110 transition-transform duration-300 ${
                    isActive
                      ? "text-white opacity-100 scale-125 font-bold"
                      : ""
                  }`
                }
              >
                Admin
              </NavLink>
            </div>
          )}
          {Usersignin && (
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `text-white text-center text-xs sm:text-sm md:text-[13px] opacity-80 my-8 font-normal hover:scale-110 transition-transform duration-300 ${
                  isActive
                    ? "text-white opacity-100 scale-125 font-bold"
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
                `text-white text-center text-xs sm:text-sm md:text-[13px] opacity-80 my-8 font-normal hover:scale-110 transition-transform duration-300 ${
                  isActive
                    ? "text-white opacity-100 scale-125 font-bold"
                    : ""
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
                  `text-white text-center text-xs sm:text-sm md:text-[13px] opacity-80 my-8 font-normal hover:scale-110 transition-transform duration-300 ${
                    isActive
                      ? "text-white opacity-100 scale-125 font-bold"
                      : ""
                  }`
                }
              >
                Update
              </NavLink>
              <NavLink
                to={`/${degree}/${branch}/subjects/${subject}/docdelete`}
                className={({ isActive }) =>
                  `text-white text-center text-xs sm:text-sm md:text-[13px] opacity-80 my-8 font-normal hover:scale-110 transition-transform duration-300 ${
                    isActive
                      ? "text-white opacity-100 scale-125 font-bold"
                      : ""
                  }`
                }
              >
                Document Delete
              </NavLink>
              <NavLink
                to={`/${degree}/${branch}/subjects/${subject}/questionpaper`}
                className={({ isActive }) =>
                  `text-white text-center text-xs sm:text-sm md:text-[13px] opacity-80 my-8 font-normal hover:scale-110 transition-transform duration-300 ${
                    isActive
                      ? "text-white opacity-100 scale-125 font-bold"
                      : ""
                  }`
                }
              >
                Question Papers
              </NavLink>
            </>
          )}
        </div>

        <div className="w-full flex flex-col items-center">
          <h1 className="text-3xl font-bold text-center mt-8 mb-4">
            Update Question Paper
          </h1>
          <div className="flex flex-col w-full sm:w-4/5 mx-auto gap-4">
            <textarea
              id="questionpaperdec"
              value={subjectData.questionpaperdec}
              onChange={handleChange}
              placeholder="Enter question paper description"
              className="p-4 border border-gray-600 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex flex-col">
              {subjectData.questionpaperUrls.map((url, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <a
                    href={url}
                    className="flex items-center text-blue-400 underline hover:text-blue-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaRegFilePdf className="mr-2" />
                    Question Paper {index + 1}
                  </a>
                  <button
                    onClick={() => handleDeletePDF(id, index, url)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <MdDelete />
                  </button>
                </div>
              ))}
            </div>

            <input
              type="file"
              accept=".pdf"
              multiple
              onChange={(e) => setSubjectFile(e.target.files)}
              className="file:border-gray-600 file:bg-gray-900 file:text-white file:border rounded-md file:p-2"
            />
            <button
              onClick={handleSubjectPdfUpload}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
            >
              Upload PDF
            </button>
            {filePerc2 > 0 && <div>Upload Progress: {filePerc2}%</div>}
            {error && <div className="text-red-500">{error}</div>}

            <button
              onClick={handleUpdate}
              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md mt-4"
            >
              Update
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-auto mb-4 ">
        <NavLink
          to={`/${degree}/${branch}/${subject}`}
          className="flex items-center text-white text-lg font-semibold hover:underline"
        >
          <IoArrowBack className="mr-2" />
          Back
        </NavLink>
      </div> 
      <div className="w-full md:h-[55vh] h-[40vh] md:mt-20  bg-black"> </div>

    </div>
  );
}

export default UpdateQuestionPaper;

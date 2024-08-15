import { deleteObject, getStorage, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { FaRegFilePdf } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { app } from "../Firebase";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useSelector } from "react-redux";  
import { formatDate } from "../../../api/Utils/date";
import { IoArrowBack } from "react-icons/io5";


function UpdateQuestionPaper2() {
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
        `${process.env.BACKEND}/api/delete/questionpaperspdf/${subjectId}/${urlIndex}`,
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
    <div className="w-full h-screen bg-black text-white">
      <div className="flex flex-col bg-black  ">
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
        <div className="flex flex-col gap-10">
          
        <div className="flex items-center mt-8 justify-center  px-4 py-2">   
            <div className="flex justify-between gap-3 sm:gap-5 md:gap-10 "> 

          <IoArrowBack
            size={24}
            className="cursor-pointer text-white hover:text-gray-400 transition-colors"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-center text-3xl">
            {degree.toUpperCase()}-{branch.toUpperCase()}-{subject.toUpperCase()}
            <span className="text-xs opacity-[0.4]"> Update Question paper</span>
          </h1>
            </div>
        </div>
          <h1 className="text-center text-sm "> Created At <span className="text-xs mx-2 text-center opacity-[0.4]">
                                  {formatDate(subjectData.createdAt)}
                                </span></h1>  
       

          <div className="flex items-center p-3 justify-center">
            <label htmlFor="questionpaperdec" className="text-xs sm:text-lg">
              Question Paper Description
            </label>
            <input
              type="text"
              value={subjectData.questionpaperdec || ""}
              onChange={handleChange}
              placeholder="questionpaperdesc..."
              className="bg-black mx-10 text-white w-[70%]  text-xs sm:text-sm sm:w-[30%]  border-[1px] rounded p-3"
              id="questionpaperdec"
            />
          </div>

          <div>
            {subjectData.questionpaperUrls.map((url, urlIndex) => (
              <div
                className="flex items-center justify-center gap-4"
                key={urlIndex}
              >
                <div>
                  <Link onClick={() => window.open(url, "_blank")}>
                    <FaRegFilePdf size={24} />
                  </Link>
                </div>
                <div className="text-red-600 hover:scale-110 transition-transform duration-300">
                  <button
                    className="hover:scale-110 transition-transform duration-300"
                    onClick={() =>
                      handleDeletePDF(subjectData._id, urlIndex, url)
                    }
                  >
                    <MdDelete size={26} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-10 items-center justify-center">
            <input
              type="file"
              id="pdfFile"
              accept="application/pdf"
              onChange={(e) => setSubjectFile(e.target.files)}
              multiple
              className="border-[1px] bg-black w-[50%] sm:w-[25%] text-white py-2 px-2 rounded"
            />
            <button
              type="button"
              onClick={handleSubjectPdfUpload}
              className="bg-black text-white border-[1px] hover:opacity-[0.6] hover:scale-105 px-6 py-3 transition-transform duration-300 rounded text-sm font-normal flex items-center justify-center gap-3 group"
            >
              Upload
            </button>
          </div>

          {error && (
            <div className="text-red-700 text-xs text-center">
              {error} Or provide a file
            </div>
          )}

          <div className="flex items-center justify-center">
            <button
              onClick={handleUpdate}
              className="bg-black text-white border-[1px] hover:opacity-[0.6] hover:scale-105 px-6 py-3 transition-transform duration-300 rounded text-sm font-normal"
            >
              Update
            </button>
          </div>
        </div>
      </div> 
      <div className="w-full md:h-[55vh] h-[40vh] mt-20  bg-black"> </div>

    </div>
  );
}

export default UpdateQuestionPaper2;

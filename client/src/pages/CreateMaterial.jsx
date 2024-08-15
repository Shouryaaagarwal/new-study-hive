import React, { useEffect, useState } from "react";
import { MdArrowOutward, MdDelete } from "react-icons/md";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  subjectFailure,
  subjectmadeStart,
  subjectmadeSuccess,
} from "../Redux/Slices/subjectSlice";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../Firebase";
import Navigation from "../components/Navigation";
import Contact from "../components/Contacts";
import validator from "validator";
import { IoLinkSharp } from "react-icons/io5";
import { FaRegFilePdf } from "react-icons/fa";
import { deleteerror } from "../Redux/Slices/deleteSlice";

function CreateMaterial() {
  const { degree, branch } = useParams();
  const [subjectfile, setsubjectfile] = useState(null);
  const [input, setInput] = useState("");
  const [input2, setinput2] = useState("");
  const [questionPaperFiles, setQuestionPaperFiles] = useState(null);
  const [fileUploadError1, setFileUploadError1] = useState(false);
  const [fileUploadError2, setFileUploadError2] = useState(false);
  const [filePerc1, setFilePerc1] = useState(0);
  const [filePerc2, setFilePerc2] = useState(0);
  const [linksuccess, setlinksuccess] = useState("");
  const [linksfaliure, setlinksfaliure] = useState("");
  const [doclinksuccess, setdoclinksuccess] = useState("");
  const [doclinksfaliure, setdoclinksfaliure] = useState("");
  const [fileUploadError, setFileUploadError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.subject);
  const [formData, setFormData] = useState({
    subjectnotesUrls: [],
    questionpaperUrls: [],
    stars: "1",
    degree: degree,
    branch: branch,
    subject: "",
    pdfdescription: "",
    linkdescription: "",
    documentationlink: [],
    links: [],
    documentationlinkdesc: "",
    questionpaperdec: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    const newValue =
      id === "subject"
        ? value.toLowerCase().replace(/\s+/g, "-")
        : value.toLowerCase();
    setFormData({ ...formData, [id]: newValue });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(subjectmadeStart());
    try {
      const res = await fetch(
        `${process.env.BACKEND}/api/admin/create/subject`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (data.success === false) {
        dispatch(subjectFailure(data.message));
        return;
      }

      dispatch(subjectmadeSuccess(data));
      navigate("/admin/create");
    } catch (error) {
      dispatch(subjectFailure(error.message));
    }
  };

  const handlesubjectPdfUpload = (e) => {
    if (
      subjectfile &&
      subjectfile.length > 0 &&
      subjectfile.length <= 3 &&
      formData.subjectnotesUrls.length <= 3
    ) {
      const promises = [];
      for (let i = 0; i < subjectfile.length; i++) {
        promises.push(storesubjectPdf(subjectfile[i]));
      }
      Promise.all(promises).then((urls) => {
        setFormData((prevState) => ({
          ...prevState,
          subjectnotesUrls: prevState.subjectnotesUrls.concat(urls),
        }));
      });
    } else {
      setFileUploadError1(true);
    }
  };

  const storesubjectPdf = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, `${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFilePerc1(Math.round(progress));
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

  const handlequestionpaperPdfUpload = (e) => {
    if (
      questionPaperFiles &&
      questionPaperFiles.length > 0 &&
      questionPaperFiles.length <= 3 &&
      formData.questionpaperUrls.length <= 3
    ) {
      const promises = [];
      for (let i = 0; i < questionPaperFiles.length; i++) {
        promises.push(storequestionpaperPdf(questionPaperFiles[i]));
      }
      Promise.all(promises).then((urls) => {
        setFormData((prevState) => ({
          ...prevState,
          questionpaperUrls: prevState.questionpaperUrls.concat(urls),
        }));
      });
    } else {
      setFileUploadError2(true);
    }
  };

  const storequestionpaperPdf = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, `${fileName}`);
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

  const handleLinks = (e) => {
    e.preventDefault();
    const newLink = input.trim();
    setlinksuccess("");
    setlinksfaliure("");

    if (newLink === "") {
      setlinksfaliure("URL cannot be empty");
      return;
    }

    if (validator.isURL(newLink)) {
      if (formData.links.length < 3) {
        setFormData((prevState) => ({
          ...prevState,
          links: [...prevState.links, newLink],
        }));
        setInput("");
        setlinksuccess("Link Added");
      } else {
        setlinksfaliure("You can add up to 3 links");
      }
    } else {
      setlinksfaliure("Invalid URL");
    }
  };
  const handleDocLinks = (e) => {
    e.preventDefault();
    const newLink = input2.trim();
    setdoclinksfaliure("");
    setdoclinksuccess("");

    if (newLink === "") {
      setdoclinksfaliure("URL cannot be empty");
      return;
    }


    if (newLink && validator.isURL(newLink)) {
      if (formData.documentationlink.length < 3) {
        setFormData((prevdata) => ({
          ...prevdata,
          documentationlink: [...prevdata.documentationlink, newLink],
        }));
        setinput2("");
        setdoclinksuccess("Link Added");
      } else {
        setdoclinksfaliure("You can add upto 3 links");
      }
    } else {
      setdoclinksfaliure("Invalid URL");
    }
  };

  const removeLink = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      links: prevState.links.filter((_, linkIndex) => linkIndex !== index),
    }));
  };
  const removdoclink = (index) => {
    setFormData((prevdata) => ({
      ...prevdata,
      documentationlink: prevdata.documentationlink.filter(
        (_, linkIndex) => linkIndex !== index
      ),
    }));
  };

  

  const handleDeletePDF = async (link, urlindex) => {
    try {
      const storage = getStorage(app);
      const desertRef = ref(storage, link);
      await deleteObject(desertRef);

      setFormData((prevState) => ({
        ...prevState,
        subjectnotesUrls: prevState.subjectnotesUrls.filter(
          (_, index) => index !== urlindex
        ),
      }));

    } catch (error) {
      return ; 
    }
  };   



  const handleDeletequestionpaperPDF = async (link, urlindex) => {
    try {
      const storage = getStorage(app);
      const desertRef = ref(storage, link);
      await deleteObject(desertRef);

      setFormData((prevState) => ({
        ...prevState,
        questionpaperUrls: prevState.questionpaperUrls.filter(
          (_, index) => index !== urlindex
        ),
      }));

    } catch (error) {
      return  ; 
    }
  };   


  return (
    <div className="w-full h-screen bg-black text-white">
      <Navigation />
      <div className="">
        <h1 className="uppercase text-center mt-10 mukta-extrabold text-[40px]">
          {degree}/{branch}
        </h1>

        <div className="h-[100%]">
          <div className="w-full h-[80%] bg-black text-white  flex flex-col mt-1 gap-2">
            <div className="flex flex-col items-center sm:flex-col md:flex-col w-full p-3   gap-5 justify-between ">
              <div className="flex w-[90vw] sm:w-[65vw] md:w-[40vw] h-full p-2 rounded  border-[1px] flex-col gap-2">
                <div className="flex  w-full items-center">
                  <label
                    htmlFor="degree"
                    className="mukta-light font-medium w-[30%] mx-2 text-left pl-2"
                  >
                    Degree
                  </label>
                  <input
                    type="text"
                    value={degree}
                    id="degree"
                    className="mukta-light w-[70%] py-2 bg-black border-[1px] px-2 rounded"
                    readOnly
                  />
                </div>
                <div className="flex gap-2 w-full items-center">
                  <label
                    htmlFor="branch"
                    className="mukta-light mx-2 font-medium w-[30%] text-left pl-2"
                  >
                    Branch
                  </label>
                  <input
                    type="text"
                    value={branch}
                    id="branch"
                    className="mukta-light w-[70%] py-2 bg-black border-[1px] px-2 rounded"
                    readOnly
                  />
                </div>
                <div className="flex gap-2 w-full items-center">
                  <label
                    htmlFor="subject"
                    className="mukta-light mx-2 font-medium w-[30%] text-left pl-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    onChange={handleChange}
                    placeholder="subject"
                    className="mukta-light w-[70%] py-2 bg-black border-[1px] px-2 rounded"
                  />
                </div>
                {/* <hr className="w-[80%] opacity-[0.7] mt-6 ml-[10%]" /> */}
              </div>

              <div className=" w-[90vw] sm:w-[65vw] md:w-[40vw]  border-[1px]  rounded p-1">
                <div className="flex  gap-2   flex-col">
                  <div className="flex  flex-col gap-3 p-2  w-[100%]">
                    <div className="flex ">
                      <label className="w-[30%] text-sm   mukta-light font-medium">
                        Lecture - Description
                      </label>
                      <input
                        type="text"
                        id="linkdescription"
                        maxLength={30}
                        placeholder="lecture desc.."
                        onChange={handleChange}
                        className=" border-[1px] bg-black px-3 py-2  w-[75%] rounded"
                      />
                    </div>

                    <div className="flex">
                      <label className="w-[30%] text-sm  mukta-light font-medium">
                        Lecture Link
                      </label>
                      <input
                        type="url"
                        id="links"
                        placeholder="lecture link.."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className=" border-[1px] bg-black px-3 py-2 w-[75%] rounded"
                      />
                    </div>
                    <div className="flex mt-2 justify-between">
                      <div>
                        {linksuccess && (
                          <p className="text-green-700 text-xs">
                            {linksuccess}
                          </p>
                        )}
                        {linksfaliure && (
                          <p className="text-red-700 text-xs">{linksfaliure}</p>
                        )}
                      </div>

                      <button
                        onClick={handleLinks}
                        className="bg-black text-white border-[1px]  hover:opacity-[0.6] px-6 py-3  transition-transform duration-300 hover:rounded  text-sm font-normal flex items-center justify-center gap-3 group
  "
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex gap-10 items-center justify-center">
                      {formData.links.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="flex flex-col gap-2 items-center text-sm"
                          >
                            <span>{index + 1}. </span>

                            <Link
                              onClick={() => window.open(item, "_blank")}
                              key={index}
                            >
                              <IoLinkSharp className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]" />
                            </Link>

                            <button
                              className="text-red-700"
                              onClick={() => removeLink(index)}
                            >
                              <MdDelete className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <hr className="w-[80%] opacity-[0.7] mt-7 mb-7  ml-[10%]" />

                  <div className="flex flex-col gap-3 p-2 mt-0  w-[100%]">
                    <div className="flex gap-2">
                      <label className="mukta-light text-sm font-medium w-[30%]">
                        Documentation Description
                      </label>
                      <input
                        type="text"
                        id="documentationlinkdesc"
                        maxLength={30}
                        placeholder="documentation desc.."
                        onChange={handleChange}
                        className="  px-3 w-[80%] bg-black border-[1px]   rounded mukta-normal"
                      />
                    </div>

                    <div className="flex gap-2">
                      <label className="mukta-light text-sm font-medium w-[30%]">
                        Documentation Link
                      </label>
                      <input
                        type="url"
                        id="documentationlink"
                        placeholder="documentation link.."
                        value={input2}
                        onChange={(e) => setinput2(e.target.value)}
                        className="  px-3 w-[80%] p-2 bg-black border-[1px]   rounded mukta-normal"
                      />
                    </div>
                    <div className="flex justify-between">
                      <div>
                        {doclinksuccess && (
                          <p className="text-green-700 text-xs">
                            {doclinksuccess}
                          </p>
                        )}
                        {doclinksfaliure && (
                          <p className="text-red-700 text-xs">
                            {doclinksfaliure}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={handleDocLinks}
                        className="bg-black text-white border-[1px]  hover:opacity-[0.6] px-6 py-3  transition-transform duration-300 hover:rounded  text-sm font-normal flex items-center justify-center gap-3 group
                   "
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex gap-10 items-center justify-center">
                      {formData.documentationlink.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="flex flex-col gap-2 items-center text-sm"
                          >
                            <span>{index + 1}. </span>

                            <Link
                              onClick={() => window.open(item, "_blank")}
                              key={index}
                            >
                              <IoLinkSharp className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]" />
                            </Link>

                            <button
                              className="text-red-700"
                              onClick={() => removdoclink(index)}
                            >
                              <MdDelete className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className=" w-[90vw] sm:w-[65vw]   md:w-[40vw] border-[1px] rounded p-2  ">
                {/* <div className="flex  gap-2"> */}
                <div className="flex flex-col gap-1 p-1">
                  <div className="flex flex-col  gap-3  w-full">
                    <div className="flex  ">
                      <label className="w-[30%]  mukta-light font-medium">
                        PDF's Description
                      </label>
                      <input
                        type="text"
                        id="pdfdescription"
                        placeholder="pdf desc.."
                        maxLength={30}
                        onChange={handleChange}
                        className="border-[1px] ml-1 p-2 bg-black w-[80%] px-2  rounded"
                      />
                    </div>

                    <div className="flex">
                      <label className="w-[30%] text-sm   mukta-light font-medium">
                        Upload PDF
                      </label>
                      <input
                        type="file"
                        id="pdfFile"
                        multiple
                        accept="application/pdf"
                        onChange={(e) => setsubjectfile(e.target.files)}
                        className=" w-[80%] ml-1 border-[1px] bg-black py-2  px-2 rounded"
                      />
                    </div>
                    <div className="flex mt-2 justify-between">
                      <div>
                        {fileUploadError1 ? (
                          <span className="text-red-700 text-sm">
                            Error Uploading PDF (max-size:10mb max-pdf:3)
                          </span>
                        ) : filePerc1 > 0 && filePerc1 < 100 ? (
                          <span className="text-white z-10">{`Uploading ${filePerc1}%`}</span>
                        ) : filePerc1 === 100 ? (
                          <span className="text-green-700 mukta-light font-medium">
                            PDF successfully uploaded!
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={(e) => handlesubjectPdfUpload(e)}
                          className="bg-black text-white border-[1px]  hover:opacity-[0.6] px-6 py-3  transition-transform duration-300 hover:rounded  text-sm font-normal flex items-center justify-center gap-3 group"
                        >
                          Upload
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-10 items-center justify-center">
                      {formData.subjectnotesUrls.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="flex flex-col gap-2 items-center text-sm"
                          >
                            <span>{index + 1}. </span>

                            <Link
                              onClick={() => window.open(item, "_blank")}
                              key={index}
                            >
                              <FaRegFilePdf className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]" />
                            </Link>

                            <button
                              className="text-red-700"
                              onClick={() => handleDeletePDF(item , index)}
                            >
                              <MdDelete className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <hr className="w-[80%] opacity-[0.7] mt-10 mb-10 ml-[10%]" />
                  <div className="flex flex-col gap-3 ">
                    <div className="flex">
                      <label className="w-[30%] text-sm  mukta-light font-medium">
                        Question Paper Description
                      </label>
                      <input
                        type="text"
                        id="questionpaperdec"
                        maxLength={30}
                        placeholder="question paper desc.."
                        onChange={handleChange}
                        className=" w-[80%] ml-1 p-2 bg-black border-[1px] px-2  rounded"
                      />
                    </div>

                    <div className="flex">
                      <label className="w-[30%] text-sm   mukta-light font-medium">
                        Upload Question Paper
                      </label>
                      <input
                        type="file"
                        id="questionPaperFile"
                        multiple
                        onChange={(e) => setQuestionPaperFiles(e.target.files)}
                        accept="application/pdf"
                        className=" w-[80%] ml-1 border-[1px] bg-black py-2  px-2 rounded"
                      />
                    </div>

                    <div className="flex mt-2  justify-between">
                      <div>
                        {fileUploadError2 ? (
                          <span className="text-red-700 text-sm">
                            Error Uploading PDF (max-size:10mb max-pdf:3)
                          </span>
                        ) : filePerc2 > 0 && filePerc2 < 100 ? (
                          <span className="text-white z-10">{`Uploading ${filePerc2}%`}</span>
                        ) : filePerc2 === 100 ? (
                          <span className="text-green-700 mukta-light font-medium">
                            PDF successfully uploaded!
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={(e) => handlequestionpaperPdfUpload(e)}
                          className="bg-black text-white border-[1px]  hover:opacity-[0.6] px-6 py-3  transition-transform duration-300 hover:rounded  text-sm font-normal flex items-center justify-center gap-3 group"
                        >
                          Upload
                        </button>
                      </div>   
                      
                    </div> 
                    <div className="flex gap-10 items-center justify-center">
                      {formData.questionpaperUrls.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="flex flex-col gap-2 items-center text-sm"
                          >
                            <span>{index + 1}. </span>

                            <Link
                              onClick={() => window.open(item, "_blank")}
                              key={index}
                            >
                              <FaRegFilePdf className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]" />
                            </Link>

                            <button
                              className="text-red-700"
                              onClick={() => handleDeletequestionpaperPDF(item , index)}
                            >
                              <MdDelete className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                    <hr className="w-[80%] opacity-[0.7] mt-10 mb-10 ml-[10%]" />
                    {error ? (
                      <p className="text-red-700 mukta-light font-thin text-center ">
                        {error}
                      </p>
                    ) : (
                      ""
                    )}
                    <div className="flex pb-4 items-center justify-center mt-2">
                      <button
                        type="button"
                        onClick={handleClick}
                        className="bg-black border-[1px] hover:opacity-[0.5] hover:rounded transition-transform duration-300 px-6 py-5 text-white text-sm font-normal flex items-center justify-center gap-3 group"
                      >
                        Create Subject
                        <div>
                          <MdArrowOutward
                            className="transition-transform duration-300 ease-in-out group-hover:animate-rotate "
                            size={14}
                          />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateMaterial;

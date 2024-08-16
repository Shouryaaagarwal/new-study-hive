
import React, { useState } from "react";
import Navigation from "../components/Navigation";
import { useNavigate, useParams } from "react-router";
import { MdArrowOutward } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";

function Comments() {
  const navigate = useNavigate();
  const { degree, branch, subject, section , id  } = useParams();
  
  const [comment, setComment] = useState({
    degree: degree,
    branch: branch,
    subject: subject,
    section: section,   
    id:id ,  
    names: "",
    email: "",
    comment: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setComment({
      ...comment,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 

    try {
      const res = await fetch(`${import.meta.env.VITE_BE}/api/comment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      });

      const data = await res.json();
      if (data.success === false) {
        setError("Something went wrong");
        return;
      }

      navigate(-1);
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="w-full h-screen bg-black text-white">
      <Navigation />
      <div className="w-full flex flex-col bg-black">
        <div className="flex mt-10 items-center justify-between p-4">
          <IoArrowBack
            size={24}
            className="cursor-pointer text-white hover:text-gray-400 "
            onClick={() => navigate(-1)}
          />
          <h1 className="text-center mukta-light text-3xl flex-grow">Comments</h1>
        </div>  

        <div className="flex justify-center text-sm">
          <p className="mukta-light font-thin opacity-[0.7] mt-2 sm:w-[60%] md:w-[50%] w-[80%] text-center">
            Welcome to the Comment Page! Share your thoughts, ask questions, and discuss subject-related issues. Your feedback helps us improve our resources. Please keep comments respectful and constructive. We're here to support each other. Start a discussion or seek help—your input is valued!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex sm:mt-2 md:mt-10 mt-2 flex-col sm:flex-col md:flex-row gap-2">
            <div className="flex flex-col items-center gap-5 w-full">
              <input
                type="text"
                id="degree"
                value={degree.toUpperCase()}
                readOnly
                placeholder="degree"
                className="bg-black w-[70%] sm:w-[50%] focus:outline-none focus:scale-110 focus:transition-transform focus:duration-300 border-[1px] opacity-[0.7] rounded py-1 px-2 mukta-light"
              />
              <input
                type="text"
                id="branch"
                value={branch.toUpperCase()}
                readOnly
                placeholder="branch"
                className="bg-black w-[70%] sm:w-[50%] focus:outline-none focus:scale-110 focus:transition-transform focus:duration-300 border-[1px] opacity-[0.7] rounded py-1 px-2 mukta-light"
              />
              <input
                type="text"
                id="subject"
                value={subject.toUpperCase()}
                readOnly
                placeholder="subject"
                className="bg-black w-[70%] sm:w-[50%] focus:outline-none focus:scale-110 focus:transition-transform focus:duration-300 border-[1px] opacity-[0.7] rounded py-1 px-2 mukta-light"
              />
              <input
                type="text"
                id="section"
                value={section.toUpperCase()}
                readOnly
                placeholder="section"
                className="bg-black w-[70%] sm:w-[50%] focus:outline-none focus:scale-110 focus:transition-transform focus:duration-300 border-[1px] opacity-[0.7] rounded py-1 px-2 mukta-light"
              />
            </div>
            <div className="flex flex-col gap-5 items-center w-full">
              <input
                type="text"
                id="names"
                onChange={handleChange}
                placeholder="name"
                className="bg-black w-[70%] sm:w-[50%] focus:outline-none focus:scale-110 focus:transition-transform focus:duration-300 border-[1px] opacity-[0.7] rounded py-1 px-2 mukta-light"
              />
              <input
                type="text"
                id="email"
                onChange={handleChange}
                placeholder="email"
                className="bg-black w-[70%] sm:w-[50%] focus:outline-none focus:scale-110 focus:transition-transform focus:duration-300 border-[1px] opacity-[0.7] rounded py-1 px-2 mukta-light"
              />
              <textarea
                maxLength={140}
                id="comment"
                rows={2}
                cols={27}
                className="bg-black w-[70%] sm:w-[50%] focus:outline-none focus:scale-110 focus:transition-transform focus:duration-300 border-[1px] opacity-[0.7] rounded py-1 px-2 mukta-light"
                onChange={handleChange}
                placeholder="comment"
              ></textarea>
              {error && (
                <p className="text-red-700 mt-2 mukta-light font-thin">{error}</p>
              )}
              <button
                type="submit"
                className="bg-black sm:w-[30%] md:w-[30%] w-[50%] mb-1 hover:scale-110 border-[1px] hover:opacity-[0.6] hover:transition-transform hover:duration-300 rounded mt-2 px-6 py-5 text-white text-sm font-normal flex items-center justify-center gap-3 group"
              >
                Submit
                <MdArrowOutward
                  className="transition-transform duration-300 ease-in-out group-hover:animate-rotate"
                  size={14}
                />
              </button>
            </div>
          </div>
        </form>
      </div> 
      <div className="w-full md:h-[50vh] h-[20vh] md:mt-[100px]  bg-black"> </div>

    </div> 
  );
}

export default Comments;

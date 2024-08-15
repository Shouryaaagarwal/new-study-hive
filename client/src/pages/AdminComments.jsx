import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Contact from "../components/Contacts";
import { MdArrowOutward } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/LoadingPage";
import { errorhandler } from "../../../api/Utils/errorhandler";
import { LiaExternalLinkAltSolid } from "react-icons/lia";

function AdminComments() {
  const navigate = useNavigate();
  const [comment, setcomment] = useState([]);

  useEffect(() => {
    const getComment = async () => {
      const res = await fetch(`${process.env.BACKEND}/api/comment/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.success === false) {
        return;
      }
      setcomment(data);
    };
    getComment();
  }, []);

  const handledelete = async (id) => {
    try {
      const res = await fetch(
        `${process.env.BACKEND}/api/comment/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data.success === false) {
        return;
      }
      setcomment(comment.filter((item) => item._id !== id));

      if (comment.length === 1) {
        navigate("/admin/profile");
      }
    } catch (error) {
      errorhandler(404, "Something Went Wrong");
      return;
    }
  };

  return (
    <div className="w-full h-screen bg-black text-white ">
      <div className="w-full h-screen bg-black ">
        <Navigation />

        {comment.length > 0 ? (
          <div className="w-full ">
            <h1 className="text-3xl mt-5 px-5 mukta-light">Comments Section</h1>
            <p className="mukta-extralight font-thin sm:w-[70%] md:w-[60%] w-[90%] px-5 text-sm opacity-[0.5]">
              On the Admin Comment Page, you can view all comments made by
              different users regarding various subjects. You have the ability
              to reply to these comments via email and delete any comments if
              necessary.
            </p>
            <div className="flex sm:flex-row md:flex-row gap-2 pb-5 flex-wrap bg-black ">
              {comment.map((item, index) => (
                <div
                  key={index}
                  className="ml-10 sm:ml-4 md:ml-4 rounded-lg mt-8 opacity-[0.8] hover:opacity-[1] relative border-[1px] hover:scale-105 hover:transition-tranform hover:duration-300 sm:w-[50%] md:w-[30vw] w-[70vw] h-[45vh] sm:h-[45vh]   text-white mukta-extralight break-words"
                >
                  <h1 className="px-3 pt-2">
                    {item.degree.toUpperCase()} / {item.branch.toUpperCase()}
                  </h1>
                  <div className="flex gap-2 items-center">
                    <div>
                      <h3 className="px-3 font-extrabold">
                        {item.subject.toUpperCase()} /{" "}
                        {item.section.toUpperCase()}
                      </h3>
                    </div>
                    <div className="mx-2 hover:opacity-[0.5]">
                      <Link
                        className=""
                        to={`/update/${item.degree}/${item.branch}/${item.subject}/${item.section}/${item.id}`}
                      >
                        <LiaExternalLinkAltSolid size={24} />
                      </Link>
                    </div>
                  </div>

                  <div className="">
                    <div className="p-3 font-normal text-wrap break-words">
                      {item.comment}
                    </div>
                  </div>
                  <h2 className="px-4 text-right mukta-extralight font-thin">
                    {item.names}
                  </h2>

                  <div className="flex absolute bottom-2 left-7 items-center justify-center gap-4 mt-4">
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${item.email}&su=Your Subject Here&body=Your Message Here`}
                      target="_blank"
                      className="bg-black border-2 border-gray-400 rounded px-3 py-3 text-white text-sm font-normal flex items-center justify-center gap-3 group"
                    >
                      Reply
                      <div>
                        <MdArrowOutward
                          className="transition-transform duration-300 ease-in-out group-hover:animate-rotate"
                          size={14}
                        />
                      </div>
                    </a>
                    <button
                      type="button"
                      onClick={() => handledelete(item._id)}
                      className="bg-black border-2 border-gray-400 rounded px-3 py-3 text-white text-sm font-normal flex items-center justify-center gap-3 group"
                    >
                      Delete
                      <div>
                        <MdArrowOutward
                          className="transition-transform duration-300 ease-in-out group-hover:animate-rotate"
                          size={14}
                        />
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            <div className="w-full    md:h-[50vh] bg-black"> </div>
            </div> 

          </div>
        ) : (
          <div className="mt-10  text-4xl mukta-light text-center">
            No Comments Yet !!!!
          </div>
        )}
      </div> 

    </div>
  );
}

export default AdminComments;

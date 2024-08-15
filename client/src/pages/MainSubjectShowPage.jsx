
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { subjectfetcherror } from "../Redux/Slices/subjectSlice";
import LoadingPage from "../components/LoadingPage";
import Navigation from "../components/Navigation";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { BsSearch } from "react-icons/bs";

function MainSubjectShowPage() {
  const [subjects, setSubjects] = useState([]);
  const [displayedSubjects, setDisplayedSubjects] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [startIndex, setStartIndex] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [noSubjectsFound, setNoSubjectsFound] = useState(false);
  const dispatch = useDispatch();
  const { degree, branch } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/get/${degree}/${branch}/subjects`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          const data = await res.json();
          dispatch(subjectfetcherror(data.message));
          return;
        }

        const data = await res.json();

        const seenSubjects = {};
        const uniqueSubjectsArray = data.filter((item) => {
          const subjectKey = item.subject.toLowerCase();
          if (!seenSubjects[subjectKey]) {
            seenSubjects[subjectKey] = true;
            return true;
          }
          return false;
        });

        setSubjects(uniqueSubjectsArray);
        setDisplayedSubjects(uniqueSubjectsArray.slice(0, 10));
        setShowMore(uniqueSubjectsArray.length > 10);
        setNoSubjectsFound(uniqueSubjectsArray.length === 0);
      } catch (error) {
        dispatch(subjectfetcherror(error));
      }
    };

    fetchSubjects();
  }, [degree, branch, dispatch]);

  useEffect(() => {
    const handleSearch = () => {
      if (!searchQuery) {
        setDisplayedSubjects(subjects.slice(0, 10));
        setShowMore(subjects.length > 10);
        setNoSubjectsFound(subjects.length === 0);
        return;
      }

      const filteredSubjects = subjects.filter((subject) =>
        subject.subject.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setDisplayedSubjects(filteredSubjects.slice(0, 10));
      setShowMore(filteredSubjects.length > 10);
      setNoSubjectsFound(filteredSubjects.length === 0);
    };

    handleSearch();
  }, [searchQuery, subjects]);

  const handleClick = () => {
    navigate(-1);
  };

  const handleShowMore = () => {
    const newDisplayedSubjects = subjects.slice(0, startIndex + 10);
    setDisplayedSubjects(newDisplayedSubjects);
    setStartIndex(startIndex + 10);
    setShowMore(newDisplayedSubjects.length < subjects.length);
  };

  return (
    <div className="bg-black w-full h-screen text-white">
      {subjects.length > 0 ? (
        <div className="bg-black-full h-screen text-white">
          <Navigation />
          <div className="pt-2 sm:px-10 px-2 bg-black">
            <div className="flex items-center">
              <div className="w-full p-2">
                <div className="flex w-[100%] items-center justify-between sm:justify-between">
                  <h1 className="text-white sm:pt-10 pt-8 text-4xl mukta-light ml-5">
                    {degree.toUpperCase()}-{branch.toUpperCase()}
                  </h1>
                  <button
                    className="mukta-light font-thin mt-6 mr-4 sm:mr-20"
                    onClick={handleClick}
                  >
                    <IoMdArrowRoundBack className="font-thin" size={24} />
                  </button>
                </div>
                <p className="text-white w-[90%] sm:w-[70%] mt-1 mukta-extralight font-thin opacity-[0.6] ml-5">
                  Browse subjects to access notes, question papers, lectures, and more. Our platform keeps your study materials organized and up-to-date.
                </p>
              </div>
            </div>
            <div className="flex gap-5 opacity-[0.6] justify-center mt-2">
              <input
                type="text"
                id="searchInput"
                placeholder="Search subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[70%] sm:w-[40%] h-12 p-2 mb-4 bg-black border-[1px] focus:outline-none mukta-light font-thin rounded-lg"
              />
              <button id="search" onClick={() => setSearchQuery(searchQuery)} className="mb-4">
                <BsSearch size={22} />
              </button>
            </div>
            <div className="w-full mt-10 flex flex-col justify-center items-center bg-black text-white gap-2">
              <div className="w-[90%] sm:w-[60%] h-full flex flex-col items-center justify-center">
                {noSubjectsFound && searchQuery ? (
                  <p className="text-white text-lg mukta-light opacity-[0.5] font-semibold mt-10">
                    No subjects found.
                  </p>
                ) : (
                  <>
                    {displayedSubjects.map((item, index) => (
                      <Link
                        to={`${item.subject.toLowerCase()}/data`}
                        key={index}
                        className="w-[90%] h-20 bg-black border-[2px] hover:opacity-[0.4] hover:transition-transform hover:duration-300 border-gray-400 text-white mt-3 rounded-lg"
                      >
                        <div className="flex gap-3 flex-row px-2 items-center">
                          <p className="mt-5 w-[50%] opacity-[0.8] mukta-light font-normal px-3 rounded">
                            {item.subject.toUpperCase()}
                          </p>
                        </div>
                      </Link>
                    ))}
                    {showMore && (
                      <div>
                        <button
                          className="w-[20%] h-12 text-xs text-white mt-5"
                          onClick={handleShowMore}
                        >
                          <FaAngleDown size={24} />
                        </button>
                      </div>
                    )}
                  </>
                )}
                <div className="h-4 mukta-light"></div>
              </div>
            </div>
          <div className="w-full h-[60vh]  bg-black"> </div>
          </div> 

        </div>
      ) : (
        <LoadingPage />
      )}
    </div>
  );
}

export default MainSubjectShowPage;


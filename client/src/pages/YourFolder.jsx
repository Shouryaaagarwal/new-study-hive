  

import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoLinkSharp } from "react-icons/io5";
import { FaRegFilePdf } from "react-icons/fa";
import Navigation from "../components/Navigation";

function YourFolder() {
  const { stardata } = useSelector((state) => state.star);

  return (
    <div className="w-full h-screen bg-black text-white">
      <Navigation />  

      <div className="mt-10 text-center text-3xl bg-black">
        <h1 className="mukta-semibold">Your Folder</h1>  
        {stardata.length===0? <div className="flex items-center justify-center mt-20  opacity-[0.5]">Opps !!! No Data</div>:""}
        {stardata.map((item, index) => {
          if (item.starsubjectnotes) {
            return (
              <div className="flex items-center justify-center" key={index}>
                <div className="bg-white bg-opacity-[0.1] w-[90%] sm:w-[50%] p-1 mr-2 pt-[5px] mb-4 sm:ml-14 ml-4 rounded-xl mt-3">
                  <div className="section-content ml-1 flex flex-col gap-2 pb-1 w-[99%] rounded-lg">
                    {item.subjectnotesUrls.length > 0 && (
                      <div className="flex gap-2 py-2 bg-black rounded-lg">
                        <div className="flex mukta-light font-thin p-2 leading-5 sm:w-[100%] text-[10px] px-2 sm:text-sm w-[42%] h-16 ml-2 bg-black text-white border-[1px] border-opacity-[0.3] border-white rounded-lg text-left ">
                        {item.pdfdescription || "No Data Available"}
                        </div>
                        <div className="sm:ml-6 ml-1 gap-3 bg-black flex sm:gap-5 md:gap-10 text-white w-[40%] p-4 py-3 rounded-lg">
                          <div className="flex sm:ml-10 ml-4 flex-col gap-4">
                            {item.subjectnotesUrls.map((url, urlindex) => (
                              <Link
                                key={urlindex}
                                to={url || "#"}
                                target="_blank"
                                className="bg-black text-white text-xs rounded-lg flex items-center"
                              >
                                <FaRegFilePdf className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] hover:opacity-[0.5] hover:transition-transform hover:duration-300 hover:scale-105" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}

        
        {stardata.map((item, index) => {
          if (item.starquestionotes) {
            return (
              <div className="flex items-center justify-center" key={index}>
                <div className="bg-white bg-opacity-[0.1] w-[90%] sm:w-[50%] p-1 mr-2 pt-[5px] mb-4 sm:ml-14 ml-4 rounded-xl mt-3">
                  <div className="section-content ml-1 flex flex-col gap-2 pb-1 w-[99%] rounded-lg">
                    {item.questionpaperUrls.length > 0 && (
                      <div className="flex gap-2 py-2 bg-black rounded-lg">
                        <div className="flex mukta-light font-thin p-2 leading-5 sm:w-[100%] text-[10px] px-2 sm:text-sm w-[42%] h-16 ml-2 bg-black text-white border-[1px] border-opacity-[0.3] border-white rounded-lg text-left ">
                        {item.questionpaperdec || "No Data Available"}
                        </div>
                        <div className="sm:ml-6 ml-1 gap-3 bg-black flex sm:gap-5 md:gap-10 text-white w-[40%] p-4 py-3 rounded-lg">
                          <div className="flex sm:ml-10 ml-4 flex-col gap-4">
                            {item.questionpaperUrls.map((url, urlindex) => (
                              <Link
                                key={urlindex}
                                to={url || "#"}
                                target="_blank"
                                className="bg-black text-white text-xs rounded-lg flex items-center"
                              >
                                <FaRegFilePdf className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] hover:opacity-[0.5] hover:transition-transform hover:duration-300 hover:scale-105" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}


        {stardata.map((item, index) => {
          if (item.starlecandpdflink) {
            return (
              <div className="flex items-center justify-center" key={index}>
                <div className="bg-white bg-opacity-[0.1] w-[90%] sm:w-[50%] p-1 mr-2 pt-[5px] mb-4 sm:ml-14 ml-4 rounded-xl mt-3">
                  <div className="section-content ml-1 flex flex-col gap-2 pb-1 w-[99%] rounded-lg">
                    {item.links.length > 0 && (
                      <div className="flex gap-2 py-2 bg-black rounded-lg">
                        
                        <div className="flex mukta-light font-thin p-2 leading-5 sm:w-[100%] text-[10px] px-2 sm:text-sm w-[42%] h-16 ml-2 bg-black text-white border-[1px] border-opacity-[0.3] border-white rounded-lg text-left ">
                        {item.linkdescription || "No Data Available"}
                        </div>  
                        
                    

                        <div className="sm:ml-6 ml-1 gap-3 bg-black flex sm:gap-5 md:gap-10 text-white w-[40%] p-4 py-3 rounded-lg">
                          <div className="flex sm:ml-10 ml-4 flex-col gap-4">
                            {item.links.map((url, urlindex) => (
                              <Link
                                key={urlindex}
                                to={url || "#"}
                                target="_blank"
                                className="bg-black text-white text-xs rounded-lg flex items-center"
                              >
                                <IoLinkSharp className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] hover:opacity-[0.5] hover:transition-transform hover:duration-300 hover:scale-105" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}

        {stardata.map((item, index) => {
          if (item.stardoclink) {
            return (
              <div className="flex items-center justify-center" key={index}>
                <div className="bg-white bg-opacity-[0.1] w-[90%] sm:w-[50%] p-1 mr-2 pt-[5px] mb-4 sm:ml-14 ml-4 rounded-xl mt-3">
                  <div className="section-content ml-1 flex flex-col gap-2 pb-1 w-[99%] rounded-lg">
                    {item.documentationlink.length > 0 && (
                      <div className="flex gap-2 py-2 bg-black rounded-lg">
                        <div className="flex mukta-light font-thin p-2 leading-5 sm:w-[100%] text-[10px] px-2 sm:text-sm w-[42%] h-16 ml-2 bg-black text-white border-[1px] border-opacity-[0.3] border-white rounded-lg text-left ">
                        {item.documentationlinkdesc || "No Data Available"}
                        </div>
                        <div className="sm:ml-6 ml-1 gap-3 bg-black flex sm:gap-5 md:gap-10 text-white w-[40%] p-4 py-3 rounded-lg">
                          <div className="flex sm:ml-10 ml-4 flex-col gap-4">
                            {item.documentationlink.map((url, urlindex) => (
                              <Link
                                key={urlindex}
                                to={url || "#"}
                                target="_blank"
                                className="bg-black text-white text-xs rounded-lg flex items-center"
                              >
                                <IoLinkSharp className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] hover:opacity-[0.5] hover:transition-transform hover:duration-300 hover:scale-105" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}
      <div className="w-full md:h-[80vh] h-[80vh]  bg-black"> </div>
      </div> 

    </div>
  );
}

export default YourFolder;


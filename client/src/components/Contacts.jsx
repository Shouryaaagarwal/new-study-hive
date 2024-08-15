import React from "react";
import { FaInstagram, FaUniversity, FaLinkedinIn } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { Link } from "react-router-dom";

function Contact() {
  return (
    <>
      <div className="flex flex-col mt-4 h-40 bg-black">
        <div className="w-full text-white flex items-center justify-center mt-10 gap-10">
          <Link
            to={`https://www.instagram.com/shouryaaagarwal/`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform duration-300 flex gap-4"
          >
            <FaInstagram size={24} />
          </Link>
          <Link
            to={`https://www.linkedin.com/in/shourya-agarwal-203560256/`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform duration-300"
          >
            <FaLinkedinIn size={24} />
          </Link>
          <Link
            to="https://mail.google.com/mail/?view=cm&fs=1&to=shouryaaagarwal@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform duration-300"
          >
            <BiLogoGmail size={24} />
          </Link>
          <Link
            to={`https://uiet.puchd.ac.in/`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform duration-300"
          >
            <FaUniversity size={24} />
          </Link>
        </div>

        <div className="text-white text-center mt-10">
          <h5 className="text-xs font-normal">
            &copy; 2024 StudyHive. All rights reserved.
          </h5>
        </div>
      </div>
    </>
  );
}

export default Contact;


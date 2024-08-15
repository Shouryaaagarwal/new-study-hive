
import React from "react";
import Navigation from "../components/Navigation";
import Contacts from "../components/Contacts";
import { MdArrowOutward } from "react-icons/md";

function Contact() {
  return (
    <div className="w-full h-screen bg-black relative">
      <Navigation />
      <div className="details p-10 text-white">
        <h1 className="text-[40px] mukta-light opacity-[0.8] mt-10 md:text-[50px]">
          Contact-Us
        </h1>
        <p className="w-[100%] sm:w-[70%] md:text-lg text-sm  mukta-extralight md:w-[60%] text-zinc-300">
          If you have any questions or need assistance with anything related to
          your semester, such as adding material or accessing resources, please
          feel free to reach out to us. For any other issues related to the
          website, you can contact our developer via email. Additionally, we
          encourage you to follow our social media handles listed below to stay
          updated with the latest information and announcements. Your feedback
          and inquiries are important to us, and we are here to help!
        </p>
      </div>

      <div className="px-8 flex flex-col  items-center gap-10 md:flex-row sm:flex-row sm:gap-10 mukta-light">
        <div className="hover:scale-110 transition-transform duration-500 hover:rounded overflow-hidden">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=shouryaaagarwal@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black hover:rounded-md hover:transition-transform hover:duration-300 hover:overflow-hidden px-6 py-5 border-[1px] text-white text-sm font-normal flex items-center justify-center gap-3 group"
          >
            Contact Admin
            <MdArrowOutward
              className="transition-transform duration-300 ease-in-out group-hover:animate-rotate"
              size={14}
            />
          </a>
        </div>
        <div className="hover:scale-110 hover:overflow-hidden transition-transform duration-500 hover:rounded overflow-hidden">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=shouryaaagarwal@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black hover:rounded-md hover:transition-transform hover:duration-300 hover:overflow-hidden px-6 py-5 border-[1px] text-white text-sm font-normal flex items-center justify-center gap-3 group"
          >
            Contact Developer
            <MdArrowOutward
              className="transition-transform duration-300 ease-in-out group-hover:animate-rotate"
              size={14}
            />
          </a>
        </div>
      </div>

      <div className="absolute bottom-1 w-full h-10 mukta-light">
        <div className="flex items-center justify-center mt-0 pt-0">
          <hr className="w-[80%] sm:w-[80%] md:w-[60%] h-[0.6px] px-10 rounded-full opacity-[0.5] bg-white" />
        </div>
        <Contacts />
      </div>
    </div>
  );
}

export default Contact;


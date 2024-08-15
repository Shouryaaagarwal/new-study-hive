import React from 'react'
import Navigation from '../components/Navigation'
import Contact from '../components/Contacts'
import { MdArrowOutward } from 'react-icons/md'
import { Link } from 'react-router-dom'

function ChooseBranch() {
  return (
    <div className='w-full h-screen bg-black text-white'> 
        <Navigation/> 
        <div className='w-full h-[60%]'> 
            <h1 className='mukta-bold text-center sm:mt-5 pt-10 text-3xl sm:text-4xl'>Bachelor's/Master's</h1> 
            <div className='flex flex-col w-full  items-center gap-10 sm:mt-10 mt-20  '> 
            <Link
                to="/select/b.e"
              className="bg-black px-6 py-5  sm:mt-10 border-[1px] hover:transition-transform hover:duration-300 hover:scale-105 hover:rounded-md text-white text-sm font-normal flex items-center justify-center gap-3 group"
            >
              Bachelor's of Engineering 
              <MdArrowOutward
                className="transition-transform duration-300 ease-in-out group-hover:animate-rotate "
                size={14}
              />
            </Link> 
            <Link
              to="/select/m.e"
              className="bg-black px-6 py-5 border-[1px] hover:transition-transform hover:duration-300 hover:scale-105 hover:rounded-md text-white text-sm font-normal flex items-center justify-center gap-3 group"
            >
              Master's of Engineering 
              <MdArrowOutward
                className="transition-transform duration-300 ease-in-out group-hover:animate-rotate "
                size={14}
              />
            </Link>
            </div>
        </div>    
       
        <Contact/> 
        <div className="w-full md:h-[22vh] h-[22vh]  bg-black"> </div>

    </div>
  )
}

export default ChooseBranch

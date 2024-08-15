
import React from 'react'
import { MdArrowOutward } from 'react-icons/md'
import { Link } from 'react-router-dom'

function Buttons({ value }) {
  return (
    <div className='flex gap-5'>
      <Link to="" className="bg-black px-6 py-5 text-white text-sm font-normal flex items-center justify-center gap-3 group">
        {value}
        <div>
          <MdArrowOutward className='transition-transform duration-300 ease-in-out group-hover:animate-rotate ' size={14} />
        </div>
      </Link>
    </div>
  )
}

export default Buttons


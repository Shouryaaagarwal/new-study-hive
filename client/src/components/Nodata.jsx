import React from 'react'
 import nodata from  "../assets/nodata.gif"
function Nodata() {
  return (
    <div className='w-full h-screen bg-black'>  

    <div className='w-full h-full flex items-center justify-center bg-black'>
      <img  className="w-[100%] h-screen "  src={nodata} alt="Loading..." />
    </div>
  </div>
  )
}

export default Nodata

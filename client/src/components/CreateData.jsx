import React from 'react'
import { useParams } from 'react-router'

function CreateData() { 
   const {name} = useParams()
  return (
    <div className='w-full h-screen'>
      {name}
    </div>
  )
}

export default CreateData 

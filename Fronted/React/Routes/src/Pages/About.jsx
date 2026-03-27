import React from 'react'
import { useParams } from 'react-router-dom'

const About = () => {
  const params = useParams()
  console.log(params)
  return (
    <div  className='h-50 w-full text-white semibold text-5xl flex items-center justify-center mb-10 underline'> 
      About
    </div>
  )
}

export default About

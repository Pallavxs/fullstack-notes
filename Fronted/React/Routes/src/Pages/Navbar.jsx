import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-between px-8 py-4 bg-pink-800 mb-10 '>
      <h2>Navbar</h2>
      <div className='flex gap-8'>
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
        <Link to='/product'>Product</Link>
      </div>
    </div>
  )
}

export default Navbar

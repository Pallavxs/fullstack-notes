import React, { useContext } from 'react'
import { UserContextData } from './userContext'

const Navbar = () => {

    const data = useContext(UserContextData)
    console.log(data)
  return (
    <div className='h-70 w-full bg-red-500'>
      <h1 className='text-2xl font-semibold text-white p-5'>
        UserName --
        {data.map((user,idx)=>{
            return (
                <h1 key={idx}>
                {user.name.firstname} {user.name.lastname}
                </h1>
            )
        })}
      </h1>
    </div>
  )
}

export default Navbar

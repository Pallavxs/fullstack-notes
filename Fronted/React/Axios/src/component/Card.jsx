import React from 'react'

const Card = ({data}) => {

    let c1 = Math.floor(Math.random()*256);
    let c2 = Math.floor(Math.random()*256);
    let c3 = Math.floor(Math.random()*256);
  return (
    <div className='h-70 w-50 text-white p-3 rounded' style={{backgroundColor: `rgb(${c1},${c2},${c3})`}}>
        <h1>{data.name.firstname} {data.name.lastname}</h1>
        <h1>{data.username}</h1>
        <h1>{data.email}</h1>
    </div>
  )
}

export default Card

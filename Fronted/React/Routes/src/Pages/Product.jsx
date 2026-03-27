import React from 'react'
import {Link} from 'react-router-dom'

const Product = () => {
  return (
    <div className='h-50 w-full text-white semibold text-5xl underline'>
      Product
      <br /><br />
      <div>
        <Link className='mx-5 my-5 flex gap-6' to='/product/men'>Men's Collection</Link>
        <Link className='mx-5 my-5 ' to='/product/women'>Women's Collection</Link>
      </div>
    </div>

  )
}

export default Product

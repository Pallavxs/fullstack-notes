import React from 'react'
import { UserProductContextData } from '../Context/ProductContext'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'

const Product = () => {
    const productData = useContext(UserProductContextData)

    const {productId } = useParams()
    console.log(productData.id == productId )

    const SelectedProduct = productData.find((elems) => elems.id == productId  )

  if(!SelectedProduct){
    return <h1 className='text-white font-semibold'>Loading...</h1>
  }



  return (
    <div className='h-100 w-100 p-3.5 '>
       <img className='h-40 w-full object-contain bg-white p-4' src={SelectedProduct.image} alt="" />
        <h1 className='text-sm font-semibold text-white line-clamp-2'>{SelectedProduct.title}</h1>
    </div>
  )
}

export default Product
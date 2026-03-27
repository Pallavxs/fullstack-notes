import { useContext } from 'react'
import {UserProductContextData} from '../Context/ProductContext'
import { Link } from 'react-router-dom'

const Products = () => {
  const productData = useContext(UserProductContextData)
  
  return (
    <div className='min-h-screen bg-gray-900 p-6'>
      <div className='flex flex-wrap gap-6 justify-center'>
        {productData.map((data,idx)=> {
        return <div className='bg-gray-800 w-[220px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 '  key={idx}>
         <Link to={`/products/${data.id}`} className='block' >
          <img className='h-40 w-full object-contain bg-white p-4' src={data.image} alt="" />
           <h1 className='text-sm font-semibold text-white line-clamp-2'>{data.title}</h1>
         </Link>
        </div>
      })}
      </div>
    </div>
  )
}

export default Products
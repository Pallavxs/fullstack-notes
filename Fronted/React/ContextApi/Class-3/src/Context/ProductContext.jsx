import { createContext, useEffect, useState } from 'react'
import FetchProductData from '../backend/server'

export const UserProductContextData = createContext()

const ProductContext = ({children}) => {

    const [ProductData, setProductData] = useState([])

    const getData = async () => {
        const setData =await FetchProductData()
        setProductData(setData)
    }
    
    useEffect(()=>{
        getData()
    },[])

    
  return (
    <UserProductContextData.Provider value={ProductData}>
        {children}
    </UserProductContextData.Provider>
  )
}

export default ProductContext
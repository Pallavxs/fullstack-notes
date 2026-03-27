import axios from 'axios'

let FetchProductData = async () => {
    const response = await axios.get('https://fakestoreapi.com/products')
    console.log(response.data)
    return response.data
    
}

export default FetchProductData


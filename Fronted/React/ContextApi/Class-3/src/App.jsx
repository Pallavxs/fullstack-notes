import { Route, Routes} from 'react-router-dom'
import Home from './Pages/Home'
import Products from './Pages/Products'
import ProductDetails from './Pages/ProductDetails'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/products/:productId' element={<ProductDetails/>}/>

    </Routes>
  )
}

export default App
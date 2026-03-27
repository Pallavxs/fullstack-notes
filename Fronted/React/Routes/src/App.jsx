import {BrowserRouter, Route,Routes} from 'react-router-dom'
import Home from './Pages/Home'
import Courses from './Pages/Courses'
import Product from './Pages/Product'
import Navbar from './Pages/Navbar'
import About from './Pages/About'
import Men from './Pages/Men'
import Women from './Pages/Women'
import NotFound from './Pages/NotFound'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/courses' element={<Courses />}/>
        <Route path='/product' element={<Product />} />

        {/* Nested Routes */}
        <Route path='/product/men' element={<Men />}/>
        <Route path='/product/women' element={<Women />}/>

        {/* Dynamic Route */}
        <Route path='/about/:id' element={<About/>}/>

        {/* Not Found */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
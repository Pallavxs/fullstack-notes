import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center'>
  <h1 className='font-semibold text-5xl text-white'>
    This is Home
  </h1>

  <button 
    onClick={() => navigate('/products')}
    className='mt-4 cursor-pointer text-lg font-semibold bg-blue-400 hover:bg-blue-500 transition-all rounded p-3 text-white'
  >
    Product List
  </button>
</div>
  )
}

export default Home
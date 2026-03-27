import axios from 'axios'
import { useEffect, useState } from 'react'
import Card from './component/Card'

const App = () => {
  const [user, setUser] = useState([])
  const getData = async() => {
    const response = await axios('https://fakestoreapi.com/users') 

    setUser(response.data)
  }

  useEffect(function(){
    getData()
  },[])

  return (
    <div>
      {/* <button className='bg-blue-400 rounded border-2-red p-2 text-white my-2 mx-4' onClick={getData}>Get data</button> */}
      <div className='flex flex-wrap gap-3 my-2 mx-4'>
        {user.map((data,idx)=>(
        <div key={idx}>
          <Card data={data}/>
        </div>
      ))}
      </div>

    </div>
  )
}

export default App

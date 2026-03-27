import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [decount, setDecount] = useState(0)
  const [input, setInput] = useState("Female")

  function Increase(){
    setCount(count+1)
  }

  function Male(){
    return <>
      <button className='h-10 px-4 w-fit rounded-2xl bg-blue-500 text-white'>Male Washroom</button>
    </>
  }

  function Female(){
    return <>
      <button className='h-10 px-4 w-fit rounded-2xl bg-pink-500 text-white'>Female Washroom</button>
    </>
  }

  return (
    <div className='flex flex-col'>
      <h1 className='mx-4.5'>{count}</h1>
      <h1 className='mx-3'>{decount}</h1>
      <button className='p-1 mx-1 my-1 border rounded-2xl bg-red-400 w-fit' onClick={Increase}>Increment</button>
      <button className='p-1 mx-1 my-1 border rounded-2xl bg-emerald-500 w-fit' onClick={()=>{
        setDecount(decount-1)
      }}>Decrement</button>

      <button className='p-1 mx-1 my-1 border rounded-2xl bg-gray-500 w-fit' onClick={"Male" == input ? "Male" : "femal"}>useState & conditional rendering</button>
      {input == "Male" ? <Male /> : <Female />}
    </div>
  )
}

export default App

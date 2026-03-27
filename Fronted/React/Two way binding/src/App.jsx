import { useState } from "react"

const App = () => {

  const [username, setuserName] = useState("")
  const [alluser, setallUser] = useState([""])

  function subitHandler(e){
    e.preventDefault()
    const oldUser = [...alluser]
    oldUser.push(username)
    setallUser(oldUser)
    setuserName("")
  }

  return (
    <div>
      <form className="bg-gray-500 p-5 border " onSubmit={(e)=>{
        subitHandler(e)
      }}>
        <input className="gap-5 mx-3 p-2 bg-gray-400" type="text" placeholder='Enter your name' required value={username} onChange={(e)=>setuserName(e.target.value)} />
        <button className="bg-gray-700 p-2 mx-3" >Submit</button>
      </form>

        {alluser.map((name,id)=>{
          return (<div key={id}>
            <h1>{name}</h1>
          </div> )
        })}
    </div>
  )
}

export default App

import { useState } from "react"

const App = () => {

  const [name, setName] = useState('')
  const [username, setuserName] = useState('')
  const [email, setEmail] = useState('')
  const [contactnumber, setcontactNumber] = useState('')
  const [alldata, setallData] = useState([])


  function submitHandler(e){
    e.preventDefault()

    setallData([...alldata,{name,username,contactnumber,email}])    

    setName("")
    setuserName("")
    setEmail("")
    setcontactNumber("")

  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">

  <div className="w-[800px] h-[500px] bg-[#1e293b] rounded-2xl shadow-2xl flex overflow-hidden">

    {/* LEFT SIDE */}
    <form 
      onSubmit={submitHandler}
      className="w-1/2 p-8 flex flex-col justify-center text-white gap-4"
    >
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      <input
        className="p-2 rounded bg-[#334155] placeholder-gray-300 focus:outline-none"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      <input
        className="p-2 rounded bg-[#334155] placeholder-gray-300 focus:outline-none"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e)=>setuserName(e.target.value)}
      />

      <input
        className="p-2 rounded bg-[#334155] placeholder-gray-300 focus:outline-none"
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        className="p-2 rounded bg-[#334155] placeholder-gray-300 focus:outline-none"
        type="text"
        placeholder="Contact"
        value={contactnumber}
        onChange={(e)=>setcontactNumber(e.target.value)}
      />

      <button className="bg-orange-400 text-black py-2 rounded font-semibold hover:bg-orange-300 transition">
        Register
      </button>
    </form>

    {/* RIGHT SIDE */}
    <div className="w-1/2 bg-[#0f172a] text-white p-8 flex flex-col justify-center">
      
      <h2 className="text-xl font-semibold mb-4">Preview</h2>

      <div className="space-y-2 text-sm">
        <p><span className="font-semibold">Name:</span> {name || "—"}</p>
        <p><span className="font-semibold">Username:</span> {username || "—"}</p>
        <p><span className="font-semibold">Email:</span> {email || "—"}</p>
        <p><span className="font-semibold">Contact:</span> {contactnumber || "—"}</p>
      </div>

    </div>

  </div>

</div>
  )
}

export default App

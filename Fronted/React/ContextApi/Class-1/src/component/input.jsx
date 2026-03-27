import React, { useState } from 'react'

const input = (props) => {

    const [newtheme, setNewtheme] = useState('')

  return (
    <div>
      <form onSubmit={(e) =>{
        e.preventDefault()
        console.log(newtheme)
        props.changetheme(newtheme)
        setNewtheme('')
      }}
      >
        <input type="text" placeholder='change theme name ' onChange={(e)=>{setNewtheme(e.target.value)}} value={newtheme}/>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default input

import Input from './component/input'
import { useState } from 'react'

const App = () => {

  const [theme, setTheme] = useState('white')
  
  function changetheme(newtheme){
    setTheme(newtheme)
  }

  return (
    <div>
      <h1>Theme is {theme}</h1>
      <Input  changetheme={changetheme}/>
    </div>
  )
}

export default App

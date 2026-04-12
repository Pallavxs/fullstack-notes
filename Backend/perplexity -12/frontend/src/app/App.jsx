import { RouterProvider } from "react-router"
import { router } from './app.routes.jsx'
import { useAuth } from "../features/auth/hook/useAuth"
import { useEffect } from "react"

function App() {

  const auth = useAuth()

  useEffect(()=>{
    auth.handleGetME()
  },[])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

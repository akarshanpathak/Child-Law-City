import { useState } from 'react'  
import { useSelector } from 'react-redux'
import Register from './pages/Register'
import AppRouter from "./routes"

function App() {
  const {currentUser} = useSelector((state) => state.user) 

  return (
   <>
    <AppRouter/>
   </>
  )
}

export default App

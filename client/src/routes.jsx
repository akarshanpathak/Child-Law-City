import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'

function routes() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='/register' element = {<Register/>}/>
            <Route path='/login' element = {<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default routes

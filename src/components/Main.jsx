import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from '../pages/Home'
import Profile from '../pages/Profile'

const Main = (props) => {
  return (
    <main>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/profile/:id' element={<Profile />}/>
      </Routes>
    </main>
  )
}

export default Main
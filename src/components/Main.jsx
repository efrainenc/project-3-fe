import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Show from './pages/Show/Show'
import Profile from './pages/Profile/Profile'
import Home from './pages/Home/Home'
import Welcome from './pages/Welcome'
import UpdateProfile from './pages/UpdateProfile/UpdateProfile'


const Main=({signup, login, user, loggedIn, createProfile, createFollow})=>{
  return(
    <div>
      <Routes>
        <Route path="/" element={<Welcome signup={signup} createProfile={createProfile} user={user} login={login}/>}/>
        <Route path="/update/:id" element={<UpdateProfile user={user}/>}/>
        <Route path="/:id" element={<Profile loggedIn={loggedIn} user={user} createFollow={createFollow}/>}/>
        <Route path="/post/:id" element={<Show loggedIn={loggedIn} user={user}/>}/>
        <Route path='/home' element={<Home user={user}/>}/>
      </Routes>
    </div>
  )
}

export default Main
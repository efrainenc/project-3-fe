import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Show from './pages/Show'
import Profile from './pages/Profile'
import Home from './pages/Home'
import Welcome from './pages/Welcome'
import UpdateProfile from './pages/UpdateProfile'
import Login from './AuthForms/Login'
import SignUp from './AuthForms/SignUp'


const Main=({signup, login, user, loggedIn, createProfile, createFollow})=>{
  return(
    <div className='main'>
      <Routes>
        <Route path="/" element={<Welcome signup={signup} createProfile={createProfile} user={user} login={login}/>}/>
        <Route path="/update/:id" element={<UpdateProfile user={user}/>}/>
        <Route path="/:id" element={<Profile loggedIn={loggedIn} user={user} createFollow={createFollow}/>}/>
        <Route path="/post/:id" element={<Show loggedIn={loggedIn} user={user}/>}/>
        <Route path='/home' element={<Home user={user}/>}/>
        <Route path='/login' element={<Login user={user} login={login}/>}/>
        <Route path='/signup' element={<SignUp signup={signup} createProfile={createProfile}/>}/>
      </Routes>
    </div>
  )
}

export default Main
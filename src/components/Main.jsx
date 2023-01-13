import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Show from './pages/Show'
import Profile from './pages/Profile'
import Home from './pages/Home'
import EditProfile from './pages/EditProfile'
import Login from './AuthForms/Login'
import SignUp from './AuthForms/SignUp'
import Page_404 from './pages/Page_404'
import "../css/AuthForm.css"


const Main=({signup, login, user, loggedIn, createProfile, createFollow})=>{// TODO make landing page similar to ig
  return(<>
    <div className='main'>
      <Routes>
          <Route path="/" element={<Login user={user} login={login}/>}/>
          <Route path="/edit/:id" element={<EditProfile user={user}/>}/>
          <Route path="/:id" element={<Profile loggedIn={loggedIn} user={user} createFollow={createFollow}/>}/>
          <Route path="/post/:id" element={<Show loggedIn={loggedIn} user={user}/>}/>
          <Route path='/home' element={<Home user={user}/>}/>
          <Route path='/login' element={<Login user={user} login={login}/>}/>
          <Route path='/signup' element={<SignUp signup={signup} createProfile={createProfile}/>}/>
          <Route path='*' element={<Page_404 />}/>
      </Routes>
    </div>
  </>)
}

export default Main
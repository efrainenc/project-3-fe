import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Show from './pages/Show/Show'
import Profile from './pages/Profile/Profile'
import RegisterForm from './AuthForms/RegisterForm'
import LoginForm from './AuthForms/LoginForm'
import Home from './pages/Home/Home'
import Welcome from './pages/Welcome'
import UpdateProfile from './pages/UpdateProfile/UpdateProfile'


// passing signup, login, and user through app
const Main = ({signup, login, user, loggedIn}) => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/update/:id" element={<UpdateProfile user={user}/>}/>
        <Route path="/:id" element={<Profile loggedIn={loggedIn} user={user}/>}/>
        <Route path="/post/:id" element={<Show loggedIn={loggedIn} user={user}/>}/>
        <Route path='/home' element={<Home user={user}/>}/>
        <Route path="/register/" element={<RegisterForm signup={signup}/>}/>
        <Route path="/login/" element={<LoginForm user={user} login={login}/>}/>
      </Routes>
    </div>
  )
}

export default Main
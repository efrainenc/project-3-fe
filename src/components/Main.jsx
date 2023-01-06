import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Show from './pages/Show/Show'
import Profile from './pages/Profile/Profile'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import Home from './pages/Home'
import Welcome from './pages/Welcome'


// passing signup, login, and user through app
const Main = ({signup, login, user, loggedIn}) => {
  return (
    <div>
      <Routes>
        {/* Not Signed In */}
        <Route path="/user" element={<Welcome/>}/>
        {/* Other User Pages */}
        <Route path="/user/:id" element={<Profile loggedIn={loggedIn} user={user}/>}/>
        {/* post details Page */}
        <Route path="/post/:id" element={<Show user={user}/>}/>
        {/* Show All Posts Page */}
        <Route path='/home' element={<Home user={user}/>}/>
        {/* Register Page */}
        <Route path="/register/" element={<RegisterForm signup={signup}/>}/>
         {/* login Page */}
        <Route path="/login/" element={<LoginForm user={user} login={login}/>}/>
      </Routes>
    </div>
  )
}

export default Main
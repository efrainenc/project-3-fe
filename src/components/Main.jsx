import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Show from '../pages/Show/Show'
import Post from '../pages/Post/Post'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import Home from '../pages/Home'


// passing signup, login, and user through app
const Main = ({signup, login, user}) => {
  return (
    <div>
      <Routes>
        {/* User Page */}
        <Route path="/" element={<Post user={user}/>}/>
        {/* post details Page */}
        <Route path="/post/:id" element={<Show/>}/>
        {/* Show All Posts Page */}
        <Route path='/home' element={<Home/>}/>
        {/* Register Page */}
        <Route path="/register/" element={<RegisterForm signup={signup}/>}/>

         {/* login Page */}
        <Route path="/login/" element={<LoginForm login={login}/>}/>
      </Routes>
    </div>
  )
}

export default Main
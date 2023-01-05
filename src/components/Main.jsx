import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Show from '../pages/Show/Show'
import Post from '../pages/Post/Post'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'


// passing signup, login, and user through app
const Main = ({signup, login, user}) => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Post user={user}/>}/>
        <Route path="/post/:id" element={<Show/>}/>
        <Route path="/register/" element={<RegisterForm signup={signup}/>}/>
        <Route path="/login/" element={<LoginForm login={login}/>}/>
      </Routes>
    </div>
  )
}

export default Main
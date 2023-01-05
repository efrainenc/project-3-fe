import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from '../pages/Home'
import Profile from '../pages/Profile'
import Post from '../pages/Post/Post'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'

const Main = ({signup, login, user}) => {
  return (
    <main>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/post' element={<Post />} />
        <Route path='/user/:id' element={<Profile />}/>
        <Route path="/register/" element={<RegisterForm signup={signup}/>}/>
        <Route path="/login/" element={<LoginForm login={login}/>}/>
      </Routes>
    </main>
  )
}

export default Main
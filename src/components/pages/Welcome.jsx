import { React, useState} from 'react'
import { Link } from 'react-router-dom'
import "../../css/Welcome.css"
import Login from '../AuthForms/Login'

const Welcome=({signup, createProfile, user, login})=>{
  
  return( // TODO make landing page similar to ig
    <section>
      <Login user={user} login={login}/>
    </section>
  )
}

export default Welcome
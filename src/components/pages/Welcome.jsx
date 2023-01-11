import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/Welcome.css'

const Welcome = () => {
  return (
    <div className="welcomeDiv">
      <Link to='/login'>
          <h1>Login</h1>
      </Link>
      <Link to='/register'>
        <h1>Register</h1>
      </Link>
    </div>
  )
}

export default Welcome
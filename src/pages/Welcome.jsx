import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <div>Welcome
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
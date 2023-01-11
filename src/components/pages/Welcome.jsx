import React from 'react'
import { Link } from 'react-router-dom'
import "../../css/Welcome.css"

const Welcome = () => {
  return (
    <section>
      <div className='welcomeContainer'>
        <div>
          <h1>WELCOME</h1>
        </div>
        <Link to='/login'>
            <h1>Login</h1>
        </Link>
        <Link to='/register'>
          <h1>Register</h1>
        </Link>
      </div>
    </section>
  )
}

export default Welcome
import React from 'react'
import {Link} from 'react-router-dom'

const Header = (props) => {
  return (
    <header className="Header" style={{height: "400px", overflow: 'hidden'}}>
      <nav className='nav'>
        <Link to='/'>
          <h1>Home</h1>
        </Link>
        <div>Instagram Refactor</div>
      </nav>
    </header>
  )
}

export default Header
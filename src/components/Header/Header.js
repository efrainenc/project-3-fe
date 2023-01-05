import React from 'react'
import {Link} from 'react-router-dom'

const Header = (props) => {


    // a function to clear local storage
    const clearLocalStorage = () => {
      localStorage.clear();
      }

      
  return (
    <header className="Header" style={{height: "200px", overflow: 'hidden'}}>
      <nav className='nav'>
        <Link to='/'>
          <h1>Home</h1>
        </Link>
        <Link to='/login/' > login </Link>
        <Link to='/register/' > register </Link>
        <Link onClick={clearLocalStorage} to='/login/' > signout </Link>
        <div>Instagram Refactor</div>
      </nav>
    </header>
  )
}

export default Header
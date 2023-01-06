import React from 'react'
import {Link} from 'react-router-dom'

const Header = ({user, loggedIn, loginHandler}) => {

  // a function to clear local storage
  const clearLocalStorage = () =>{
    localStorage.clear();
    loginHandler();
  }

  const signedIn= ()=>{
    return(
      <Link onClick={clearLocalStorage} to='/login/' > signout </Link>
    )
  }

  
  //conditionally render 
  return(
    <>
      <header className="Header" style={{height: "200px", overflow: 'hidden'}}>
        <nav className='nav'>
          <Link to='/home'> Home </Link>
          <Link to='/'> Profile </Link>
          <>{loggedIn ? signedIn() : ""}</>
          <div>Instagram Refactor</div>
        </nav>
      </header>
    </>
  )
}

export default Header
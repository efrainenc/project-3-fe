import React from 'react'
import {Link} from 'react-router-dom'
import { useState } from 'react'
import "../scss/Header.css"

const Header=({user, loggedIn, signOut})=>{

  const [searchBarItem, setSearchBarItem]= useState('')
  const [isSearch, setIsSearch] = useState(false)

  // a function to clear local storage
  const clearLocalStorage=()=>{localStorage.clear();signOut();}

  const signedIn=()=>{ // TODO Link to update profile
    return(
      <div id="menuToggle">
        <input type="checkbox" />
        {/* a span for each layer of hamburbger */}
        <span></span>
        <span></span>
        <span></span>
        <ul id="menu">
          <Link to="/home"><li>Home</li></Link>
          <Link to={`/${user.username}`}><li>Profile</li></Link>
          {/* <Link to='/update/W_I_P' ><li>Settings</li></Link> */}
          <Link onClick={clearLocalStorage} to='/' ><li>Sign Out</li></Link>
        </ul>
      </div>
    )
  }

  // Function to change state and reset state to false after click search by ingredient.
  const userClick=()=>{
    setIsSearch(current=>!current)
    if(setIsSearch){
      setTimeout(function(){setIsSearch(current => !current)}, 1);
    }
  }

  // Event handler for setting the search bar input to an event and saving that event to state.
  const handleItemChange=(e)=>{const newSearchItem= e.target.value; setSearchBarItem(newSearchItem)}

  return(
    <header className="Header">
      <Link className='home' to='/home'>
        <h2 className='pageName'>FotoBook</h2>
      </Link>
      <div className='searchbarContainer'>
        <input type="text" id="myInput" value={searchBarItem} onChange={handleItemChange} placeholder='Search Users..'/>
        <Link to={`/${searchBarItem}`}> 
          <button onClick={userClick} className='searchUser' ><img width={20} src='https://imgur.com/ltktMwM.jpg' /></button>
        </Link>
      </div>
      <>{loggedIn ? signedIn() 
        : <div className='loggedOutOptions'>
            <div className='logIn'>
              <Link to={'/login'}>Log In </Link>
            </div>
            <div className='signUp'>
              <Link to={'/signup'}>Sign Up</Link>
            </div>
          </div>}
      </>
    </header>
  )
}

export default Header
import React from 'react'
import {Link} from 'react-router-dom'
import { useState } from 'react'

const Header = ({user, loggedIn, loginHandler}) => {

  const [searchBarItem, setSearchBarItem] = useState('')
  const [isSearch, setIsSearch] = useState(false)

  // a function to clear local storage
  const clearLocalStorage = () =>{
    localStorage.clear();
    loginHandler();
  }

  const signedIn= ()=>{
    return(
      <>
        <Link to={`/user/${user.username}`}> Profile </Link>
        <Link onClick={clearLocalStorage} to='/login/' > signout </Link>
      </>
    )
  }
  // Function to change state and reset state to false after click search by ingredient.
  const userClick = () => 
  {
    setIsSearch(current => !current)
    if(setIsSearch) 
    {
      setTimeout(function() 
      {
        setIsSearch(current => !current)
      }, 1);
    }
  }

// Event handler for setting the search bar input to an event and saving that event to state.
  const handleItemChange = (e) => 
  {
    const newSearchItem = e.target.value
    setSearchBarItem(newSearchItem)
  }

  
  //conditionally render 
  return(
    <>
      <header className="Header" style={{height: "200px", overflow: 'hidden'}}>
        <nav className='nav'>
          <Link to='/home'> Home </Link>
          <>{loggedIn ? signedIn() : <Link to={'/user'}> Profile </Link>}</>
          <div>Instagram Refactor</div>
          <input type="text" id="myInput" value={searchBarItem} onChange={handleItemChange} placeholder='Search..'/>
          <Link to={`/user/${searchBarItem}`}> 
            <button onClick={userClick} className='searchUser' > by username </button>
          </Link>
        </nav>
      </header>
    </>
  )
}

export default Header
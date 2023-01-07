import React from 'react'
import {Link} from 'react-router-dom'
import { useState } from 'react'
import "./Header.css"

const Header = ({user, loggedIn, signOut}) => {

  const [searchBarItem, setSearchBarItem] = useState('')
  const [isSearch, setIsSearch] = useState(false)

  // a function to clear local storage
  const clearLocalStorage = () =>{
    localStorage.clear();
    signOut();
  }

  const signedIn= ()=>{
    return(
      <>
        <Link to={`/${user.username}`}> <img width={50} src='https://cdn-icons-png.flaticon.com/512/6522/6522516.png' /> </Link>
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
      <header className="Header">
        <nav className='nav'>
          <Link to='/home'> <img width={50} src='https://cdn-icons-png.flaticon.com/512/60/60817.png' /> </Link>
          <div>Instaspace LMAO</div>
          <div>
            <input type="text" id="myInput" value={searchBarItem} onChange={handleItemChange} placeholder='Search..'/>
            <Link to={`/${searchBarItem}`}> 
              <button onClick={userClick} className='searchUser' > by username </button>
            </Link>
          </div>
          <div className='profileButton'>{loggedIn ? signedIn() : <Link to={'/'}> <img width={50} src='https://cdn-icons-png.flaticon.com/512/6522/6522516.png' /> </Link>}</div>
        </nav>
      </header>
    </>
  )
}

export default Header
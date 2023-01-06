import './App.css';
import Header from '../components/Header/Header'
import Main from '../components/Main'
import React from 'react'
import {useState} from 'react'
import {getUserToken, setUserToken, clearUserToken} from '../utils/authToken'


function App() {

  // import start for the current user object and for isAuthenticated
  const [currentUser, setCurrentUser] = useState({})
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // fetch new user JSON from register POST and return it as parsedUser
  const registerUser = async (data) => {
    try {
      const configs = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
      const newUser = await fetch(
        "http://localhost:4000/auth/register",
        configs
      )

      const parsedUser = await newUser.json()
      //console.log(parsedUser)

  // sets local storage
      setUserToken(parsedUser.token)
  // put the returned user object in state for CurrentUser
      setCurrentUser(parsedUser.user) // currentUser
  // adds a boolean cast of the responses isLoggedIn prop
      setIsAuthenticated(parsedUser.isLoggedIn)

      return parsedUser
    } catch (err) {
      console.log(err)
      clearUserToken();
      setIsAuthenticated(false);
    }
  }


  // fetch user JSON from login POST and return it as user
  const loginUser = async (data) => {
    try {
      const configs = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
      const response = await fetch(
        "http://localhost:4000/auth/login",
        configs
      )
      const user = await response.json()

  // sets local storage
      setUserToken(user.token)
  // put the returned user object in state for CurrentUser
      setCurrentUser(user.user)

      setIsAuthenticated(user.isLoggedIn)

      window.localStorage.setItem('name', user.user.username);

      return user
    } catch (err) {
      clearUserToken()
      setIsAuthenticated(false)
    }
  }
  const loginHandler = () => 
  {
    setIsAuthenticated(current => !current)
  }

  return (
    <div className="App">
      <Header loggedIn={isAuthenticated} loginHandler={loginHandler} user={currentUser}/>
      <Main loggedIn={isAuthenticated} signup={registerUser} login={loginUser} user={currentUser} />
    </div>
  )
}

export default App;


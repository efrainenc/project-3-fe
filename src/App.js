import './css/App.css'
import Header from './components/Header'
import Main from './components/Main'
import React from 'react'
import {useState} from 'react'
import {getUserToken, setUserToken, clearUserToken} from './utils/authToken'


function App(){
  // import start for the current user object and for isAuthenticated.
  const [currentUser, setCurrentUser] = useState({})
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // State for current Profile and follow.
  const [currentProfile, setCurrentProfile] = useState({})
  const [currentFollow, setCurrentFollow] = useState({})

  const registerProfile = async(data) =>{
    try {
      const configs = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Authorization': `bearer ${getUserToken()}`,
          "Content-Type": "application/json",
        },
      }
      const newProfile = await fetch("https://project-3-be.herokuapp.com/profile",configs)
      const createdProfile = await newProfile.json()
      // put the returned user object in state for CurrentUser
      setCurrentProfile(createdProfile)
      return createdProfile
    }catch(err){console.log(err)}
  }

  // fetch and create Follow for given user (Called in Profile)
  const registerFollows = async(data) =>{
    try{
      const configs = {
        method: "POST",
        body: JSON.stringify(data),
        headers:{
          'Authorization': `bearer ${getUserToken()}`,
          "Content-Type": "application/json",
        },
      }
      const newFollows = await fetch("https://project-3-be.herokuapp.com/follow",configs)
      const createdFollows = await newFollows.json()
      // put the returned user object in state for CurrentUser
      setCurrentFollow(createdFollows)
      return createdFollows
    }catch(err){console.log(err)}
  }

  // fetch new user JSON from register POST and return it as parsedUser
  const registerUser=async(data)=>{
    try{
      const configs={
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json",},
      }
      const newUser = await fetch("https://project-3-be.herokuapp.com/auth/register",configs)
      const parsedUser = await newUser.json()
      // sets local storage
      setUserToken(parsedUser.token)
      // put the returned user object in state for CurrentUser
      setCurrentUser(parsedUser.user)
      // adds a boolean cast of the responses isLoggedIn prop
      setIsAuthenticated(parsedUser.isLoggedIn)

      return parsedUser
    }catch(err){
      console.log(err);
      clearUserToken();
      setIsAuthenticated(false);
    }
  }

  // fetch user JSON from login POST and return it as user
  const loginUser=async(data)=>{
    try{
      const configs = {
        method: "POST",
        body: JSON.stringify(data),
        headers:{"Content-Type": "application/json",},
      }
      const response = await fetch("https://project-3-be.herokuapp.com/auth/login",configs);
      const user = await response.json();
      // sets local storage
      setUserToken(user.token);
      // put the returned user object in state for CurrentUser
      setCurrentUser(user.user);
      setIsAuthenticated(user.isLoggedIn);
      window.localStorage.setItem('name', user.user.username);
      return user
    }catch(err){
      clearUserToken();
      setIsAuthenticated(false);
    }
  }
  
  const signOutHandler=()=>{
    if(isAuthenticated){
      setIsAuthenticated(current => !current);
      setCurrentUser({});
    }
  }

  return (
    <div className="App">
      <Header loggedIn={isAuthenticated} signOut={signOutHandler} user={currentUser}/>
      <Main loggedIn={isAuthenticated} signup={registerUser} login={loginUser} user={currentUser} createProfile={registerProfile} createFollow={registerFollows}/>
    </div>
  )
}

export default App;


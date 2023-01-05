

// getUserToken function gets token from local storage and returns it 
const getUserToken = () => {
  return localStorage.getItem('token')
}


// setUserToken function sets token from local storage and stores it as token prop
const setUserToken = (token) => {
  return localStorage.setItem('token', token)
}

// clearUserToken function clears token from local storage and stores it as empty string
const clearUserToken = () => {
return localStorage.setItem('token', "")
}

//exports functions
export {getUserToken, setUserToken, clearUserToken}


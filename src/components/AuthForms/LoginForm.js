import React from 'react'
import {useState} from 'react'
import  {Link, useNavigate} from 'react-router-dom'
// CSS IN WELCOME

const LoginForm = ({login, user}) => {

  // definining the initial state as an object of username and password with empty strings
  const initialState = { username: "", password: ""}
  // defining the state of the input and setting it to initial state username/pw
  const [input, setInput] = useState(initialState)
  // useNavigate returns an imperative method that you can use for changing location.
	const navigate = useNavigate()
  // event handler for submitted login
  const handleLogin = async (e) => {
  // Clicking on a "Submit" button, this prevents it from submitting a form
    e.preventDefault()
  // gets user token from login userInput from App.js component
    const createdUserToken = await login(input)
    if (createdUserToken) {
      navigate(`/${input.username}`) //undefined on first login
    } else {
      navigate("/login/")
    }
    // set state as new username and password on submit
		setInput(initialState);

  };

// save new state with password and value on event change
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

// Login Form JSX and export
  return (
    <div className="loginDiv">
      <form onSubmit={handleLogin}>
        <label htmlFor="username"> Name: </label>
        <input
          id="username"
          name="username"
          value={input.username}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="password"> Password: </label>
        <input
          id="password"
          name="password"
          value={input.password}
          onChange={handleChange}
        />
        <br />
        <br />
        <div className='welcomeSubmitButtonContainer'>
          <input className="welcomeSubmitButton" type="submit" value="login" />
        </div>
      </form>
    </ div>
  );
};

export default LoginForm;

import React from 'react'
import {useState} from 'react'
import  {Link, useNavigate} from 'react-router-dom'
import "../../css/Welcome.css"
// CSS IN WELCOME

const Login = ({login, user}) => {

  const navigate = useNavigate()
  // definining the initial state as an object of username and password with empty strings
  const initialState = { username: "", password: ""}
  // defining the state of the input and setting it to initial state username/pw
  const [input, setInput] = useState(initialState)

  // event handler for submitted login
  const handleLogin=async(e)=>{
    e.preventDefault()
    const createdUserToken = await login(input)

    if(createdUserToken){navigate(`/${input.username}`);}
    else{navigate("/login/")}
		setInput(initialState);
  };

// save new state with password and value on event change
  const handleChange=(e)=>{setInput({ ...input, [e.target.name]: e.target.value });};

  return (
    <section className='gridWrapper'>
      <div className='welcomeContainer'>
        <h2>FotoBook</h2>
        <div className="loginDiv">
          <form onSubmit={handleLogin}>
            <input id="username"
                  name="username"
                  placeholder="Username.."
                  value={input.username}
                  onChange={handleChange}/>
            <br />
            <br />
            <input id="password"
                  name="password"
                  placeholder="Password.."
                  type="password"
                  value={input.password}
                  onChange={handleChange}/>
            <br />
            <br />
            <div className='welcomeSubmitButtonContainer'>
              <input className="welcomeSubmitButton" type="submit" value="login" />
            </div>
          </form>
        </div>
        <Link to='/signup' className="loginOrRegister">
          <div>Don't have an account?  <span className='signUpTxt'>Sign Up</span></div>
        </Link> 
      </div>
    </section>
  );
};

export default Login;

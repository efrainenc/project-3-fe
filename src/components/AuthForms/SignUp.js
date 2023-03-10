import React, {useState} from 'react'
import  {useNavigate, Link} from 'react-router-dom'
import "../../css/AuthForm.css"

const SignUp=({signup, createProfile}) =>{
	const navigate= useNavigate()
  // definining the initial state as an object of username and password with empty strings
  const initialState= { username: "", password: ""}
  // defining the state of the input and setting it to initial state username/pw
  const [input, setInput]= useState(initialState)
  // sets Profile form MAY NEED TO GO INSIDE RegisterForm
  const [profileForm]= useState({
    usernameProfile: "", 
    imageProfile: "",
    headerImageProfile: "",
    bioProfile: "",
    owner: `${input.username}`
  });

  // event handler for submitted Register info
  const handleRegister=async(e)=>{
    e.preventDefault()

    const createdUserToken = await signup(input)
    const createdUserProfile = await createProfile(profileForm)

    if(createdUserToken && createdUserProfile){navigate(`/${input.username}`)}
    else{navigate("/register/")}
    
		setInput(initialState);
  };

  // save new state with password and value on event change
  const handleChange=(e)=>{setInput({ ...input, [e.target.name]: e.target.value });};

  // Register Form JSX and export
  return (
    <section className='gridWrapper'>
      <div className='welcomeContainer'>
        <h2>FotoBook</h2>
        <div className="loginSignUp">
          <form onSubmit={handleRegister}>
            <input
              id="username"
              name="username"
              placeholder="Username.."
              value={input.username}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              id="password"
              name="password"
              placeholder="Password.."
              value={input.password}
              onChange={handleChange}
            />
            <br />
            <br />
            <div className='welcomeSubmitButtonContainer'>
              <input className="welcomeSubmitButton" type="submit" value="Sign Up" />
            </div>
          </form>
        </div>
        <Link to='/login' className="loginOrRegister">
          <div>Have an account? <span className='signInTxt'>Log In</span></div>
        </Link>
      </div>
    </section>
    );
};

export default SignUp;

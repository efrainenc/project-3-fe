import { React, useState} from 'react'
import { Link } from 'react-router-dom'
import "../../css/Welcome.css"
import LoginForm from '../AuthForms/LoginForm'
import RegisterForm from '../AuthForms/RegisterForm'

const Welcome = ({signup, createProfile, user, login}) => {
  // LOGIN FORM
  const [loginOrRegister, setLoginOrRegister] = useState(true)
  // REGISTER FORM

  const changeForm = () =>{
    setLoginOrRegister(current => !current)
  }

  return (
    <section>
      <div className='welcomeContainer'>
        <div>
          <h1>WELCOME</h1>
        </div>
        {loginOrRegister? <LoginForm user={user} login={login}/> : <RegisterForm signup={signup} createProfile={createProfile}/>}
        <div>
          <button className="loginOrRegister" onClick={changeForm}>{loginOrRegister?"Don't have an account ?":"Already have an account ?"}</button> 
        </div>
        {/* <Link to='/login'>
            <h1>Login</h1>
        </Link> */}
        {/* <Link to='/register'>
          <h1>Register</h1>
        </Link> */}
      </div>
    </section>
  )
}

export default Welcome
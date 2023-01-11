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
        {loginOrRegister? <RegisterForm signup={signup} createProfile={createProfile}/> : <LoginForm user={user} login={login}/>}
        <div>
          <button className="loginOrRegister" onClick={changeForm}>{loginOrRegister? "Already have an account ?":"Don't have an account ?"}</button> 
        </div>
      </div>
    </section>
  )
}

export default Welcome
import { React, useState} from 'react'
import "../../css/Welcome.css"

const Welcome=({signup, createProfile, user, login})=>{
  // Boolean state to toggle between Login or Register Forms
  const [loginOrRegister, setLoginOrRegister]=useState(true)
  // Function to toggle state
  const changeForm=()=>{setLoginOrRegister(current=>!current)}
  
  return(
    <section>
      <div className='welcomeContainer'>
        <div>
          <h1>WELCOME</h1>
        </div>
      </div>
    </section>
  )
}

export default Welcome
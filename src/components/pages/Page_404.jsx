import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/App.css'

const Page_404 = () => { // TODO create contact page
  return (
    <div className='PNF_Container'>
      <h1>404 PAGE NOT FOUND</h1>
        <h1>Oops! You seem to be lost.</h1>
        <p>Here are some helpful links:</p>
        <div className='pnfLink'>
          <Link to='/'>Home</Link>
        </div>
        <div className='pnfLink'>
          <Link to='/'>About Us</Link>
        </div>
        <div className='pnfLink'>
          <Link to='/'>Contact Us</Link> 
        </div>
    </div>
  )
}

export default Page_404
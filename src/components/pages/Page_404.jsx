import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/App.css'

const Page_404 = () => { // TODO create contact page
  return (
    <div className='404Container'>
      <h1>404 PAGE NOT FOUND</h1>
      <div>
        <h1>Oops! You seem to be lost.</h1>
        <p>Here are some helpful links:</p>
        <Link to='/'>Home</Link>
        <Link to='/'>About Us</Link>
        <Link to='/'>Contact Us</Link> 
      </div>
    </div>
  )
}

export default Page_404
import React from 'react'
import { Link } from 'react-router-dom'
import '../scss/App.css'

const Footer = () => { // TODO make an About us page and Contact Us page

  function scrollToTop(){window.scrollTo({top: 0, behavior: 'smooth'});}

  return (
    <footer className='footer'>
      <p onClick={scrollToTop} className="topOfPage">Top of Page</p>
      <a href='https://github.com/efrainenc/'> About Us</a>
      <a href='https://github.com/efrainenc/project-3-fe/tree/main'> Git Hub </a>
      <a href='https://github.com/cbowman422/'> Contact Us </a>
      <p> © 2023 FotoBook from The Booleans </p>
    </footer>
  )
}

export default Footer
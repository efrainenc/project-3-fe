import React from 'react'
import { Link } from 'react-router-dom'
import '../css/App.css'

const Footer = () => { // TODO make an About us page
  return (
    <footer className='footer'>
      <p> About Us </p>
      <a href='https://github.com/efrainenc/project-3-fe/tree/main'> Git Hub </a>
      <p> © 2023 FotoBook from The Booleans </p>
    </footer>
  )
}

export default Footer
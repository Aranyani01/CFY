import React from 'react'
import { Link } from 'react-router-dom'
import NavbarLinks from './NavbarLinks'

const { Image } = require('image-js');



  const Navbar = () => {
    return (
      <nav className="nav-wrapper green lighten-1">
        <div className="container">
          <Link to='/' className="brand-logo left-align">CFY.finance<sub>Beta</sub></Link>
          <NavbarLinks/>
        </div>
      </nav>
    )
  }


export default Navbar;

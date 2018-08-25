import React from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = (props) => {
  return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow mb-4">
        <a className="navbar-brand col-md-2 mr-0" href="/">portBnB</a>
        <input className="form-control bg-light w-50" type="text" placeholder="Search.." aria-label="Search"/>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">  
            <a className="nav-link" href="/">Sign out</a>
          </li>
        </ul>
      </nav>
  );
}

export default Header;

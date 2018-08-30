import React, { Component } from 'react';
// import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom';
import {Consumer} from '../../Context.js';
import './Header.css';
import axios from 'axios';


class Header extends Component {
  
  constructor(){
    super();
    this.state = {
      isLogin: false
    }
  }


  signOut = () => {
    window.localStorage.clear();
  }

  componentDidMount(){
    console.log("didmoutn header: ", this.props);
  }

  render(){
    return (
      
      <Consumer>
      {value => {

          const { currentUser } = value;
          console.log("IN HEADER: ", currentUser[0]);
          return (
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow mb-4">
            <a className="navbar-brand col-md-2 mr-0" href="/">portBnB</a>
            <input className="form-control bg-light w-50" type="text" placeholder="Search.." aria-label="Search"/>

            {currentUser[0] != null ?
            <div style={{color:'white'}}>
              <i className="fas fa-user-astronaut"></i>
              Welcome, {currentUser[0].username}
            </div>
            : null
            }

            <ul className="navbar-nav px-3">
            {currentUser[0] != null ?
                <li className="nav-item text-nowrap">
                    <a className="nav-link" onClick={this.signOut.bind() } href="/login">Sign out</a>
                </li>
            :
              <li className="nav-item text-nowrap">
                <a className="nav-link" href="/login">Sign in</a>
              </li>
            }

            </ul>
          </nav>
          );
      }}

      </Consumer>

  );
}
}

export default Header;

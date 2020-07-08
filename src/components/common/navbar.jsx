import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Brand from './navIcon.png';
class Navbar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-expand-lg  navbar-dark bg-primary p-0">
        <div className="container">
          <Link to="/" className="navbar-brand font-weight-bold">
            <span>
              <img src={Brand} alt="Join Buddy" />
            </span>
            {process.env.REACT_APP_NAME}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/signUp">
                  SignUp
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;

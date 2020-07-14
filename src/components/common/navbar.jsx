import React, { Component, Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faBell } from '@fortawesome/free-solid-svg-icons';
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
          <div
            className="collapse navbar-collapse w-100 justify-content-center"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mx-auto">
              {this.props.authenticated ? (
                <Fragment>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/scream">
                      <FontAwesomeIcon icon={faPlus} />
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/">
                      <FontAwesomeIcon icon={faHome} />
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/notifications">
                      <FontAwesomeIcon icon={faBell} />
                    </NavLink>
                  </li>
                </Fragment>
              ) : (
                <Fragment>
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
                </Fragment>
              )}
            </ul>
          </div>
          <div className="w-100"></div>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(Navbar);

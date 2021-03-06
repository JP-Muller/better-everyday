import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../redux/userReducer';
import { Link } from 'react-router-dom';
import Weather from './Weather'

function Navbar(props) {
  // console.log(props);
  let date = new Date().toDateString()
  return (
    <div className='navbar nav-background'>
      <header className='nav-header'>
        {!props.user.loggedIn ? (<i className='icon far fa-check-square checkIcon' />) : (<i className="fas fa-bars" onClick={props.drawerClickHandler} />)}
        <h1><Link to='/'>Better Everyday</Link></h1>
      </header>
      {props.user.loggedIn ? (
        <div id='date-header'>
          <h3>{date}</h3>
        </div>
      ) : null}
      {props.user.loggedIn ? (
        <div className='nav-link-container'>
          <Weather />
          {/* <Link to='/' className='nav-link'>Home</Link>
          <Link to='/entries' className='nav-link'>Entries</Link>
          <Link to='/account' className='nav-link'>Account</Link>
          <Link to='/about' className='nav-link'>About</Link>
          <button onClick={props.logout} className="warning-btn">
            <i className="fas fa-sign-out-alt"></i>
          </button> */}
        </div>
      ) : (
          <span>
            <Link to="/login" className="btn normal-btn">
              Login
          </Link>
            <Link to="/signup" className="btn normal-btn">
              Signup
          </Link>
          </span>
        )}
    </div>
  );
}

function mapStateToProps(state) {
  return state.user;
}

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
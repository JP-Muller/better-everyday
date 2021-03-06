import React, { Component } from 'react';
import { signup } from '../redux/userReducer';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { css } from 'glamor';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: ''
    };
  }

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
    console.log(`${name}: ${value}`)
  };

  notifySignupSuccess = () => toast('Successfully created account!', {
    className: css({
        background: "rgba(0,0,0,0.6) !important"
    }),
    position: toast.POSITION.BOTTOM_RIGHT,
    toastClassName: "dark-toast"
})

  signupUser = () => {
    this.props.signup(this.state.firstName, this.state.lastName, this.state.email, this.state.username, this.state.password);
    this.notifySignupSuccess()
  };

  render() {
    let { firstName, lastName, email, username, password } = this.state;
    let { user } = this.props;
    if (user.loggedIn) return <Redirect to="/" />;
    return (
      <div className="display-container">
        <header className='signup-header'>
          <h2>Start Today!</h2>
        </header>
        <br />
        <div className="box-medium">
          <div className="input-row">
            First Name:{' '}<br />
            <input
              type="text"
              value={firstName}
              name="firstName"
              onChange={this.handleChange}
              className="input"
            />
          </div>
          <div className="input-row">
            Last Name:{' '}<br />
            <input
              type="text"
              value={lastName}
              name="lastName"
              onChange={this.handleChange}
              className="input"
            />
          </div>
          <div className="input-row">
            Email:{' '}<br />
            <input
              type="text"
              value={email}
              name="email"
              onChange={this.handleChange}
              className="input"
            />
          </div>
          <div className="input-row">
            Username:{' '}<br />
            <input
              type="text"
              value={username}
              name="username"
              onChange={this.handleChange}
              className="input"
            />
          </div>
          <div className="input-row">
            Password:{' '}<br />
            <input
              type="password"
              value={password}
              name="password"
              onChange={this.handleChange}
              className="input"
            />
          </div>
          <br />
          <button onClick={this.signupUser} className="normal-btn">
           <Link to='/login'> Create Account </Link>
          </button>
        </div>

        <div />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.user;
}

export default connect(
  mapStateToProps,
  { signup }
)(Signup);
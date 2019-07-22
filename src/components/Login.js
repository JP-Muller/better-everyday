import React, { Component } from 'react';
import { login } from '../redux/userReducer.js';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        };
    }

    handleChange = e => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    };

    loginUser = () => {
        this.props.login(this.state.username, this.state.password);
    };

    render() {
        let { username, password } = this.state;
        let { user } = this.props;
        if (user.loggedIn) return <Redirect to="/" />;
        return (
            <div className="display-container">
                <div className="box-medium">
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
                    <br />
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
                    <button onClick={this.loginUser} className="btn normal-btn">
                        Login
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
    { login }
)(Login);

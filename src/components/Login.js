import React, { Component } from 'react';
import { login } from '../redux/userReducer.js';
import { connect } from 'react-redux';
import { Redirect, Link} from 'react-router-dom';

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
                   
                    <span className='btn-container'>
                        <button onClick={this.loginUser} className="normal-btn">
                            Login
          </button>
                    </span>
                    <div style={{color: '#fff', fontSize: '15px', marginTop: '10px'}}>Not a member? <Link style={{color: 'lightblue'}} to='/signup'><u>Sign up</u></Link></div>
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

import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

export class Account extends Component {
    constructor() {
        super()
        this.state = {
            newfirstName: '',
            newlastName: '',
            newUsername: '',
            newEmail: '',
            newProfileImage: ''
        }
    }
    handleChange = e => {
        let { name, value } = e.target
        this.setState({ [name]: value })
        console.log(`${name}: ${value}`)
    };
    render() {
        let { user, error, redirect } = this.props
        let { firstName, lastName, username, email } = user
        if (error || redirect) return <Redirect to="/login" />;
        if (!user.loggedIn) return <div>Loading</div>;
        return (
            <div className='account-info-container'>
                <h2>Update User Settings</h2>
                <hr />
                <div className='account-details-container'>
                    <div className='account-image-preview'>
                        <img src='https://images.stubsites.com/webassets.ticketmob.com/LS/images/comedians/40FB835C-077B-196D-1E457C9F115E07AD.jpg' />
                    </div>
                    Profile Picture:
                    <div className='account-input-row'>
                        <input
                            type="text"
                            name="newProfileImage"
                            onChange={this.handleChange}
                            className="input"
                        />
                    </div>
                    First Name:
                    <div className='account-input-row'>
                        <input
                            type="text"
                            value={firstName}
                            name="newFirstName"
                            onChange={this.handleChange}
                            className="input"
                        />
                    </div>
                    Last Name:
                    <div className='account-input-row'>

                        <input
                            type="text"
                            value={lastName}
                            name="newLastName"
                            onChange={this.handleChange}
                            className="input"
                        />
                    </div>
                    Username:
                    <div className='account-input-row'>
                        <input
                            type="text"
                            value={username}
                            name="newUsername"
                            onChange={this.handleChange}
                            className="input"
                        />
                    </div>
                    Email:
                    <div className='account-input-row'>

                        <input
                            type="text"
                            value={email}
                            name="newEmail"
                            onChange={this.handleChange}
                            className="input"
                        />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state.user
}
export default connect(mapStateToProps)(Account)
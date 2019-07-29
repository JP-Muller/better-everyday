import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Account extends Component {
    constructor() {
        super()
        this.state = {
            newfirstName: '',
            newlastName: '',
            newUsername: '',
            newEmail: ''
        }
    }
    handleChange = e => {
        let { name, value } = e.target
        this.setState({ [name]: value })
        console.log(`${name}: ${value}`)
    };
    render() {
        let { user } = this.props
        let { firstName, lastName, username, email } = user
        return (
            <div className='account-info-container'>
                <h2>Update User Settings</h2>
                <hr />
                <div className='account-details-container'>
                    <div className='account-input-row'>
                        First Name:
                <input
                            type="text"
                            value={firstName}
                            name="newFirstName"
                            onChange={this.handleChange}
                            className="input"
                        />
                    </div>
                    <div className='account-input-row'>
                        Last Name:
                    <input
                            type="text"
                            value={lastName}
                            name="newLastName"
                            onChange={this.handleChange}
                            className="input"
                        />
                    </div>
                    <div className='account-input-row'>
                        Username:
                    <input
                            type="text"
                            value={username}
                            name="newUsername"
                            onChange={this.handleChange}
                            className="input"
                        />
                    </div>
                    <div className='account-input-row'>
                        Email:
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
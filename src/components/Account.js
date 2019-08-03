import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser } from '../redux/userReducer';

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
    componentDidMount() {
        this.props.getUser()
        console.log(this.props.user);
    }
    handleChange = e => {
        let { name, value } = e.target
        this.setState({ [name]: value })
        console.log(`${name}: ${value}`)
    };
    render() {

        let { user, error, redirect } = this.props.user
        let { totalPosts } = this.props.entry
        console.log(user)
        let { firstName, lastName, username, email, level, xp, score_streak, image } = user
        if (error || redirect) return <Redirect to="/login" />;
        if (!user.loggedIn) return <div>Loading</div>;
        let splitLastName = lastName.split('')
        return (
            <div className='account-info-container'>
                <h2>Update User Settings</h2>
                <hr />
                <div className='account-details-container'>
                    <section className='account-container'>
                        <div className='account-image-preview'>
                            <img src={image} />
                            <div><h1>{username}</h1></div>
                            <div><h2>{firstName} {splitLastName[0]}</h2> </div>
                            <div><h3>{email}</h3></div>
                        </div>
                        <section className='account-stats'>
                            <div className='stat-container'><h3>Level: </h3> <h2>{level}</h2></div>
                            <div className='stat-container'><h3>Total XP: </h3> <h2>{xp}</h2></div>
                            <div className='stat-container'><h3>Current Score Streak: </h3><h2>{score_streak}</h2></div>
                            <div className='stat-container'><h3>Total Posts:</h3><h2>{totalPosts}</h2></div>
                        </section>
                    </section>
                    {/* Profile Picture:
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
                            defaultValue={firstName}
                            name="newFirstName"
                            onChange={this.handleChange}
                            className="input"
                        />
                    </div>
                    Last Name:
                    <div className='account-input-row'>

                        <input
                            type="text"
                            defaultValue={lastName}
                            name="newLastName"
                            onChange={this.handleChange}
                            className="input"
                        />
                    </div>
                    Username:
                    <div className='account-input-row'>
                        <input
                            type="text"
                            defaultValue={username}
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
                    </div> */}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        entry: state.entry
    }
}
export default connect(mapStateToProps, { getUser })(Account)
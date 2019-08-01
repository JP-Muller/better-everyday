import React, { Component } from 'react'
import { connect } from 'react-redux';
import { logout } from '../redux/userReducer';
import { Link } from 'react-router-dom'


class SideDrawer extends Component {

    logout = () => {
        this.props.drawerClickHandler()
        this.props.logout()
    }
    render() {
        let { username } = this.props.user
        let drawerClasses = 'side-drawer'
        if (this.props.show) {
            drawerClasses = 'side-drawer open'
        }
        return (
            <nav className={drawerClasses}>
                <header className='drawer-header'>
                    <h1 className='nav-header'>
                        <i className='icon far fa-check-square checkIcon' />
                        Better Everyday</h1>
                </header>
                <div className='account-image'>
                    <img src='https://images.stubsites.com/webassets.ticketmob.com/LS/images/comedians/40FB835C-077B-196D-1E457C9F115E07AD.jpg' />
                    <h3>{username}</h3>
                    <h4>Level: 37</h4>
                    <h4>Score Streak: 7</h4>
                </div>
                <div className='side-drawer-link-container'>
                    <div className='link-container'>
                        <Link to='/' className='nav-link'>Home</Link>
                    </div>
                    <div className='link-container'>
                        <Link to='/entries' className='nav-link'>Entries</Link>
                    </div>
                    <div className='link-container'>
                        <Link to='/account' className='nav-link'>Account</Link>
                    </div>
                    <div className='link-container'>
                        <Link to='/about' className='nav-link'>About</Link>
                    </div>
                    <button className="warning-btn" onClick={this.logout} >
                        <i className="fas fa-sign-out-alt"></i>
                    </button>
                </div>
                {/* <ul>
                    <li>Account</li>
                </ul> */}
            </nav>
        )
    }
}


function mapStateToProps(state) {
    return state.user;
}

export default connect(
    mapStateToProps,
    { logout }
)(SideDrawer);


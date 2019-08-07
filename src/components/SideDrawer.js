import React, { Component } from 'react'
import { connect } from 'react-redux';
import { logout, getUser, getUserScores } from '../redux/userReducer';
import {clearPostState} from '../redux/entryReducer'
import { Link } from 'react-router-dom'


class SideDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = { seconds: 0 };
    }

    tick() {
        this.setState(prevState => ({
            seconds: prevState.seconds + 1
        }));
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 5000);
        if (this.props.user.loggedIn) {
            this.props.getPosts(this.props.user.id)
            this.props.getUserScores()
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    logout = () => {
        this.props.clearPostState()
        this.props.drawerClickHandler()
        this.props.logout()
    }
    render() {
        console.log('this.props', this.props)
        let { username, image} = this.props.user.user
        let { currentLevel, scoreStreak } = this.props.user
        console.log('scoreStreak', scoreStreak)

        let drawerClasses = 'side-drawer'
        if (this.props.show) {
            drawerClasses = 'side-drawer open'
        }
        return (
            < nav className={drawerClasses} >
                <header className='drawer-header'>
                    <h1 className='nav-header'>
                        <i className='icon far fa-check-square checkIcon' />
                        Better Everyday</h1>
                </header>
                <div className='account-image'>
                    <img src={image} />
                    <h3>{username}</h3>
                    <h4 style={{marginTop: '15px'}}>LEVEL: {currentLevel}</h4>
                    {/* <h4>Score Streak: {scoreStreak}</h4> */}
                </div>
                <div className='side-drawer-link-container'>
                    <div className='link-container'>
                        <Link to='/' className='nav-link' onClick={this.props.drawerClickHandler}>Home</Link>
                    </div>
                    <div className='link-container'>
                        <Link to='/entries' className='nav-link' onClick={this.props.drawerClickHandler}>Entries</Link>
                    </div>
                    <div className='link-container'>
                        <Link to='/account' className='nav-link' onClick={this.props.drawerClickHandler}>Account</Link>
                    </div>
                    <div className='link-container'>
                        <Link to='/about' className='nav-link' onClick={this.props.drawerClickHandler}>About</Link>
                    </div>
                    <button className="warning-btn" onClick={this.logout} >
                        <i className="fas fa-sign-out-alt"></i>
                    </button>
                </div>
                {/* <ul>
                    <li>Account</li>
                </ul> */}
            </nav >
        )
    }
}


function mapStateToProps(state) {
    return {
        user: state.user,
        entry: state.entry
    }
}

export default connect(
    mapStateToProps,
    { logout, getUser, getUserScores, clearPostState }
)(SideDrawer);


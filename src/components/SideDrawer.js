import React, { Component } from 'react'
import { connect } from 'react-redux';
import { logout, getUser, getUserScores } from '../redux/userReducer';
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
        this.props.drawerClickHandler()
        this.props.logout()
    }
    render() {
        let { username, image, level, score_streak } = this.props.user
        let { currentLevel, scoreStreak } = this.props
        let drawerClasses = 'side-drawer'
        if (this.props.show) {
            drawerClasses = 'side-drawer open'
        }
        console.log(score_streak)
        console.log(scoreStreak)
        console.log(currentLevel)
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
                    <h4>Level: {currentLevel}</h4>
                    <h4>Score Streak: {scoreStreak}</h4>
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
            </nav >
        )
    }
}


function mapStateToProps(state) {
    return state.user;
}

export default connect(
    mapStateToProps,
    { logout, getUser, getUserScores }
)(SideDrawer);


import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from './Login'
import { getUser, getUserScores, adminGetAllPosts, updateProfileImage } from '../redux/userReducer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { css } from 'glamor';
import firebase from 'firebase'
import FileUploader from 'react-firebase-file-uploader'
const parse = require('html-react-parser')

export class Account extends Component {
    constructor() {
        super()
        this.state = {
            newfirstName: '',
            newlastName: '',
            newUsername: '',
            newEmail: '',
            newProfileImage: '',
            adminView: false,
            editPic: false,
            urlBarToggled: false,
        }
    }
    notify = () => toast("Wow so easy !");
    componentDidMount() {
        this.props.getUser()
        this.props.getUserScores()
        this.props.adminGetAllPosts()
        console.log(this.props.user);
    }
    flipAdminView = () => {
        let { adminView } = this.state
        this.props.adminGetAllPosts()
        this.setState({
            adminView: !adminView
        })
    }
    flipImageEdit = () => {
        let { editPic } = this.state
        this.setState({
            editPic: !editPic
        })
    }
    fileUploadHandler = (filename) => {
        firebase.storage().ref('entryImages').child(filename).getDownloadURL()
            .then(url => this.setState({
                newProfileImage: url
            }), this.forceUpdate())
    }
    handleUrlBarToggle = () => {
        let { urlBarToggled, gifSearchToggled } = this.state
        if (gifSearchToggled) {
            this.setState({ gifSearchToggled: !gifSearchToggled })
        }
        this.setState({ urlBarToggled: !urlBarToggled })
    }
    saveImageChanges = () => {
        let { newProfileImage, editPic } = this.state
        this.setState({ editPic: !editPic })
        this.props.updateProfileImage(newProfileImage)
        this.props.getUser()

    }
    handleChange = e => {
        let { name, value } = e.target
        this.setState({ [name]: value })
        console.log(`${name}: ${value}`)
        toast("DING!", {
            className: css({
                background: 'black'
            }),
            bodyClassName: css({
                fontSize: '60px'
            }),
            progressClassName: css({
                background: "repeating-radial-gradient(circle at center, red 0, blue, green 30px)"
            }),
            position: toast.POSITION.BOTTOM_RIGHT,
        });
    };
    render() {

        let { user, error, redirect, scoreStreak, currentLevel, allPosts, highestStreak } = this.props.user
        let { totalPosts } = this.props.entry
        let { adminView, editPic, urlBarToggled, newProfileImage } = this.state
        let { firstName, lastName, username, email, xp } = user
        if (user.image && newProfileImage === '') { newProfileImage = user.image }
        if (error || redirect) return <Redirect to="/login" />;
        if (!user.loggedIn) return <div className='account-info-container'><div>Please log back in to view profile changes.</div><div><Login /></div></div>;
        let splitLastName = lastName.split('')
        return (

            <div className='account-info-container'>
                <hr />
                <div className='account-details-container'>
                    {!adminView ? (<section className='account-container'>
                        <div className='account-image-preview'>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                {!editPic ? (<i className="fas fa-edit" onClick={this.flipImageEdit} style={{ position: 'top' }} />) : (<div><div className='image-method-container'>
                                    <div className='url-icon'>
                                        <i className="far fa-save" onClick={this.saveImageChanges} />
                                    </div>
                                    <div className='url-icon'>
                                        <i className="fas fa-link" onClick={this.handleUrlBarToggle} title='Image URL' />
                                    </div>
                                    <div className='url-icon'>
                                        <label style={{ display: 'none' }} ref={fileInput => this.fileInput = fileInput}><FileUploader
                                            hidden='true'
                                            accept='image/*'
                                            name='fileSelected'
                                            storageRef={firebase.storage().ref('entryImages')}
                                            onUploadSuccess={this.fileUploadHandler} />
                                        </label>
                                        <i className="fas fa-upload" onClick={() => this.fileInput.click()} title='Upload' />
                                    </div>
                                    <div className='url-icon'>
                                        <i className="fas fa-times" onClick={this.flipImageEdit} />
                                    </div>
                                </div>
                                    {urlBarToggled ? (<section className='url-search'>
                                        <input type='text' defaultValue={newProfileImage} name='newProfileImage' onChange={this.handleChange} /></section>) : null}
                                </div>)}
                                <img src={newProfileImage} />
                            </div>
                            <div className='username-img-container'>
                                <div className='image-username-link'><h1>{username}</h1></div>
                            </div>
                            <div className='acc-details'>

                                <div className='acc-detail-container'><h2>{firstName} {splitLastName[0]}</h2> </div>
                                <div className='acc-detail-container'><h3>{email}</h3></div>
                                {user.id === 3 ? (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><div className='acc-detail-admin' onClick={this.flipAdminView}><h3>Admin View</h3></div></div>) : null}

                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <section className='account-stats'>
                                <h2><u>User Stats</u></h2>
                                <div className='stat-container'><h3>Level: </h3> <h2>  {currentLevel}</h2></div>
                                <div className='stat-container'><h3>Total XP: </h3> <h2>  {xp}</h2></div>
                                {/* <div className='stat-container'><h3>Current Streak: </h3><h2>  {scoreStreak}</h2></div>
                                <div className='stat-container'><h3>Highest Streak: </h3><h2>  {highestStreak}</h2></div> */}
                                <div className='stat-container'><h3>Total Posts:</h3><h2>  {totalPosts}</h2></div>
                            </section>
                        </div>
                    </section>) : (<div className='posts-content-container' style={{ border: '1px solid #ccc', overflow: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '65vh' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', marginTop: '10px', padding: '10px' }}>
                            {allPosts.length ? (<div style={{ height: '100%', width: '%100' }}><div>ALL POSTS</div><div className='private-posts-master' style={{ height: '100%', width: '100%' }}>{allPosts.map(post => {
                                return (

                                    <div style={{ margin: '10px 2px 10px 2px', padding: '20px' }} className='private-entry-preview'>
                                        <div id='public-entry-date' style={{ display: 'flex', justifyContent: 'spaceBetween', alignItems: 'center', height: '50px', background: 'rgba(192, 192, 192, 0.1)' }}>
                                            <div>{post.date_posted}</div>
                                            <div>Post ID: {post.id}</div>
                                            <div>Username: {post.username}</div>
                                        </div>
                                        <div className='public-post-container'>
                                            <div className='image-tasks-container' >
                                                <section id='public-image-of-day'>
                                                    <section style={{ height: '90%' }}>
                                                        {/* <header className='post-titles-header'><h4><i><b>Image of the Day </b></i></h4></header> */}
                                                        <img src={post.image} alt='Preview Imagery' style={{ transform: 'scale(1.05)' }} />
                                                        {post.mood && post.mood.length > 0 ? (this.moodChecker(post.mood)) : null}
                                                    </section>
                                                </section>
                                                <div id='completed-task-preview'>
                                                    <header id='completed-tasks-header'>
                                                        <i className='icon far fa-check-square checkIcon' /><h3> Completed Tasks </h3>  <i className='icon far fa-check-square checkIcon' />
                                                    </header>

                                                    {post.task_1 ? (<div className='public-task-item'> {post.task_1}</div>) : null}
                                                    {post.task_2 ? (<div className='public-task-item'>{post.task_2}</div>) : null}
                                                    {post.task_3 ? (<div className='public-task-item'> {post.task_3}</div>) : null}
                                                    {post.task_4 ? (<div className='public-task-item'> {post.task_4}</div>) : null}
                                                    {post.task_5 ? (<div className='public-task-item'> {post.task_5}</div>) : null}

                                                </div>
                                            </div>
                                            <div id='entry-of-day-preview'>
                                                <header className='post-titles-header'><h3 id='entry-of-day-header-preview'><u>Additional Thoughts</u> </h3></header>
                                                <div id='public-entry-of-day-text-preview' >
                                                    <div>{parse(post.entry)}</div>
                                                    {/* <div className='edit-entry-quill-container'>
                                                    <ReactQuill value={post.entry} onKeyPress={this.flipEntryEdit} />
                                                </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                )
                            })}</div></div>) : null}
                        </div>
                    </div>)}
                </div>
                {adminView ? (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '35vh', marginTop: '10px' }}><div className='acc-detail-admin' onClick={this.flipAdminView}><h3>Go Back</h3></div></div>) : null}
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
export default connect(mapStateToProps, { getUser, getUserScores, adminGetAllPosts, updateProfileImage })(Account)
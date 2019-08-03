import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { saveTasks, getPosts, saveEntry, savePostDate, saveImageOfDay } from '../../redux/entryReducer'
import { addToStreak, removeStreak, getUserScores, getUser } from '../../redux/userReducer'
import { connect } from 'react-redux'
import firebase from 'firebase'
import FileUploader from 'react-firebase-file-uploader'
import Tenor from 'react-tenor'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
const parse = require('html-react-parser')


export class Step1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputStr: '',
            initTasks: this.props.entry.completedTasks,
            completedTasks: this.props.entry.completedTasks,
            imageOfDay: this.props.entry.imageOfDay,
            mode: 'taskList',
            gifSearchToggled: false,
            urlBarToggled: false,
            readyToUpload: false,
            selectedFile: null,
            postedToday: false,
            todaysPost: {},
            scoreStreak: 0,
            entry: this.props.entry.entry,
            date: this.props.entry.date,
            completedCount: 0

        }
    }

    componentDidMount() {
        let { user } = this.props.user
        let { posts } = this.props.entry
        console.log(posts)
        posts.map((post, i) => {
            let date = new Date().toDateString()
            if (post.date_posted === date) {
                this.setState({
                    postedToday: true,
                    todaysPost: post
                }, () => {
                    let { todaysPost, scoreStreak } = this.state
                    let todaysDateSplit = todaysPost.date_posted.split(' ')
                    for (let i = 0; i < posts.length; i++) {
                        let postDateSplit = posts[i].date_posted.split(' ')
                        if (todaysDateSplit[1] === postDateSplit[1] && +todaysDateSplit[2] === +postDateSplit[2] + 1) {
                            this.props.addToStreak()
                        } else if (todaysDateSplit[1] != postDateSplit[1] && +postDateSplit[2] === 31) {
                            this.props.addToStreak()
                        } else {
                            this.props.removeStreak()

                        }
                    }
                    // posts.map((post) => {
                    //     let { todaysPost, scoreStreak } = this.state
                    //     let todaysDateSplit = todaysPost.date_posted.split(' ')
                    //     let postDateSplit = post.date_posted.split(' ')
                    //     console.log(todaysDateSplit[1], postDateSplit[1]);
                    //     console.log(todaysDateSplit[2], postDateSplit[2])
                    //     if (todaysDateSplit[1] === postDateSplit[1] && +todaysDateSplit[2] === +postDateSplit[2] + 1) {
                    //         this.props.addToStreak()
                    //     } else if (todaysDateSplit[1] != postDateSplit[1] && +postDateSplit[2] === 31) {
                    //         this.props.addToStreak()
                    //     } else {
                    //         (console.log('No'))
                    //     }
                    // })

                })
            } else this.setState({ postedToday: false })
        })
        // posts.map((post, i) => {
        //     let scoreStreak = 0
        //     let dateArray = post.date_posted.split(' ')
        //     if 
        // })

        if (!user.loggedIn) {
            this.props.getUser();
            console.log('Got User!')
        }
        if (!posts.length && user.loggedIn) {
            this.props.getPosts(user.id)
        }
    }

    inputChange = inputStr => {
        this.setState({ inputStr })
        // console.log({ inputStr })
    }

    handleCheckChange = (i) => {
        let { initTasks, completedCount } = this.state
        let checkedTasks = initTasks
        let count = completedCount
        if (checkedTasks[i] && checkedTasks[i].checked !== true) {
            checkedTasks[i].checked = true
            count++
            this.setState({ completedCount: count })
            console.log(`Checked Task ${checkedTasks[i].title}`)
        } else {
            checkedTasks[i].checked = false
            count--
            this.setState({ completedCount: count })
            console.log(`Unchecked ${checkedTasks[i].title}`);
        }
        this.setState({
            initTasks: checkedTasks
        })
    }
    addToTasks = input => {
        let { initTasks } = this.state
        let newTask = {
            title: input,
            checked: false
        }
        let taskArray = initTasks
        if (input.length !== 0 && taskArray.length < 5) {
            taskArray.push(newTask)
        }
        this.setState({
            initTasks: taskArray,
            inputStr: ''
        })

    }

    onEnter = e => {
        let { inputStr, initTasks } = this.state
        let newTask = {
            title: inputStr,
            checked: false
        }
        let taskArray = initTasks
        if (e.keyCode === 13) {
            console.log('Enter hit..')
            if (inputStr.length !== 0 && taskArray.length < 5) {
                taskArray.push(newTask)
            }
            console.log('Curret Task Items:', taskArray)
            this.setState({
                initTasks: taskArray,
                inputStr: ''
            })
        }
    }

    backToTaskList = () => {
        this.setState({
            mode: 'taskList'
        })
    }

    backToEntryPrompt = () => {
        this.setState({
            mode: 'entryQuestion'
        })
    }
    handleEntryChange = (entry) => {

        this.setState({ entry, })
        console.log('Quill Text:', this.state.entry)
    }

    handleImageUrl = (imageOfDay) => {
        console.log(`Image URL State: ${imageOfDay}`)
        this.setState({
            imageOfDay
        })
    }
    handleTaskDelete = targetTask => {
        console.log('Deleted:', targetTask)
        let { initTasks, completedCount } = this.state
        let count = completedCount
        let updatedInitTasks = initTasks

        for (let i = 0; i < updatedInitTasks.length; i++) {
            if (updatedInitTasks[i] === targetTask) {
                updatedInitTasks.splice(i, 1)
                count--
                this.setState({ completedCount: count })
            }
        }
        this.setState({
            initTasks: updatedInitTasks,
        })
        console.log('initTasks State:', initTasks)
    }

    handleGifSearchToggle = () => {
        let { gifSearchToggled } = this.state
        this.setState({
            gifSearchToggled: !gifSearchToggled
        })
    }

    handleUrlBarToggle = () => {
        let { urlBarToggled, gifSearchToggled } = this.state
        if (gifSearchToggled) {
            this.setState({ gifSearchToggled: !gifSearchToggled })
        }
        this.setState({ urlBarToggled: !urlBarToggled })
    }

    fileSelectedHandler = e => {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }

    fileUploadHandler = (filename) => {
        this.setState({
            fileSelected: filename
        })
        firebase.storage().ref('entryImages').child(filename).getDownloadURL()
            .then(url => this.setState({
                imageOfDay: url
            }))
        console.log(this.state.imageOfDay)
    }

    saveImage = () => {
        let date = new Date().toDateString()
        let { imageOfDay } = this.state
        this.props.saveImageOfDay(imageOfDay)
        this.props.savePostDate(date)
    }

    saveItems = () => {
        let { initTasks } = this.state
        this.props.saveTasks(initTasks)
        this.setState({ mode: 'entryQuestion' })
    }

    saveEntry = () => {
        let { entry, date } = this.state
        this.props.saveEntry(entry)
        this.setState({ mode: 'imageQuestion' })
    }
    render() {
        let { initTasks, completedTasks, imageOfDay, mode, gifSearchToggled, urlBarToggled, readyToUpload, postedToday, todaysPost, completedCount } = this.state
        let { posts } = this.props.entry
        if (postedToday) {
            return (
                <div className='posted-style'>
                    <header className='list-header'>
                        <h1>Great job, {this.props.user.user.firstName}!</h1>
                    </header>
                    <section className='posted-message'><h2>Come back tomorrow to post again!</h2></section>

                    <div className='posted-button-container'>
                        <Link className='view-post-btn' onClick={this.saveEntry} to='/entries'>View my posts!</Link>
                    </div>
                </div >
            )
        } else if (mode === 'taskList') {
            return (
                <div className='list-style'>
                    <header className='list-header'>
                        <h1> What's on the agenda for today?</h1>
                    </header>
                    <div className='input-enter'>
                        <input onChange={(e) => this.inputChange(e.target.value)} value={this.state.inputStr} onKeyDown={this.onEnter} className='input-goals' type='text' />
                        <div className='input-enter-btn-div'></div>
                        <button className='input-enter-btn' onClick={() => this.addToTasks(this.state.inputStr)}><i className="fas fa-plus"></i></button>
                    </div>
                    <div>
                        {initTasks.map((taskItem, i) =>

                            <div className='task-container'
                                key={i}>
                                <div className='task-item' >
                                    <div className='task-check'>
                                        {taskItem.checked !== true ? (<button className='task-checked-false' onClick={() => this.handleCheckChange(i)}><i className='icon far fa-check-square checkIcon' /></button>) : (<button className='task-checked-true' onClick={() => this.handleCheckChange(i)}><i className='icon far fa-check-square checkIcon' /></button>)}</div>
                                    {taskItem.title}
                                    <div className='task-item-del'><button onClick={this.handleTaskDelete.bind(this, taskItem)}><i className="fas fa-minus-circle"></i></button></div>
                                </div>
                            </div>)}

                    </div>

                    {
                        initTasks.length ? (
                            <div className='step-1-save'>
                                <button className='list-btn' onClick={() => this.saveItems()}>Save</button>
                            </div>)
                            : null
                    }
                </div >
            )
        } else if (mode === 'entryQuestion') {
            return (
                <div className='entryStep-style'>
                    <header className='list-header'>
                        <h1>Way to go, {this.props.user.user.firstName}! You completed {completedCount === 1 ? (`${completedCount} task!`) : (`${completedCount} tasks!`)}</h1>
                    </header>

                    <section className='prompt-user'><h2>Add some additional thoughts about today!</h2></section>

                    <div className='quill-container'>
                        <ReactQuill value={this.state.entry} onChange={this.handleEntryChange} />
                    </div>
                    < div >
                        <div className="prompt-buttons"  >
                            <Link to='/' className='prompt-btn' onClick={() => this.backToTaskList()}>Previous</Link>
                            <div className="middle-buttons">
                                <div>
                                </div>
                            </div>
                            <Link className='prompt-btn' onClick={this.saveEntry} to='/'>Save Post</Link>
                        </div>
                    </div >
                </div >
            )
        } else if (mode === 'imageQuestion') {
            return (
                <div className='imageStep-style'>
                    <div>
                        <header className='list-header image-header'>
                            <h1>Upload photo of the day</h1>
                        </header>
                        <div className='wrapper' id='list-header'>
                            <div className='upload-img-preview'>
                                <div className='image-method-container'>
                                    <div className='gif-icon'>
                                        {/* <img src='https://i.imgur.com/0VNKgfp.jpg' onClick={this.handleGifSearchToggle} /> */}
                                        <button onClick={this.handleGifSearchToggle} title='Search GIFs'>GIF</button>
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
                                </div>
                                {gifSearchToggled ? (<section className='tenor-search'>
                                    <Tenor token="" onSelect={result => this.setState({ imageOfDay: result.media[0].gif.url })} />
                                </section>) : null}
                                {urlBarToggled ? (<section className='url-search'>
                                    <input type='text' placeholder='Image URL' onChange={(e) => this.handleImageUrl(e.target.value)} /></section>) : null}
                                <section className='image-of-day-container'>
                                    <img src={imageOfDay} alt='Preview Imagery' />
                                </section>
                            </div>
                        </div >


                    </div >
                    < div >
                        <div className="prompt-buttons"  >
                            <Link to='/' className='prompt-btn' onClick={() => this.backToEntryPrompt()}>Previous</Link>
                            <div className="middle-buttons">
                                <div>


                                </div>
                            </div>
                            <Link className='prompt-btn' onClick={this.saveImage} to='/wizard/postpreview'>Post Preview</Link>
                        </div>
                    </div >
                </div >
            )
        }
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
    { saveTasks, getPosts, saveEntry, savePostDate, saveImageOfDay, addToStreak, removeStreak, getUser, getUserScores }
)(Step1);

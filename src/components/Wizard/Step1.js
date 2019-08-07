import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { saveTasks, getPosts, saveEntry, savePostDate, saveImageOfDay, saveTodaysMood, removeMood, getAllPublicPosts, saveInitialTasks } from '../../redux/entryReducer'
import { addToStreak, removeStreak, getUserScores, getUser, removeStreakBlocker, postedTodayOff } from '../../redux/userReducer'
import { connect } from 'react-redux'
import firebase from 'firebase'
import FileUploader from 'react-firebase-file-uploader'
import Tenor from 'react-tenor'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
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
            viewPublicPosts: false,
            todaysPost: {},
            selectedMood: this.props.entry.mood,
            entry: this.props.entry.entry,
            date: this.props.entry.date,
            completedCount: 0,
            // publicPosts: 

        }
    }

    componentDidMount() {
        let { user } = this.props.user
        let { posts } = this.props.entry
        this.props.getAllPublicPosts()
        this.props.getPosts(user.id)
        if (posts.length) {
            this.checkIfPosted()
        }
        if (user.loggedIn) {
            this.props.getUserScores()
        }
        if (!user.loggedIn) {
            this.props.getUser();
            this.checkIfPosted()

            console.log('Got User!')
        }
        if (!posts.length && user.loggedIn) {
            this.props.getPosts(user.id)
        }
    }

    // componentDidUpdate = () => {
    //     let {posts} = this.props.entry
    //     let date = new Date().toDateString()
    //     if (posts.length && posts[posts.length - 1].date_posted === date){
    //         this.setState({postedToday: true})
    //     }
    // }

    checkIfPosted = () => {
        let { postedToday, todaysPost } = this.state
        let { user, posted } = this.props.user
        let { last_date_posted } = user
        let { posts } = this.props.entry
        let date = new Date().toDateString()
        if (posts.length && posts[posts.length - 1].date_posted !== date && last_date_posted !== date) {
            this.props.postedTodayOff()
            console.log('POSTED TODAY OFF!!');
        }
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].date_posted === date) {
                this.setState({
                    postedToday: true,
                    todaysPost: posts[i]
                })
                // }, () => {
                //     let { postedToday, todaysPost } = this.state
                //     let { posts } = this.props.entry
                //     let { streakAddedToday } = this.props.user
                //     let {last_date_posted }= this.props.user.user
                //     let splitCurrent = new Date().toDateString().split(' ')
                //     let yester = +splitCurrent[2] - 1
                //     let splitLast = last_date_posted.split(' ')
                //     let lastDate = +splitLast[2]
                //     console.log('yester', yester)
                //     console.log('lastDateP', lastDate)
                //     if (lastDate && lastDate === +yester && postedToday === true && streakAddedToday === false) {
                //         console.log('LAST DATE POSTED', last_date_posted)
                //         this.props.addToStreak(last_date_posted)
                //         console.log("ADDED STREAK");
                //     }
                //     let yesterday = +date.split(' ')[2] - 1
                //     console.log(yesterday)
                //     if (posts[posts.length - 1].date_posted !== date && last_date_posted !== yesterday) {
                //         this.props.removeStreak()
                //         console.log("REMOVED STREAK");
                //     }
                // let todaysDateSplit = todaysPost.date_posted.split(' ')
                // if (posts[posts.length - 2]) {
                //     let postBeforeToday = posts[posts.length - 2]
                //     let lastPostDate = postBeforeToday.date_posted.split(' ')
                //     if (postedToday === true && user.streak_block === false && todaysDateSplit[1] === lastPostDate[1] && +todaysDateSplit[2] !== +lastPostDate[2] && +todaysDateSplit[2] !== +lastPostDate[2] + 1) {
                //         this.props.removeStreak()
                //     }
                // }

                // })
            }
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
        this.props.saveInitialTasks(taskArray)
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
            this.props.saveInitialTasks(taskArray)
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
                if (updatedInitTasks[i].checked === true) {
                    count--
                }
                updatedInitTasks.splice(i, 1)

                this.setState({ completedCount: count })
            }
        }
        this.props.saveInitialTasks(updatedInitTasks)
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
        let { imageOfDay, selectedMood } = this.state
        if (selectedMood.length > 0) {
            this.props.saveTodaysMood(selectedMood)
        }
        this.props.saveImageOfDay(imageOfDay)
        this.props.savePostDate(date)
    }

    saveItems = () => {
        let { initTasks } = this.state
        this.props.saveTasks(initTasks)
        this.props.saveInitialTasks(initTasks)
        this.setState({ mode: 'entryQuestion' })
    }

    saveEntry = () => {
        let { entry, date } = this.state
        this.props.saveEntry(entry)
        this.setState({ mode: 'imageQuestion' })
    }
    setMoodAmused = () => {
        if (this.state.selectedMood !== 'Amused') {
            this.setState({
                selectedMood: 'Amused'
            }, () => { this.props.saveTodaysMood(this.state.selectedMood) })
        } else {
            this.setState({
                selectedMood: ''
            }, () => this.props.removeMood())

        }
    }
    setMoodHappy = () => {
        if (this.state.selectedMood !== 'Happy') {
            this.setState({
                selectedMood: 'Happy'
            }, () => { this.props.saveTodaysMood(this.state.selectedMood) })
        } else {
            this.setState({
                selectedMood: ''
            }, () => this.props.removeMood())
        }

    }
    setMoodContent = () => {
        if (this.state.selectedMood !== 'Content') {
            this.setState({
                selectedMood: 'Content'
            }, () => { this.props.saveTodaysMood(this.state.selectedMood) })
        } else {
            this.setState({
                selectedMood: ''
            }, () => this.props.removeMood())
        }
    }
    setMoodUpset = () => {
        if (this.state.selectedMood !== 'Upset') {
            this.setState({
                selectedMood: 'Upset'
            }, () => { this.props.saveTodaysMood(this.state.selectedMood) })
        } else {
            this.setState({
                selectedMood: ''
            }, () => this.props.removeMood())
        }
    }
    setMoodTired = () => {
        if (this.state.selectedMood !== 'Tired') {
            this.setState({
                selectedMood: 'Tired'
            }, () => { this.props.saveTodaysMood(this.state.selectedMood) })
        } else {
            this.setState({
                selectedMood: ''
            }, () => this.props.removeMood())
        }
    }
    setMoodAngry = () => {
        if (this.state.selectedMood !== 'Angry') {
            this.setState({
                selectedMood: 'Angry'
            }, () => { this.props.saveTodaysMood(this.state.selectedMood) })
        } else {
            this.setState({
                selectedMood: ''
            }, () => this.props.removeMood())
        }
    }
    moodChecker = (mood) => {
        if (mood === 'Amused') {
            return (<div className='public-entries-mood-container' style={{ display: 'flex', justifyContent: 'spaceBetween', alignItems: 'center', justifyContent: 'center' }}>Today's Mood<div className='public-mood-icon'><i className="far fa-laugh-squint" title='Amused' onClick={this.setMoodAmused} /></div></div>)
        } else if (mood === 'Happy') {
            return (<div className='public-entries-mood-container' style={{ display: 'flex', justifyContent: 'spaceBetween', alignItems: 'center', justifyContent: 'center' }}>Today's Mood<div className='public-mood-icon'><i className="far fa-grin" title='Happy' onClick={this.setMoodAmused} /></div></div>)
        } else if (mood === 'Content') {
            return (<div className='public-entries-mood-container' style={{ display: 'flex', justifyContent: 'spaceBetween', alignItems: 'center', justifyContent: 'center' }}>Today's Mood<div className='public-mood-icon'><i className="far fa-meh" title='Content' onClick={this.setMoodAmused} /></div></div>)
        } else if (mood === 'Upset') {
            return (<div className='public-entries-mood-container' style={{ display: 'flex', justifyContent: 'spaceBetween', alignItems: 'center', justifyContent: 'center' }}>Today's Mood<div className='public-mood-icon'><i className="far fa-frown" title='Upset' onClick={this.setMoodAmused} /></div></div>)
        } else if (mood === 'Tired') {
            return (<div className='public-entries-mood-container' style={{ display: 'flex', justifyContent: 'spaceBetween', alignItems: 'center', justifyContent: 'center' }}>Today's Mood<div className='public-mood-icon'><i className="far fa-tired" title='Tired' onClick={this.setMoodAmused} /></div></div>)
        } else if (mood === 'Angry') {
            return (<div className='public-entries-mood-container' style={{ display: 'flex', justifyContent: 'spaceBetween', alignItems: 'center', justifyContent: 'center' }}>Today's Mood<div className='public-mood-icon'><i className="far fa-angry" title='Angry' onClick={this.setMoodAmused} /></div></div>)
        } else (console.log('No mood to display'))
    }
    togglePublicPosts = () => {
        let { viewPublicPosts } = this.state
        let { publicPosts } = this.props.entry
        this.props.getAllPublicPosts()
        console.log('actual public posts:', publicPosts)
        this.setState({
            viewPublicPosts: !viewPublicPosts
        })
    }
    render() {
        let { initTasks, completedTasks, imageOfDay, mode, gifSearchToggled, urlBarToggled, readyToUpload, todaysPost, completedCount, selectedMood, viewPublicPosts, postedToday } = this.state
        let { user, scoreStreak, streakAddedToday } = this.props.user
        let { posted_today } = user
        let { posts, publicPosts } = this.props.entry
        let date = new Date().toDateString()
        if (!user.loggedIn) {
            this.setState({ postedToday: false })
        }




        // this.props.getUserScores()
        console.log(user)
        console.log(posts)

        if (posted_today && posts.length && posts[posts.length - 1].date_posted !== date) {
            if (mode === 'taskList') {
                return (<div className='list-style'>
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
                </div >)
            }
            if (mode === 'entryQuestion') {
                return (
                    <div className='entryStep-style'>
                        <header className='list-header'>
                            {completedCount === 0 ? (<h1>No tasks were completed..</h1>) : <h1>Way to go, {this.props.user.user.firstName}! You completed {completedCount === 1 ? (`${completedCount} task!`) : (`${completedCount} tasks!`)}</h1>}
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
            }
            if (mode === 'imageQuestion') {
                return (
                    <div className='imageStep-style'>
                        <div>
                            <header className='list-header image-header'>
                                <h1>Pick a photo of the day</h1>
                            </header>
                            <div className='wrapper' id='list-header'>
                                <div className='upload-img-preview'>
                                    <div className='image-method-container'>
                                        <div className='gif-icon'>
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
                                        <Tenor token="BH9EX9JC7WAE" onSelect={result => this.setState({ imageOfDay: result.media[0].gif.url })} />
                                    </section>) : null}
                                    {urlBarToggled ? (<section className='url-search'>
                                        <input type='text' placeholder='Image URL' onChange={(e) => this.handleImageUrl(e.target.value)} /></section>) : null}
                                    <section className='image-of-day-container'>
                                        <img src={imageOfDay} alt='Preview Imagery' />
                                        {!urlBarToggled && !gifSearchToggled ? (<p> Pick a mood</p>) : null}
                                        <div className='mood-picker-container'>
                                            {selectedMood === 'Amused' ? (<div className='mood-icon '><i className="far fa-laugh-squint selected" title='Amused' onClick={this.setMoodAmused} /></div>) : (<div className='mood-icon'><i className="far fa-laugh-squint" title='Amused' onClick={this.setMoodAmused} /></div>)}
                                            {selectedMood === 'Happy' ? (<div className='mood-icon '><i className="far fa-grin-alt selected" title='Happy' onClick={this.setMoodHappy} /></div>) : (<div className='mood-icon'><i className="far fa-grin-alt" title='Happy' onClick={this.setMoodHappy} /></div>)}
                                            {selectedMood === 'Content' ? (<div className='mood-icon '><i className="far fa-meh selected" title='Content' onClick={this.setMoodContent} /></div>) : (<div className='mood-icon'><i className="far fa-meh" title='Content' onClick={this.setMoodContent} /></div>)}
                                            {selectedMood === 'Upset' ? (<div className='mood-icon '><i className="far fa-frown selected" title='Upset' onClick={this.setMoodUpset} /></div>) : (<div className='mood-icon'><i className="far fa-frown" title='Upset' onClick={this.setMoodUpset} /></div>)}
                                            {selectedMood === 'Tired' ? (<div className='mood-icon '><i className="far fa-tired selected" title='Tired' onClick={this.setMoodTired} /></div>) : (<div className='mood-icon'><i className="far fa-tired" title='Tired' onClick={this.setMoodTired} /></div>)}
                                            {selectedMood === 'Angry' ? (<div className='mood-icon'><i className="far fa-angry selected" title='Angry' onClick={this.setMoodAngry} /></div>) : (<div className='mood-icon'><i className="far fa-angry" title='Angry' onClick={this.setMoodAngry} /></div>)}
                                        </div>

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
        } else if (posted_today) {
            return (

                <div className='posted-style'>
                    {!viewPublicPosts ? (<div><header className='list-header'>
                        <h1>Great job, {user.firstName}!</h1>
                        {/* <h4>Score Streak: {scoreStreak}</h4> */}
                    </header>
                        <section className='posted-message'><h2>Come back tomorrow to post again!</h2></section>

                        <div className='posted-button-container'>
                            <Link className='view-post-btn' onClick={this.saveEntry} to='/entries'>View my posts!</Link>
                            <Link className='view-post-btn' onClick={this.togglePublicPosts}>View public posts</Link>
                        </div></div>) : (<div><div id='exit-posts-view'><i className="fas fa-home" onClick={this.togglePublicPosts} /></div><div className='public-posts-master' style={{ height: '100%', width: '100%' }}>{this.props.entry.publicPosts && this.props.entry.publicPosts.length ? publicPosts.map((post, i) => {
                            return (

                                <div style={{ margin: '0px 10px 0px 10px', padding: '20px' }} className='public-entry-preview' key={i}>
                                    <div id='public-entry-date'>
                                        <div>{post.date_posted}</div>
                                        <div className='img-username-div'>
                                            <div><img src={post.profile_image} /></div>
                                            <div>{post.username}</div>
                                        </div>
                                    </div>
                                    <div className='public-post-container'>
                                        <div className='image-tasks-container' >
                                            <section id='public-image-of-day'>
                                                <section style={{ height: '90%' }}>
                                                    <header className='post-titles-header'><h4><i><b>Image of the Day </b></i></h4></header>
                                                    <img src={post.image} alt='Preview Imagery' style={{ transform: 'scale(1.05)' }} />
                                                    {post.mood && post.mood.length > 0 ? (this.moodChecker(post.mood)) : null}
                                                </section>
                                            </section>
                                            <div id='completed-task-preview' style={{ marginTop: '20px' }}>
                                                <header id='completed-tasks-header'>
                                                    <i className='icon far fa-check-square checkIcon' /><h5> Completed Tasks </h5>  <i className='icon far fa-check-square checkIcon' />
                                                </header>

                                                {post.task_1 ? (<div className='public-task-item'> {post.task_1}</div>) : null}
                                                {post.task_2 ? (<div className='public-task-item'>{post.task_2}</div>) : null}
                                                {post.task_3 ? (<div className='public-task-item'> {post.task_3}</div>) : null}
                                                {post.task_4 ? (<div className='public-task-item'> {post.task_4}</div>) : null}
                                                {post.task_5 ? (<div className='public-task-item'> {post.task_5}</div>) : null}
                                                {/* {completedTasks.map((taskItem, i) =>
                                                    <div className='task-container'
                                                        key={i}>

                                                        {taskItem ? <div className='preview-task-item' >{taskItem}</div> : null}

                                                    </div>)} */}

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
                        }) : null}</div></div>)}

                </div >
            )
        } else if (postedToday) {
            return (

                <div className='posted-style'>
                    {!viewPublicPosts ? (<div><header className='list-header'>
                        <h1>Great job, {user.firstName}!</h1>
                        {/* <h4>Score Streak: {scoreStreak}</h4> */}
                    </header>
                        <section className='posted-message'><h2>Come back tomorrow to post again!</h2></section>

                        <div className='posted-button-container'>
                            <Link className='view-post-btn' onClick={this.saveEntry} to='/entries'>View my posts!</Link>
                            <button className='view-post-btn' onClick={this.togglePublicPosts}>View Public Posts</button>
                        </div></div>) : (<div><div id='exit-posts-view'><i className="fas fa-home" onClick={this.togglePublicPosts} /></div><div className='public-posts-master' style={{ height: '100%', width: '100%' }}>{this.props.entry.publicPosts && this.props.entry.publicPosts.length ? publicPosts.map((post, i) => {
                            return (

                                <div style={{ margin: '0px 10px 0px 10px', padding: '20px' }} className='public-entry-preview' key={i}>
                                    <div id='public-entry-date'>
                                        <div>{post.date_posted}</div>
                                        <div className='img-username-div'>
                                            <div><img src={post.profile_image} /></div>
                                            <div>{post.username}</div>
                                        </div>
                                    </div>
                                    <div className='public-post-container'>
                                        <div className='image-tasks-container' >
                                            <section id='public-image-of-day'>
                                                <section style={{ height: '90%' }}>
                                                    <header className='post-titles-header'><h4><i><b>Image of the Day </b></i></h4></header>
                                                    <img src={post.image} alt='Preview Imagery' style={{ transform: 'scale(1.05)' }} />
                                                    {post.mood && post.mood.length > 0 ? (this.moodChecker(post.mood)) : null}
                                                </section>
                                            </section>
                                            <div id='completed-task-preview' style={{ marginTop: '20px' }}>
                                                <header id='completed-tasks-header'>
                                                    <i className='icon far fa-check-square checkIcon' /><h5> Completed Tasks </h5>  <i className='icon far fa-check-square checkIcon' />
                                                </header>

                                                {post.task_1 ? (<div className='public-task-item'> {post.task_1}</div>) : null}
                                                {post.task_2 ? (<div className='public-task-item'>{post.task_2}</div>) : null}
                                                {post.task_3 ? (<div className='public-task-item'> {post.task_3}</div>) : null}
                                                {post.task_4 ? (<div className='public-task-item'> {post.task_4}</div>) : null}
                                                {post.task_5 ? (<div className='public-task-item'> {post.task_5}</div>) : null}
                                                {/* {completedTasks.map((taskItem, i) =>
                                                    <div className='task-container'
                                                        key={i}>

                                                        {taskItem ? <div className='preview-task-item' >{taskItem}</div> : null}

                                                    </div>)} */}

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
                        }) : null}</div></div>)}

                </div >
            )
        } else if (!posted_today) {
            if (mode === 'taskList' && !posted_today) {
                return (<div className='list-style'>
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
                </div >)
            }
            if (!posted_today && mode === 'entryQuestion') {
                return (
                    <div className='entryStep-style'>
                        <header className='list-header'>
                            {completedCount === 0 ? (<h1>No tasks were completed..</h1>) : <h1>Way to go, {this.props.user.user.firstName}! You completed {completedCount === 1 ? (`${completedCount} task!`) : (`${completedCount} tasks!`)}</h1>}
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
            }
            if (!posted_today && mode === 'imageQuestion') {
                return (
                    <div className='imageStep-style'>
                        <div>
                            <header className='list-header image-header'>
                                <h1>Pick a photo of the day</h1>
                            </header>
                            <div className='wrapper' id='list-header'>
                                <div className='upload-img-preview'>

                                    <section className='image-of-day-container'>
                                        <div className='image-method-container'>
                                            <div className='gif-icon'>
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
                                            <Tenor token="BH9EX9JC7WAE" onSelect={result => this.setState({ imageOfDay: result.media[0].gif.url })} />
                                        </section>) : null}
                                        {urlBarToggled ? (<section className='url-search'>
                                            <input type='text' placeholder='Image URL' onChange={(e) => this.handleImageUrl(e.target.value)} /></section>) : null}
                                        <img src={imageOfDay} alt='Preview Imagery' />
                                        {!urlBarToggled && !gifSearchToggled ? (<p> Pick a mood</p>) : null}
                                        <div className='mood-picker-container'>
                                            {selectedMood === 'Amused' ? (<div className='mood-icon '><i className="far fa-laugh-squint selected" title='Amused' onClick={this.setMoodAmused} /></div>) : (<div className='mood-icon'><i className="far fa-laugh-squint" title='Amused' onClick={this.setMoodAmused} /></div>)}
                                            {selectedMood === 'Happy' ? (<div className='mood-icon '><i className="far fa-grin-alt selected" title='Happy' onClick={this.setMoodHappy} /></div>) : (<div className='mood-icon'><i className="far fa-grin-alt" title='Happy' onClick={this.setMoodHappy} /></div>)}
                                            {selectedMood === 'Content' ? (<div className='mood-icon '><i className="far fa-meh selected" title='Content' onClick={this.setMoodContent} /></div>) : (<div className='mood-icon'><i className="far fa-meh" title='Content' onClick={this.setMoodContent} /></div>)}
                                            {selectedMood === 'Upset' ? (<div className='mood-icon '><i className="far fa-frown selected" title='Upset' onClick={this.setMoodUpset} /></div>) : (<div className='mood-icon'><i className="far fa-frown" title='Upset' onClick={this.setMoodUpset} /></div>)}
                                            {selectedMood === 'Tired' ? (<div className='mood-icon '><i className="far fa-tired selected" title='Tired' onClick={this.setMoodTired} /></div>) : (<div className='mood-icon'><i className="far fa-tired" title='Tired' onClick={this.setMoodTired} /></div>)}
                                            {selectedMood === 'Angry' ? (<div className='mood-icon'><i className="far fa-angry selected" title='Angry' onClick={this.setMoodAngry} /></div>) : (<div className='mood-icon'><i className="far fa-angry" title='Angry' onClick={this.setMoodAngry} /></div>)}
                                        </div>

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
            } else if (!posts.length) {
                return (<div className='list-style'>
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
                </div >)
            }
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
    { saveTasks, getPosts, saveEntry, savePostDate, saveImageOfDay, saveTodaysMood, removeMood, addToStreak, removeStreak, getUser, getUserScores, removeStreakBlocker, getAllPublicPosts, postedTodayOff, saveInitialTasks }
)(Step1);

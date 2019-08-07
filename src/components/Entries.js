import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { getUser, levelUp, getUserScores } from '../redux/userReducer'
import { getPosts, editPost, editPostImage, editPostEntry, deletePost, setPostPublic, setPostPrivate } from '../redux/entryReducer'
import firebase from 'firebase'
import FileUploader from 'react-firebase-file-uploader'
import { toast } from 'react-toastify';
import { css } from 'glamor'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Tenor from 'react-tenor'
import DateTime from './DateTime'
import axios from 'axios';
const parse = require('html-react-parser')

class Entries extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: 1,
            i: 0,
            listId: '',
            editing: false,
            editingEntry: false,
            editingImage: false,
            newEntry: '',
            newImage: '',
            newTask1: '',
            newTask2: '',
            newTask3: '',
            newTask4: '',
            newTask5: '',
            userId: this.props.user.user.id,
            gifSearchToggled: false,
            urlBarToggled: false,
            postCycle: false
        }
        this.deleteEntry = this.deleteEntry.bind(this)
    }
    componentDidMount() {
        let { user, currentLevel, currentXp } = this.props.user
        let { posts } = this.props.entry
        if (posts && posts.length && posts.length > 1) {
            this.setState({
                i: posts.length - 1
            })
        }
        if (!user.loggedIn) {
            this.props.getUser();
            console.log('Got User!')
        }
        this.props.getUserScores()
        if (+currentXp >= 100 && +currentLevel === 0) {
            this.props.levelUp()
            this.notifyLevelUp()
        } else if (+currentXp >= 200 && +currentLevel === 1) {
            this.props.levelUp()
            this.notifyLevelUp()
        } else if (currentXp >= 300 && +currentLevel === 2) {
            this.props.levelUp()
            this.notifyLevelUp()
        } else if (+currentXp >= 400 && +currentLevel === 3) {
            this.props.levelUp()
            this.notifyLevelUp()
        } else if (+currentXp >= 500 && +currentLevel === 4) {
            this.props.levelUp()
            this.notifyLevelUp()
        } else if (+currentXp >= 600 && +currentLevel === 5) {
            this.props.levelUp()
            this.notifyLevelUp()
        } else if (+currentXp >= 700 && +currentLevel === 6) {
            this.props.levelUp()
            this.notifyLevelUp()
        } else if (+currentXp >= 800 && +currentLevel === 7) {
            this.props.levelUp()
            this.notifyLevelUp()
        } else if (+currentXp >= 900 && +currentLevel === 8) {
            this.props.levelUp()
            this.notifyLevelUp()
        } else if (+currentXp >= 1000 && +currentLevel === 9) {
            this.props.levelUp()
            this.notifyLevelUp()

        } else if (+currentXp >= 1100 && +currentLevel === 10) {
            this.props.levelUp()
            this.notifyLevelUp()

        } else if (+currentXp >= 1200 && +currentLevel === 11) {
            this.props.levelUp()
            this.notifyLevelUp()
        } else if (+currentXp >= 1300 && +currentLevel === 12) {
            this.props.levelUp()
            this.notifyLevelUp()
        } else { (console.log('Not enough XP for LVLUP!')) }
        if (!posts.length && user.loggedIn) {
            this.props.getPosts()
        }
    }
    checkKey = e => {
        let { posts } = this.props.entry
        if (posts && posts.length > 0) {
            if (e.keyCode === 39 && this.state.i < posts.length - 1) {
                let i = this.state.i + 1
                let listId = posts[i].id
                console.log(`List ID ${listId} `)

                this.setState({
                    i,
                    listId
                })
            }
        } else if (e.keyCode == '39') {
            if (e.keyCode === 39 && this.state.i < posts.length - 1) {
                let i = this.state.i + 1
                let listId = posts[i].id
                console.log(`List ID ${listId} `)

                this.setState({
                    i,
                    listId
                })
            }

        }
    }
    handleKeyNext = e => {
        let { posts } = this.props.entry
        this.animatePostCycle()
        console.log('right arrow')
        if (e.keyCode === 39 && this.state.i < posts.length - 1) {
            let i = this.state.i + 1
            let listId = posts[i].id
            console.log(`POST ID ${listId} `)

            this.setState({
                i,
                listId
            })
        }
    }

    handleKeyPrev = e => {
        let { posts } = this.props.entry
        this.animatePostCycle()
        console.log('left arrow')
        if (e.keyCode === 37 && this.state.i > 0) {
            let i = this.state.i - 1
            let listId = posts[i].id
            console.log(`POST ID ${listId} `)

            this.setState({
                i,
                listId
            })
        }
    }

    handleNext = () => {
        let { posts } = this.props.entry
        this.animatePostCycle()
        if (this.state.i < posts.length - 1) {
            let i = this.state.i + 1
            let listId = posts[i].id
            console.log(`List ID ${listId} `)

            this.setState({
                i,
                listId
            })

        }
    }
    handlePrevious = () => {
        let { posts } = this.props.entry
        this.animatePostCycle()
        if (this.state.i > 0) {
            let i = this.state.i - 1
            let listId = posts[i].id
            console.log(`List ID ${listId} `)
            this.setState({
                i,
                listId
            })
        }

    }
    animatePostCycle = () => {
        let { postCycle } = this.state
        this.setState({ postCycle: !postCycle }, () => {
            setTimeout(
                function () {
                    this.setState({ postCycle: false })
                }.bind(this), 200)
        })

    }
    handleEditing = () => {
        console.log('hit edit')
        this.setState({ editing: !this.state.editing })
        console.log(this.state.editing)
    }

    flipEntryEdit = () => {
        let { editingEntry } = this.state
        this.setState({ editingEntry: !editingEntry })
    }
    flipImageEdit = () => {
        let { editingImage } = this.state
        this.setState({ editingImage: !editingImage })
    }
    handleCancelEdit = () => {
        this.setState({ editing: !this.state.editing })
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({ [name]: value })
    };

    handleEntryChange = newEntry => {
        this.setState({ newEntry })
    }

    handleImageChange = newImage => {
        this.setState({ newImage })
        console.log(this.state.newImage);
    }
    fileUploadHandler = (filename) => {
        firebase.storage().ref('entryImages').child(filename).getDownloadURL()
            .then(url => this.setState({
                newImage: url
            }))
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
    moodChecker = (i) => {
        let { posts } = this.props.entry
        let mood = posts[i].mood
        if (mood === 'Amused') {
            return (<div className='entries-mood-container' style={{ display: 'flex', justifyContent: 'spaceBetween', alignItems: 'center', justifyContent: 'center' }}>Today's Mood<div className='mood-icon'><i className="far fa-laugh-squint" title='Amused' onClick={this.setMoodAmused} /></div></div>)
        } else if (mood === 'Happy') {
            return (<div className='entries-mood-container' style={{ display: 'flex', justifyContent: 'spaceBetween', alignItems: 'center', justifyContent: 'center' }}>Today's Mood<div className='mood-icon'><i className="far fa-grin" title='Happy' onClick={this.setMoodAmused} /></div></div>)
        } else if (mood === 'Content') {
            return (<div className='entries-mood-container' style={{ display: 'flex', justifyContent: 'spaceBetween', alignItems: 'center', justifyContent: 'center' }}>Today's Mood<div className='mood-icon'><i className="far fa-meh" title='Content' onClick={this.setMoodAmused} /></div></div>)
        } else if (mood === 'Upset') {
            return (<div className='entries-mood-container' style={{ display: 'flex', justifyContent: 'spaceBetween', alignItems: 'center', justifyContent: 'center' }}>Today's Mood<div className='mood-icon'><i className="far fa-frown" title='Upset' onClick={this.setMoodAmused} /></div></div>)
        } else if (mood === 'Tired') {
            return (<div className='entries-mood-container' style={{ display: 'flex', justifyContent: 'spaceBetween', alignItems: 'center', justifyContent: 'center' }}>Today's Mood<div className='mood-icon'><i className="far fa-tired" title='Tired' onClick={this.setMoodAmused} /></div></div>)
        } else if (mood === 'Angry') {
            return (<div className='entries-mood-container' style={{ display: 'flex', justifyContent: 'spaceBetween', alignItems: 'center', justifyContent: 'center' }}>Today's Mood<div className='mood-icon'><i className="far fa-angry" title='Angry' onClick={this.setMoodAmused} /></div></div>)
        } else (console.log('No mood to display'))
    }
    saveChanges = () => {
        let { i, newEntry, newImage, newTask1, newTask2, newTask3, newTask4, newTask5 } = this.state
        let { posts } = this.props.entry
        let postId = posts[i].id
        if (newEntry === '' || newEntry === ' ' || newEntry === '   ') {
            this.setState({ newEntry: posts[i].entry })
        }
        if (newImage === '' || newImage === ' ' || newImage === '   ') {
            this.setState({ newImage: posts[i].image })
        }
        if (newTask1 === '' || newTask1 === ' ' || newTask1 === '   ') {
            this.setState({ newTask1: posts[i].task_1 })
        }
        if (newTask2 === '' || newTask2 === ' ' || newTask2 === '   ') {
            this.setState({ newTask2: posts[i].task_2 })
        }
        if (newTask3 === '' || newTask3 === ' ' || newTask3 === '   ') {
            this.setState({ newTask3: posts[i].task_3 })
        }
        if (newTask4 === '' || newTask4 === ' ' || newTask4 === '   ') {
            this.setState({ newTask4: posts[i].task_4 })
        }
        if (newTask5 === '' || newTask5 === ' ' || newTask5 === '   ') {
            this.setState({ newTask5: posts[i].task_5 })
        }
        this.props.editPost(postId, newEntry, newImage, newTask1, newTask2, newTask3, newTask4, newTask5)
        this.setState({ editing: !this.state.editing })
    }
    notifyLevelUp = () => toast('DING! You leveled up!', {
        className: css({
            background: "rgba(0,0,0,0.6) !important",
            color: '#fff !important'

        }),
        position: toast.POSITION.BOTTOM_RIGHT,
        toastClassName: "dark-toast"
    })
    notifyPublic = () => toast("Post is now public.", {
        className: css({
            background: "rgba(0,0,0,0.6) !important",
            color: '#fff !important'
        }),
        position: toast.POSITION.BOTTOM_RIGHT,
        toastClassName: "dark-toast"
    })
    notifyPrivate = () => toast("Post is now private.", {
        className: css({
            background: "rgba(0,0,0,0.6) !important",
            color: '#fff !important'
        }),
        position: toast.POSITION.BOTTOM_RIGHT,
        toastClassName: "dark-toast"
    })
    makePostPublic = () => {
        let { i } = this.state
        let { posts } = this.props.entry
        let postId = posts[i].id
        this.props.setPostPublic(postId)
        this.notifyPublic()
    }
    makePostPrivate = () => {
        let { i } = this.state
        let { posts } = this.props.entry
        let postId = posts[i].id
        this.props.setPostPrivate(postId)
        this.notifyPrivate()
    }

    saveEntryChanges = () => {
        let { i, newEntry, editingEntry } = this.state
        let { posts } = this.props.entry
        let postId = posts[i].id
        this.props.editPostEntry(postId, newEntry)
        this.setState({ editingEntry: !editingEntry })
    }

    saveImageChanges = () => {
        let { i, newImage, editingImage } = this.state
        let { posts } = this.props.entry
        let postId = posts[i].id
        this.props.editPostImage(postId, newImage)
        this.setState({ editingImage: !editingImage })
    }

    deleteEntry(i) {
        let { posts } = this.props.entry
        let postId = posts[i].id
        console.log('Post ID to be Deleted', postId)
        this.props.deletePost(+postId)
        if (i === 0) {
            this.setState({
                // i: this.state.list.length - 2
                i: posts.length - 1
            })
        } else {
            this.setState({
                i: this.state.i - 1
            })
        }
    }


    readEntry(i) {
        let { list, editing, editingEntry, editingImage, newImage, gifSearchToggled, urlBarToggled } = this.state
        let { posts } = this.props.entry
        let faderClass = this.state.postCycle ? 'hideMe' : ''
        if (posts && posts.length > 0 && posts[i].image && newImage === '') { newImage = posts[i].image }
        let completedTasks = []
        if (posts && posts.length > 0 && posts[i].task_1) { (completedTasks.push(posts[i].task_1, posts[i].task_2, posts[i].task_3, posts[i].task_4, posts[i].task_5)) }
        return (
            <section className='entries-display-container'>
                {/* <DateTime user={this.props.user.user} /> */}
                <section className='entry-container-preview'>
                    {editing ? (
                        <div id='entry-preview' className={faderClass}>

                            <div id='entry-date'>
                                {posts[i].date_posted}
                                <div> {+i + 1}/{posts.length}</div>
                            </div>
                            <div className='post-container'>
                                <div className='image-tasks-container'>
                                    <section id='image-of-day'>
                                        <div className='wrapper' id='list-header'>
                                            <div className='entry-upload-img-preview'>
                                                <div className='entry-image-method-container'>

                                                    <div className='entry-edit-gif-icon'>
                                                        <button onClick={this.handleGifSearchToggle}>GIF</button>
                                                    </div>
                                                    <div className='entry-edit-url-icon'>
                                                        <i className="fas fa-link" onClick={this.handleUrlBarToggle} />
                                                    </div>
                                                    <div className='entry-edit-url-icon'>
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
                                                    <Tenor token="BH9EX9JC7WAE" onSelect={result => this.setState({ newImage: result.media[0].gif.url })} />
                                                </section>) : null}
                                                {/* <p>Image URL: </p> */}
                                                {urlBarToggled ? (<section className='url-search'>
                                                    <input type='text' defaultValue={posts[i].image} name='newImage' onChange={this.handleChange} /></section>) : null}
                                                <section>
                                                    <img src={newImage} alt='Preview Imagery' />
                                                </section>
                                            </div>
                                        </div >
                                    </section>
                                    <div id='completed-task-preview-editing'>
                                        <header id='completed-tasks-header'>
                                            <i className='icon far fa-check-square checkIcon' /><h3> Completed Tasks </h3>  <i className='icon far fa-check-square checkIcon' />
                                        </header>
                                        <div className='task-containrer'><div className='preview-task-item'><input defaultValue={posts[i].task_1} onChange={this.handleChange} name='newTask1' className='task-update-input' /></div></div>
                                        <div className='task-containrer'><div className='preview-task-item'><input defaultValue={posts[i].task_2} onChange={this.handleChange} name='newTask2' className='task-update-input' /></div></div>
                                        <div className='task-containrer'><div className='preview-task-item'><input defaultValue={posts[i].task_3} onChange={this.handleChange} name='newTask3' className='task-update-input' /></div></div>
                                        <div className='task-containrer'><div className='preview-task-item'><input defaultValue={posts[i].task_4} onChange={this.handleChange} name='newTask4' className='task-update-input' /></div></div>
                                        <div className='task-containrer'><div className='preview-task-item'><input defaultValue={posts[i].task_5} onChange={this.handleChange} name='newTask5' className='task-update-input' /></div></div>
                                    </div>
                                </div>
                                <div id='entry-of-day-preview'>
                                    <header className='post-titles-header'><h3 id='entry-of-day-header-preview'><u>Additional Thoughts</u></h3></header>
                                    <div id='editing-entry-of-day-text-preview' >
                                        <div className='edit-entry-quill-container'>
                                            <ReactQuill defaultValue={posts[i].entry} onChange={this.handleEntryChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="edit-middle-buttons">
                                    {/* <div className='edit-all-icons'><i className="far fa-save" onClick={this.saveChanges} /></div> */}
                                    <button className="buttons" style={{ margin: '0px !important' }} onClick={() => this.handleCancelEdit()} >Go Back</button>
                                    <button className="buttons" style={{ margin: '0px !important' }} onClick={this.saveChanges}>Save</button>
                                    {/* <div className='edit-all-icons'><i class="fas fa-times" onClick={() => this.handleCancelEdit()} /></div> */}
                                </div>
                            </div>



                        </div>
                    ) : (
                            <div id='entry-preview' onKeyDown={(e) => this.checkKey(e)} className={faderClass}>
                                <div id='entry-date'>
                                    {posts[i].date_posted}
                                    {!posts[i].public ? (<div className='globe-container'><i className="fas fa-globe" title='Post is private!' style={{ fontSize: '20px', cursor: 'pointer' }} onClick={this.makePostPublic} /></div>) : <div className='globe-container'><i className="fas fa-globe selected" title='Post is public!' style={{ fontSize: '20px', cursor: 'pointer' }} onClick={this.makePostPrivate} /></div>}

                                    <div> {+i + 1}/{posts.length}</div>
                                </div>
                                <div className='post-container'>
                                    <div className='image-tasks-container'>
                                        <section id='image-of-day'>
                                            {/* {!editingImage ? (<header className='post-titles-header'><h3><i><b>Image of the Day </b></i><i className="fas fa-edit" onClick={this.flipImageEdit} /></h3></header>) : null} */}
                                            {editingImage ? (
                                                <div className='wrapper' id='list-header'>
                                                    <div className='entry-upload-img-preview'>
                                                        <div className='image-method-container'>
                                                            <div className='url-icon'>
                                                                <i className="far fa-save" onClick={this.saveImageChanges} />
                                                            </div>
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
                                                            <div className='url-icon'>

                                                                <i class="fas fa-times" onClick={this.flipImageEdit} />
                                                            </div>
                                                        </div>
                                                        {gifSearchToggled ? (<section className='tenor-search'>
                                                            <Tenor token="BH9EX9JC7WAE" onSelect={result => this.setState({ newImage: result.media[0].gif.url })} />
                                                        </section>) : null}
                                                        {/* <p>Image URL: </p> */}
                                                        {urlBarToggled ? (<section className='url-search'>
                                                            <input type='text' defaultValue={posts[i].image} name='newImage' onChange={this.handleChange} /></section>) : null}
                                                        <section className='image-of-day-container'>
                                                            <img src={newImage} alt='Preview Imagery' />
                                                        </section>
                                                    </div>
                                                </div >
                                            ) : (<section style={{ height: '90%' }}>
                                                <header className='post-titles-header'><h3><i><b>Image of the Day </b></i><i className="fas fa-edit" onClick={this.flipImageEdit} /></h3></header>
                                                <img src={posts[i].image} alt='Preview Imagery' style={{ transform: 'scale(1.1)' }} />
                                                {posts[i].mood && posts[i].mood.length > 0 ? (this.moodChecker(i)) : <div style={{ height: '27px' }}></div>}
                                            </section>)}
                                        </section>
                                        <div id='completed-task-preview'>
                                            <header id='completed-tasks-header'>
                                                <i className='icon far fa-check-square checkIcon' /><h3> Completed Tasks </h3>  <i className='icon far fa-check-square checkIcon' />
                                            </header>

                                            {completedTasks.map((taskItem, i) =>
                                                <div className='task-container'
                                                    key={i}>

                                                    {taskItem ? <div className='preview-task-item' >{taskItem}</div> : null}

                                                </div>)}

                                        </div>
                                    </div>
                                    {/* <textarea wrap='soft' id='update-thought' defaultValue={list[i].thought} onChange={(e) => this.handleChange(e.target.value)} onKeyDown={this.handleEditingDone} /> */}

                                    <div id='entry-of-day-preview'>
                                        <header className='post-titles-header'><h3 id='entry-of-day-header-preview'><u>Additional Thoughts</u> {!editingEntry ? (<i className="fas fa-edit" onClick={this.flipEntryEdit} />) : (<div className='save-delete-container'><i className="far fa-save" onClick={this.saveEntryChanges} /><i class="fas fa-times" onClick={this.flipEntryEdit} /></div>)} </h3></header>
                                        <div id='entry-of-day-text-preview' >

                                            {editingEntry ? (<div className='edit-entry-quill-container'>
                                                <ReactQuill defaultValue={posts[i].entry} onChange={this.handleEntryChange} />
                                            </div>) : (
                                                    // <div>{parse(posts[i].entry)}</div>
                                                    <div className='edit-entry-quill-container'>
                                                        <ReactQuill value={posts[i].entry} onKeyPress={this.flipEntryEdit} />
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                </div>

                                <div className="entry-button-row"  >
                                    <button className="nextPrev" onClick={this.handlePrevious} onKeyDown={this.handleKeyPrev}>{'< Previous'}</button>
                                    <div className="middle-buttons">
                                        <button className="buttons" onClick={this.handleEditing}>Edit All</button>
                                        <button className="buttons" onClick={() => this.deleteEntry(i)} >Delete</button>
                                    </div>
                                    <button className="nextPrev" onClick={this.handleNext} onKeyDown={this.handleKeyNext}>{'Next >'}</button>

                                </div>

                            </div>
                        )}
                </section>
            </section>

        )

    }

    render() {
        let { user, error, redirect } = this.props.user;
        let { posts } = this.props.entry
        let { i } = this.state
        if (error || redirect) return <Redirect to="/login" />;
        if (!user.loggedIn) return <div>Loading</div>;
        if (posts.length === 0) {
            this.props.getPosts(user.id)
        }

        return (

            <section id='entryDiv'>
                {posts.length > 0 ? this.readEntry(i) : <div className='noPosts'>No posts to show!</div>}
            </section>

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
    { getUser, getPosts, editPost, editPostImage, editPostEntry, deletePost, levelUp, getUserScores, setPostPublic, setPostPrivate }
)(Entries);
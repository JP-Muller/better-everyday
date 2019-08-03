import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { getUser, levelUp } from '../redux/userReducer'
import { getPosts, editPost, editPostImage, editPostEntry, deletePost } from '../redux/entryReducer'
import firebase from 'firebase'
import FileUploader from 'react-firebase-file-uploader'
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
        }
        this.deleteEntry = this.deleteEntry.bind(this)
    }

    componentDidMount() {
        let { user } = this.props.user
        let { posts } = this.props.entry
        if (!user.loggedIn) {
            this.props.getUser();
            console.log('Got User!')
        }
        if (user.xp >= 100 && +user.level === 0) {
            this.props.levelUp()
        } else if (user.xp >= 200 && +user.level === 1) {
            this.props.levelUp()
        } else if (user.xp >= 300 && +user.level === 2) {
            this.props.levelUp()
        } else if (user.xp >= 400 && +user.level === 3) {
            this.props.levelUp()
        } else if (user.xp >= 500 && user.level === 4) {
            this.props.levelUp()
        } else if (user.xp >= 600 && user.level === 5) {
            this.props.levelUp()
        } else if (user.xp >= 700 && user.level === 6) {
            this.props.levelUp()
        } else if (user.xp >= 800 && user.level === 7) {
            this.props.levelUp()
        } else if (user.xp >= 900 && user.level === 8) {
            this.props.levelUp()
        } else if (user.xp >= 1000 && user.level === 9) {
            this.props.levelUp()
        } else if (user.xp >= 1100 && user.level === 10) {
            this.props.levelUp()
        } else if (user.xp >= 1200 && user.level === 11) {
            this.props.levelUp()
        } else if (user.xp >= 1300 && user.level === 12) {
            this.props.levelUp()
        } else { (console.log('Player Maxed')) }
        if (!posts.length && user.loggedIn) {
            this.props.getPosts()
        }
    }

    componentDidUpdate(prevProps) {
        let { title, content } = prevProps;
        if (title !== this.props.title || content !== this.props.content) {
            this.setState({
                newTitle: title,
                newContent: content,
                editing: false
            });
        }
    }
    handleKeyNext = e => {
        let { posts } = this.props.entry
        console.log('right arrow')
        // if (e.keyCode === 39) {
        //     this.handleNext()
        // }
        if (e.keyCode === 39 && this.state.i < posts.length - 1) {
            let i = this.state.i + 1
            let listId = posts[i].id
            console.log(`List ID ${listId} `)

            this.setState({
                i,
                listId
            })
            console.log(this.state.i)
        }
    }

    handleKeyPrev = e => {
        let { posts } = this.props.entry
        console.log('left arrow')
        if (e.keyCode === 37 && this.state.i > 0) {
            let i = this.state.i - 1
            let listId = posts[i].id
            console.log(`List ID ${listId} `)
            console.log(this.state.i)

            this.setState({
                i,
                listId
            })
        }
    }

    handleNext = () => {
        let { posts } = this.props.entry
        if (this.state.i < posts.length - 1) {
            let i = this.state.i + 1
            let listId = posts[i].id
            console.log(`List ID ${listId} `)

            this.setState({
                i,
                listId
            })
            // this.setState({ listId })
            console.log(this.state.i)
            // console.log(this.state.list.length)
        }
    }
    handlePrevious = () => {
        let { posts } = this.props.entry
        if (this.state.i > 0) {
            let i = this.state.i - 1
            let listId = posts[i].id
            console.log(`List ID ${listId} `)
            console.log(this.state.i)

            this.setState({
                i,
                listId
            })
            // this.setState({ listId })
        }

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
    // handleEditingDone = e => {
    //     let { listId, currThought } = this.state
    //     let id = listId
    //     let thought = currThought
    //     if (e.keyCode === 13) {
    //         console.log('Finished editing')
    //         this.setState({ editing: !this.state.editing })
    //         axios
    //             .put(`/api/entries/${id}?newThought=${thought}`)
    //             .then(res => {
    //                 console.log(res.data)
    //                 this.setState({ list: res.data })
    //             })
    //             .catch(err => console.log(`Couldn't update..`, err))
    //     }
    // }

    saveChanges = () => {
        let { i, newEntry, newImage, newTask1, newTask2, newTask3, newTask4, newTask5 } = this.state
        let { posts } = this.props.entry
        let postId = posts[i].id
        this.props.editPost(postId, newEntry, newImage, newTask1, newTask2, newTask3, newTask4, newTask5)
        this.setState({ editing: !this.state.editing })
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
        if (posts[i].image && newImage === '') { newImage = posts[i].image }
        let completedTasks = []
        if (posts[i].task_1) { (completedTasks.push(posts[i].task_1, posts[i].task_2, posts[i].task_3, posts[i].task_4, posts[i].task_5)) }
        return (
            <section className='entries-display-container'>
                {/* <DateTime user={this.props.user.user} /> */}
                <section className='entry-container-preview'>
                    {editing ? (
                        <div id='entry-preview'>

                            <div id='entry-date'>
                                {posts[i].date_posted}
                                <div> {+i + 1}/{posts.length}</div>
                            </div>
                            <div className='post-container'>
                                <div className='image-tasks-container'>
                                    <section id='image-of-day'>
                                        <div className='wrapper' id='list-header'>
                                            <div className='entry-upload-img-preview'>
                                                <div className='image-method-container'>

                                                    <div className='gif-icon'>
                                                        <button onClick={this.handleGifSearchToggle}>GIF</button>
                                                    </div>
                                                    <div className='url-icon'>
                                                        <i className="fas fa-link" onClick={this.handleUrlBarToggle} />
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
                                                    <Tenor token="" onSelect={result => this.setState({ newImage: result.media[0].gif.url })} />
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
                            </div>
                            {/* <div className="entry-button-row"  > */}
                            <div className="edit-middle-buttons">
                                <button className="buttons" onClick={() => this.handleCancelEdit()} >Go Back</button>
                                <button className="buttons" onClick={this.saveChanges}>Save</button>
                            </div>
                            {/* </div> */}


                        </div>
                    ) : (
                            <div id='entry-preview'>
                                <div id='entry-date'>
                                    {posts[i].date_posted}
                                    <div> {+i + 1}/{posts.length}</div>
                                </div>
                                <div className='post-container'>
                                    <div className='image-tasks-container'>
                                        <section id='image-of-day'>
                                            {!editingImage ? (<header className='post-titles-header'><h3><i><b>Image of the Day </b></i><i className="fas fa-edit" onClick={this.flipImageEdit} /></h3></header>) : null}
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
                                                            <Tenor token="" onSelect={result => this.setState({ newImage: result.media[0].gif.url })} />
                                                        </section>) : null}
                                                        {/* <p>Image URL: </p> */}
                                                        {urlBarToggled ? (<section className='url-search'>
                                                            <input type='text' defaultValue={posts[i].image} name='newImage' onChange={this.handleChange} /></section>) : null}
                                                        <section className='image-of-day-container'>
                                                            <img src={newImage} alt='Preview Imagery' />
                                                        </section>
                                                    </div>
                                                </div >
                                            ) : (<section>

                                                <img src={posts[i].image} alt='Preview Imagery' /></section>)}
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
        if (error || redirect) return <Redirect to="/login" />;
        if (!user.loggedIn) return <div>Loading</div>;
        if (posts.length === 0) {
            this.props.getPosts(user.id)
        }
        let { i } = this.state
        console.log(user)
        console.log('posts:', posts)
        console.log({ i })

        return (

            <section id='entryDiv'>
                {posts.length > 0 ? this.readEntry(i) : null}
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
    { getUser, getPosts, editPost, editPostImage, editPostEntry, deletePost, levelUp }
)(Entries);
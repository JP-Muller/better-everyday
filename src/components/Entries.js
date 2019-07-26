import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { getUser } from '../redux/userReducer'
import { getPosts, editPost, deletePost } from '../redux/entryReducer'
import DateTime from './DateTime'
import axios from 'axios';

class Entries extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: 1,
            i: 0,
            listId: '',
            editing: false,
            newEntry: '',
            newImage: '',
            newTask1: '',
            newTask2: '',
            newTask3: '',
            newTask4: '',
            newTask5: '',
            userId: this.props.user.user.id
        }
        this.deleteEntry = this.deleteEntry.bind(this)
    }

    componentDidMount() {
        let { user } = this.props.user
        let { posts } = this.props.entry
        let userId = user.id
        if (!user.loggedIn) {
            this.props.getUser();
            console.log('Got User!')
        }
        if (!posts.length && user.loggedIn) {
            this.props.getPosts(user.id)
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

    handleCancelEdit = () => {
        this.setState({ editing: !this.state.editing })
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({ [name]: value })
    };

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
        let { list, editing, newEntry, newImage, newTask1, newTask2, newTask3, newTask4, newTask5 } = this.state
        let { posts } = this.props.entry
        return (
            <section className='dash-display-container'>
                <DateTime user={this.props.user.user} />
                <section className='entry-container-preview'>
                    {editing ? (
                        <div id='entry-preview'>
                            <h2> Post Preview </h2>
                            <hr />
                            <div id='entry-date'>
                                {posts[i].date_posted}
                                <div> {+i + 1}/{posts.length}</div>
                            </div>
                            <hr />
                            <section id='image-of-day'>
                                <h3><i><b>Image of the Day</b></i></h3>
                                <img src={posts[i].image} alt='Preview Imagery' />
                                <div>
                                    <input type='text' defaultValue={posts[i].image} name='newImage' onChange={this.handleChange} />
                                </div>
                            </section>
                            <div id='completed-task-preview'>
                                <hr />
                                <h3><i className='icon far fa-check-square checkIcon' /> <u>Completed Tasks</u> <i className='icon far fa-check-square entryIconRight' /></h3>
                                <ul id='completed-task-list-preview' key='targetTask'>
                                    <div><li> <input defaultValue={posts[i].task_1} onChange={this.handleChange} name='newTask1' className='input-row' /> </li></div>
                                    <div><li> <input defaultValue={posts[i].task_2} onChange={this.handleChange} name='newTask2' className='input-row' /> </li></div>
                                    <div><li> <input defaultValue={posts[i].task_3} onChange={this.handleChange} name='newTask3' className='input-row' /> </li></div>
                                    <div><li> <input defaultValue={posts[i].task_4} onChange={this.handleChange} name='newTask4' className='input-row' /> </li></div>
                                    <div><li> <input defaultValue={posts[i].task_5} onChange={this.handleChange} name='newTask5' className='input-row' /> </li></div>
                                </ul>
                            </div>
                            < hr />
                            <div id='entry-of-day-preview'>
                                <h3 id='entry-of-day-header-preview'><u>Additional Thoughts</u></h3>
                                <div id='entry-of-day-text-preview' >
                                    <textarea wrap='soft' id='update-thought' defaultValue={posts[i].entry} onChange={this.handleChange} name='newEntry' onKeyDown={this.handleEditingDone} />
                                </div>
                                <hr />
                            </div>
                            <div className="button-row"  >
                                <div className="middle-buttons">
                                    <button className="buttons" onClick={() => this.handleCancelEdit()} >Go Back</button>
                                    <button className="buttons" onClick={this.saveChanges}>Save</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                            <div id='entry-preview'>
                                <h2> Post Preview </h2>
                                <hr />
                                <div id='entry-date'>
                                    {posts[i].date_posted}
                                    <div> {+i + 1}/{posts.length}</div>
                                </div>
                                <hr />
                                <section id='image-of-day'>
                                    <h3><i><b>Image of the Day</b></i></h3>
                                    <img src={posts[i].image} alt='Preview Imagery' />
                                </section>
                                <div id='completed-task-preview'>
                                    <hr />
                                    <h3><i className='icon far fa-check-square checkIcon' /> <u>Completed Tasks</u> <i className='icon far fa-check-square entryIconRight' /></h3>
                                    <ul id='completed-task-list-preview' key='targetTask'>
                                        <div><li> {posts[i].task_1} </li></div>
                                        <div><li> {posts[i].task_2} </li></div>
                                        <div><li> {posts[i].task_3} </li></div>
                                        <div><li> {posts[i].task_4} </li></div>
                                        <div><li> {posts[i].task_5} </li></div>
                                    </ul>
                                </div>
                                < hr />
                                <div id='entry-of-day-preview'>
                                    <h3 id='entry-of-day-header-preview'><u>Additional Thoughts</u></h3>
                                    <div id='entry-of-day-text-preview' >

                                        {editing ? (<textarea wrap='soft' id='update-thought' defaultValue={list[i].thought} onChange={(e) => this.handleChange(e.target.value)} onKeyDown={this.handleEditingDone} />) : (
                                            <p>{posts[i].entry}</p>
                                        )}
                                    </div>
                                    <hr />
                                </div>
                                <div className="button-row"  >
                                    <button className="nextPrev" onClick={this.handlePrevious} onKeyDown={this.handleKeyPrev}>{'< Previous'}</button>
                                    <div className="middle-buttons">
                                        <button className="buttons" onClick={this.handleEditing}>Edit Thought</button>
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
        // let userId = user.id
        // console.log(userId)
        // this.setState({ userId })
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
    { getUser, getPosts, editPost, deletePost }
)(Entries);
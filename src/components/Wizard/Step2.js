import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser } from '../../redux/userReducer';
import { savePost, getPosts } from '../../redux/entryReducer'
import { postedTodayOn, changeActivity } from '../../redux/userReducer'
import ReactQuill from 'react-quill'
import axios from 'axios'
const parse = require('html-react-parser')


export class Step2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            entry: this.props.entry.entry,
            date: this.props.entry.date,
            selectedImage: null,
            imageOfDay: this.props.entry.imageOfDay,
            noTask: null,
            list: []
        }
    }
    componentDidMount() {
        axios
            .get('/api/entries')
            .then(res => {
                this.setState({ list: res.data })
                console.log(res.data)
            })
            .catch(err => {
                console.log('err from server', err)
            })
        if (!this.props.user.user.loggedIn) {
            this.props.getUser();
            console.log('Got User!')
        }
    }

    moodChecker = () => {
        let { mood } = this.props.entry
        if (mood === 'Amused') {
            return (<div className='entries-mood-container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>Today's Mood<div className='mood-icon'><i className="far fa-laugh-squint" title='Amused' onClick={this.setMoodAmused} /></div></div>)
        } else if (mood === 'Happy') {
            return (<div className='entries-mood-container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}><div className='mood-icon'><i className="far fa-grin" title='Happy' onClick={this.setMoodAmused} /></div></div>)
        } else if (mood === 'Content') {
            return (<div className='entries-mood-container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>Today's Mood<div className='mood-icon'><i className="far fa-meh" title='Content' onClick={this.setMoodAmused} /></div></div>)
        } else if (mood === 'Upset') {
            return (<div className='entries-mood-container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>Today's Mood<div className='mood-icon'><i className="far fa-frown" title='Upset' onClick={this.setMoodAmused} /></div></div>)
        } else if (mood === 'Tired') {
            return (<div className='entries-mood-container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>Today's Mood<div className='mood-icon'><i className="far fa-tired" title='Tired' onClick={this.setMoodAmused} /></div></div>)
        } else if (mood === 'Angry') {
            return (<div className='entries-mood-container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>Today's Mood<div className='mood-icon'><i className="far fa-angry" title='Angry' onClick={this.setMoodAmused} /></div></div>)
        } else (console.log('No mood to display'))
    }

    addEntry = () => {
        let { date, completedTasks, entry, imageOfDay } = this.props.entry
        axios.post('api/entries', {
            date,
            completedTasks,
            entry,
            imageOfDay
        }).then(res => {
            console.log(res.data);
        })
            .catch(err => {
                console.log('err from server', err)
            })
        this.setState({
            date: '',
            completedTasks: [],
            entry: '',
            imageOfDay: ''
        })

    }

    addPost = () => {
        let { noTask, entry, date, imageOfDay } = this.state;
        let { completedTasks, mood } = this.props.entry
        let today = new Date().toDateString()
        console.log('THIS IS WHATS BEING PASSED INTO CHANGE ACTIVITY')
        if (completedTasks.length === 1) {
            this.props.savePost(completedTasks[0].title, noTask, noTask, noTask, noTask, entry, imageOfDay, date, mood)
            this.props.postedTodayOn()
            this.props.changeActivity(today)
        } else if (completedTasks.length === 2) {
            this.props.savePost(completedTasks[0].title, completedTasks[1].title, noTask, noTask, noTask, entry, imageOfDay, date, mood)
            this.props.postedTodayOn()
            this.props.changeActivity(today)
        } else if (completedTasks.length === 3) {
            this.props.savePost(completedTasks[0].title, completedTasks[1].title, completedTasks[2].title, noTask, noTask, entry, imageOfDay, date, mood)
            this.props.postedTodayOn()
            this.props.changeActivity(today)
        } else if (completedTasks.length === 4) {
            this.props.savePost(completedTasks[0].title, completedTasks[1].title, completedTasks[2].title, completedTasks[3].title, noTask, entry, imageOfDay, date, mood)
            this.props.postedTodayOn()
            this.props.changeActivity(today)
        } else if (completedTasks.length === 5) {
            this.props.savePost(completedTasks[0].title, completedTasks[1].title, completedTasks[2].title, completedTasks[3].title, completedTasks[4].title, entry, imageOfDay, date, mood)
            this.props.postedTodayOn()
            this.props.changeActivity(today)
        } else { console.log(`Can't add post..`); }
    };

    render() {
        let { user, error, redirect } = this.props.user;
        let { entry, date, imageOfDay, completedTasks, mood } = this.props.entry
        if (error || redirect) return <Redirect to="/login" />;
        if (!user.loggedIn) return <div>Loading</div>;
        return (
            <div className='entries-display-container'>
                {/* <DateTime user={user} /> */}
                <section className='entry-container-preview'>
                    <div id='entry-preview'>

                        <div id='entry-date'>
                            {date}
                            <div><h2> Post Preview </h2></div>
                        </div>
                        <div className='post-container'>
                            <div className='image-tasks-container'>
                                <section id='image-of-day'>
                                    <h3><i><b>Image of the Day</b></i></h3>
                                    <img src={imageOfDay} alt='Preview Imagery' />
                                    {mood && mood.length > 0 ? (this.moodChecker()) : null}
                                </section>
                                <div id='completed-task-preview'>
                                    <header id='completed-tasks-header'>
                                        <i className='icon far fa-check-square checkIcon' /><h3> Completed Tasks </h3>  <i className='icon far fa-check-square checkIcon' />
                                    </header>
                                    {completedTasks.map((taskItem, i) =>
                                        <div className='task-container'
                                            key={i}>
                                            <div className='preview-task-item' >
                                                {taskItem.title}
                                            </div>
                                        </div>)}
                                </div>
                            </div>
                            <div id='entry-of-day-preview'>
                                <h3 id='entry-of-day-header-preview'><u>Additional Thoughts</u></h3>
                                <div id='entry-of-day-text-preview' style={{ height: '100%' }} >
                                    {/* {parse(entry)} */}
                                    <div className='edit-entry-quill-container'>
                                        <ReactQuill value={entry} onKeyPress={this.flipEntryEdit} />
                                    </div>
                                    {/* {editing ? (<textarea wrap='soft' id='update-thought' defaultValue={list[i].thought} onChange={(e) => this.handleChange(e.target.value)} onKeyDown={this.handleEditingDone} />) : (
                                        <p>{entry}</p>
                                    )} */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div>
                    <div>
                        <Link to='/' className='list-btn'>Previous</Link>
                        <Link className='list-btn' to='/entries' onClick={() => this.addPost()}>Save Post</Link>
                    </div>
                </div>
            </div >
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
    { getUser, savePost, getPosts, postedTodayOn, changeActivity }
)(Step2);

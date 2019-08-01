import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser } from '../../redux/userReducer';
import { savePost, getPosts } from '../../redux/entryReducer'
import DateTime from '../DateTime'
import Weather from '../Weather'
import axios from 'axios'
const parse = require('html-react-parser')


export class Step3 extends Component {
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
        let { completedTasks } = this.props.entry
        if (completedTasks.length === 1) {
            this.props.savePost(completedTasks[0].title, noTask, noTask, noTask, noTask, entry, imageOfDay, date)
        } else if (completedTasks.length === 2) {
            this.props.savePost(completedTasks[0].title, completedTasks[1].title, noTask, noTask, noTask, entry, imageOfDay, date)
        } else if (completedTasks.length === 3) {
            this.props.savePost(completedTasks[0].title, completedTasks[1].title, completedTasks[2].title, noTask, noTask, entry, imageOfDay, date)
        } else if (completedTasks.length === 4) {
            this.props.savePost(completedTasks[0].title, completedTasks[1].title, completedTasks[2].title, completedTasks[3].title, noTask, entry, imageOfDay, date)
        } else if (completedTasks.length === 5) {
            this.props.savePost(completedTasks[0].title, completedTasks[1].title, completedTasks[2].title, completedTasks[3].title, completedTasks[4].title, entry, imageOfDay, date);
        } else { console.log(`Can't add post..`); }
    };

    render() {
        let { user, error, redirect } = this.props.user;
        let { entry, date, imageOfDay, completedTasks } = this.props.entry
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
                                    {/* <ul id='completed-task-list-preview' key='targetTask'>
                                        <div><li> {completedTasks[0].title} </li></div>
                                        <div><li> {completedTasks[1].title} </li></div>
                                        <div><li> {completedTasks[2].title} </li></div>
                                        <div><li> {completedTasks[3].title} </li></div>
                                        <div><li> {completedTasks[4].title} </li></div>
                                     
                                    </ul> */}
                                </div>
                            </div>
                            <div id='entry-of-day-preview'>
                                <h3 id='entry-of-day-header-preview'><u>Additional Thoughts</u></h3>
                                <div id='entry-of-day-text-preview' >
                                    {parse(entry)}
                                    {/* {editing ? (<textarea wrap='soft' id='update-thought' defaultValue={list[i].thought} onChange={(e) => this.handleChange(e.target.value)} onKeyDown={this.handleEditingDone} />) : (
                                        <p>{entry}</p>
                                    )} */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div>
                    <Link to='/' className='list-btn'>Previous</Link>
                    <Link className='list-btn' to='/entries' onClick={() => this.addPost()}>Save Post</Link>
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
    { getUser, savePost, getPosts }
)(Step3);

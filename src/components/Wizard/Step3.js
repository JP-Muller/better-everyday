import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser } from '../../redux/userReducer';
import DateTime from '../DateTime'
import Weather from '../Weather'
import axios from 'axios'

export class Step3 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            entry: this.props.entry.entry,
            date: this.props.entry.date,
            selectedImage: null,
            imageOfDay: this.props.entry.imageOfDay,
            task1: this.props.entry.completedTasks[0],
            task2: this.props.entry.completedTasks[1],
            task3: this.props.entry.completedTasks[2],
            task4: this.props.entry.completedTasks[3],
            task5: this.props.entry.completedTasks[4],
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
        console.log('testing:', this.state.task1)
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
        let { title, content } = this.state;
        this.setState({ title: '', content: '' });
        this.props.savePost(title, content);
    };

    render() {
        let { user, error, redirect } = this.props.user;
        let { entry, date, imageOfDay, completedTasks } = this.props.entry
        if (error || redirect) return <Redirect to="/login" />;
        if (!user.loggedIn) return <div>Loading</div>;
        return (
            <div>
                <Weather />
                <section className='dash-display-container'>
                    <DateTime user={user} />
                    <section className='entry-container-preview'>
                        <div id='entry-preview'>
                            <h2> Post Preview </h2>
                            <hr />
                            <div id='entry-date'>
                                {date}
                            </div>
                            <hr />
                            <section id='image-of-day'>
                                <h3><i><b>Image of the Day</b></i></h3>
                                <img src={imageOfDay} alt='Preview Imagery' />
                            </section>
                            <div id='completed-task-preview'>
                                <hr />
                                <h3><i className='icon far fa-check-square checkIcon' /> <u>Completed Tasks</u> <i className='icon far fa-check-square entryIconRight' /></h3>
                                <ul id='completed-task-list-preview' key='targetTask'>
                                    <div><li> {completedTasks[0]} </li></div>
                                    <div><li> {completedTasks[1]} </li></div>
                                    <div><li> {completedTasks[2]} </li></div>
                                    <div><li> {completedTasks[3]} </li></div>
                                    <div><li> {completedTasks[4]} </li></div>
                                    {/* <div><li> {completedTasks[5]} </li></div> */}
                                    {/* <div><li> {list[i].accTasks[6]} </li></div>
                                    <div><li> {list[i].accTasks[7]} </li></div>
                                    <div><li> {list[i].accTasks[8]} </li></div>
                                    <div><li> {list[i].accTasks[9]} </li></div>
                                    <div><li> {list[i].accTasks[10]} </li></div> */}
                                </ul>
                            </div>
                            < hr />
                            <div id='entry-of-day-preview'>
                                <h3 id='entry-of-day-header-preview'><u>Additional Thoughts</u></h3>
                                <div id='entry-of-day-text-preview' >
                                    {entry}
                                    {/* {editing ? (<textarea wrap='soft' id='update-thought' defaultValue={list[i].thought} onChange={(e) => this.handleChange(e.target.value)} onKeyDown={this.handleEditingDone} />) : (
                                        <p>{entry}</p>
                                    )} */}
                                </div>
                                <hr />
                            </div>
                        </div>
                    </section>
                </section>
                <div>
                    <Link to='/wizard/addthoughts' className='list-btn'>Previous</Link>
                    <Link className='list-btn' to='/entries' onClick={() => this.addEntry()}>Save Post</Link>
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
    { getUser }
)(Step3);

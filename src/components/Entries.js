import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { getUser } from '../redux/userReducer'
import DateTime from './DateTime'
import axios from 'axios';

class Entries extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: 1,
            i: 0,
            list: [],
            listId: '',
            editing: false,
            currThought: ''
        }
        this.deleteEntry = this.deleteEntry.bind(this)
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

    // a failed experiment
    // left 37 right 39 

    handleKeyNext = e => {
        console.log('right arrow')
        // if (e.keyCode === 39) {
        //     this.handleNext()
        // }
        if (e.keyCode === 39 && this.state.i < this.state.list.length - 1) {
            let i = this.state.i + 1
            let listId = this.state.list[i].id
            console.log(`List ID ${listId} `)

            this.setState({
                i,
                listId
            })
            console.log(this.state.i)
        }
    }

    handleKeyPrev = e => {
        console.log('left arrow')
        if (e.keyCode === 37 && this.state.i > 0) {
            let i = this.state.i - 1
            let listId = this.state.list[i].id
            console.log(`List ID ${listId} `)
            console.log(this.state.i)

            this.setState({
                i,
                listId
            })
        }
    }

    handleNext = () => {
        if (this.state.i < this.state.list.length - 1) {
            let i = this.state.i + 1
            let listId = this.state.list[i].id
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
        if (this.state.i > 0) {
            let i = this.state.i - 1
            let listId = this.state.list[i].id
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

    handleChange = currThought => {
        this.setState({ currThought })
        console.log({ currThought })
    };

    handleEditingDone = e => {
        let { listId, currThought } = this.state
        let id = listId
        let thought = currThought
        if (e.keyCode === 13) {
            console.log('Finished editing')
            this.setState({ editing: !this.state.editing })
            axios
                .put(`/api/entries/${id}?newThought=${thought}`)
                .then(res => {
                    console.log(res.data)
                    this.setState({ list: res.data })
                })
                .catch(err => console.log(`Couldn't update..`, err))
        }
    }

    deleteEntry(i) {
        // let { listId } = this.state
        let id = this.state.list[i].id
        console.log('id', id)
        axios
            .delete(`/api/entries/${id}`).then(res => {
                console.log(res.data)
                if (i === 0) {
                    this.setState({
                        list: res.data,
                        // i: this.state.list.length - 2
                        i: res.data.length - 1
                    })
                } else {
                    this.setState({
                        list: res.data,
                        i: this.state.i - 1
                    })
                }

            })
            .catch(err => console.log(`Couldn't delete..`, err))
    }


    readEntry(i) {

        let { list, editing } = this.state
        return (
            <section className='dash-display-container'>
                <DateTime user={this.props.user.user} />
                <section className='entry-container-preview'>
                    <div id='entry-preview'>
                        <h2> Post Preview </h2>
                        <hr />
                        <div id='entry-date'>
                            {list[i].date} <div> {+i + 1}/{this.state.list.length}</div>
                        </div>
                        <hr />
                        <section id='image-of-day'>
                            <h3><i><b>Image of the Day</b></i></h3>
                            <img src={list[i].imageOfDay} alt='Preview Imagery' />
                        </section>
                        <div id='completed-task-preview'>
                            <hr />
                            <h3><i className='icon far fa-check-square checkIcon' /> <u>Completed Tasks</u> <i className='icon far fa-check-square entryIconRight' /></h3>
                            <ul id='completed-task-list-preview' key='targetTask'>
                                <div><li> {list[i].completedTasks[0]} </li></div>
                                <div><li> {list[i].completedTasks[1]} </li></div>
                                <div><li> {list[i].completedTasks[2]} </li></div>
                                <div><li> {list[i].completedTasks[3]} </li></div>
                                <div><li> {list[i].completedTasks[4]} </li></div>
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
                                {list[i].entry}
                                {/* {editing ? (<textarea wrap='soft' id='update-thought' defaultValue={list[i].thought} onChange={(e) => this.handleChange(e.target.value)} onKeyDown={this.handleEditingDone} />) : (
                                <p>{entry}</p>
                            )} */}
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
                </section>
            </section>

        )

    }

    render() {
        let { user, error, redirect } = this.props.user;
        if (error || redirect) return <Redirect to="/login" />;
        if (!user.loggedIn) return <div>Loading</div>;
        let { i } = this.state
        console.log({ i })
        return (

            <section id='entryDiv'>
                {this.state.list[i] ? this.readEntry(i) : null}
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
    { getUser }
)(Entries);
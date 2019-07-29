import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { saveTasks, getPosts } from '../../redux/entryReducer'
import { connect } from 'react-redux'
import { throwStatement } from '@babel/types';

export class Step1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputStr: '',
            initTasks: [],
            accTasks: [],
            completedTasks: this.props.entry.completedTasks,
            mode: 'taskList'
        }
    }

    // componentDidMount() {
    // }

    inputChange = inputStr => {
        this.setState({ inputStr })
        // console.log({ inputStr })
    }

    handleCheckChange = (i) => {
        let { initTasks } = this.state
        let checkedTasks = initTasks
        if (checkedTasks[i] && checkedTasks[i].checked !== true) {
            checkedTasks[i].checked = true
            console.log(`Checked Task ${checkedTasks[i].title}`)
        } else {
            checkedTasks[i].checked = false
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
        console.log(this.state.accTasks)
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
    handleTaskDelete = targetTask => {
        console.log('Deleted:', targetTask)
        let { initTasks, accTasks } = this.state
        let updatedAccTasks = accTasks
        let updatedInitTasks = initTasks

        for (let i = 0; i < updatedInitTasks.length; i++) {
            if (updatedInitTasks[i] === targetTask) {
                updatedInitTasks.splice(i, 1)
            }
        }
        for (let i = 0; i < updatedAccTasks.length; i++) {
            if (updatedAccTasks[i] === targetTask) {
                updatedAccTasks.splice(i, 1)
            }
        }
        this.setState({
            initTasks: updatedInitTasks,
            accTasks: updatedAccTasks
        })
        console.log('accTasks State:', accTasks)
        console.log('initTasks State:', initTasks)
    }

    saveItems = () => {
        let { accTasks } = this.state
        console.log(accTasks)
        this.props.saveTasks(accTasks)
        this.setState({ mode: 'question' })
    }
    render() {
        let { initTasks, completedTasks } = this.state
        if (this.state.mode === 'taskList') {
            return (
                <div className='list-style'>
                    <header className='list-header'>
                        <h1> What's on the agenda for today?</h1>
                    </header>
                    <div className='input-enter'>
                        <input onChange={(e) => this.inputChange(e.target.value)} value={this.state.inputStr} onKeyDown={this.onEnter} className='input-goals' type='text' />
                        <div className='input-enter-btn-div'></div>
                        <button className='input-enter-btn' onClick={() => this.addToTasks(this.state.inputStr)}><i class="fas fa-plus"></i></button>
                    </div>
                    {/* <li className='task-item' key={i}><input className='check-box' type='checkbox' onChange={this.handleCheckChange.bind(this, taskItem)} /><label id='check-box'>{taskItem}</label><button id='task-item-del' onClick={this.handleTaskDelete.bind(this, taskItem)}>[X]</button></li> */}
                    <div>
                        {initTasks.map((taskItem, i) =>
                            <div className='task-container'
                                key={i}>
                                <div className='task-item' >
                                    <div className='task-check'>
                                        {taskItem.checked !== true ? (<button className='task-checked-false' onClick={() => this.handleCheckChange(i)}><i className='icon far fa-check-square checkIcon' /></button>) : (<button className='task-checked-true' onClick={() => this.handleCheckChange(i)}><i className='icon far fa-check-square checkIcon' /></button>)}</div>
                                    {taskItem.title}
                                    <div className='task-item-del'><button onClick={this.handleTaskDelete.bind(this, taskItem)}><i class="fas fa-minus-circle"></i></button></div>
                                </div>
                            </div>)}
                        {/* {console.log(this.state.initTasks)} */}
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
        } else {
            return (
                <div className='list-style'>
                    <header className='list-header'>
                        <h1>Way to go, {this.props.user.user.firstName}!</h1>
                    </header>
                    <div id='completed-task-preview'>
                        <header id='completed-tasks-header'>
                            <i className='icon far fa-check-square checkIcon' /><h3> Completed Tasks </h3>  <i className='icon far fa-check-square checkIcon' />
                        </header>
                        {initTasks.map((taskItem, i) =>
                            <div className='task-container'
                                key={i}>
                                <div className='task-item' >
                                    <div className='task-check'>
                                        <button className='task-checked-true' onClick={() => this.handleCheckChange(i)}><i className='icon far fa-check-square checkIcon' /></button></div>
                                    {taskItem.title}
                                    <div className='task-item-del'><button onClick={this.handleTaskDelete.bind(this, taskItem)}><i class="fas fa-minus-circle"></i></button></div>
                                </div>
                            </div>)}
                    </div>
                    <section>
                        Would you like to add a picture to your post?
                    </section>
                    <div className="button-row"  >
                        <div className="middle-buttons">
                            <div>
                                <Link to='/' className='list-btn' onClick={() => this.backToTaskList()}>Previous</Link>
                                <Link className='list-btn' onClick={this.saveData} to='/wizard/postpreview'>Save Post</Link>
                            </div>
                        </div>
                    </div>
                </div>
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
    { saveTasks, getPosts }
)(Step1);

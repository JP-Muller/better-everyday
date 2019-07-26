import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { saveTasks } from '../../redux/entryReducer'
import { connect } from 'react-redux'

export class Step1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputStr: '',
            initTasks: [],
            accTasks: [],
            completedTasks: this.props.completedTasks,
            // task1: '',
            // task2: '',
            // task3: '',
            // task4: '',
            // task5: ''
        }
    }

    // componentDidMount() {

    // }

    inputChange = inputStr => {
        this.setState({ inputStr })
        // console.log({ inputStr })
    }

    handleCheckChange = targetTask => {
        let { accTasks, task1, task2, task3, task4, task5 } = this.state
        console.log('Checked Task:', targetTask)
        let checkedTasks = accTasks
        if (!checkedTasks.length) {
            checkedTasks.push(targetTask)
        }
        else if (checkedTasks.indexOf(targetTask) === -1) {
            checkedTasks.push(targetTask)
        }
        this.setState({
            accTasks: checkedTasks,
            task1: checkedTasks[0],
            task2: checkedTasks[1],
            task3: checkedTasks[2],
            task4: checkedTasks[3],
            task5: checkedTasks[4]
        })
        console.log('Checked Tasks:', accTasks)
        console.log('Task1:', task1)
        console.log('Task2:', task2)
        console.log('Task3:', task3)
        console.log('Task4:', task4)
        console.log('Task5:', task5)
    }

    addToTasks = input => {
        let { initTasks } = this.state
        let taskArray = initTasks
        if (input.length !== 0 && taskArray.length < 5) {
            taskArray.push(input)
        }
        this.setState({
            initTasks: taskArray,
            inputStr: ''
        })
        console.log(this.state.accTasks)
    }

    onEnter = e => {
        let { inputStr, initTasks } = this.state
        let taskArray = initTasks
        if (e.keyCode === 13) {
            console.log('Enter hit..')
            if (inputStr.length !== 0 && taskArray.length < 5) {
                taskArray.push(inputStr)
            }
            console.log('Curret Task Items:', taskArray)
            this.setState({
                initTasks: taskArray,
                inputStr: ''
            })
        }
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
    }
    render() {
        let { initTasks, completedTasks } = this.state
        return (
            <div className='list-style'>
                <header className='list-header'>
                    <h1> What's on the agenda for today?</h1>
                </header>
                <input onChange={(e) => this.inputChange(e.target.value)} value={this.state.inputStr} onKeyDown={this.onEnter} className='input-goals' type='text' />

                <button onClick={() => this.addToTasks(this.state.inputStr)} className='list-btn'>Add Task</button>

                {completedTasks.length
                    ? <ul id='list-item'>
                        {completedTasks.map((taskItem, i) =>

                            <div className='task-container'><li className='task-item' key={i}><input className='check-box' type='checkbox' onChange={this.handleCheckChange.bind(this, taskItem)} /><label id='check-box'>{taskItem}</label><button id='task-item-del' onClick={this.handleTaskDelete.bind(this, taskItem)}>[X]</button></li></div>)}
                        {/* {console.log(this.state.initTasks)} */}
                    </ul>
                    : <ul id='list-item'>
                        {initTasks.map((taskItem, i) =>

                            <div className='task-container'><li className='task-item' key={i}><input className='check-box' type='checkbox' onChange={this.handleCheckChange.bind(this, taskItem)} /><label id='check-box'>{taskItem}</label><button id='task-item-del' onClick={this.handleTaskDelete.bind(this, taskItem)}>[X]</button></li></div>)}
                        {/* {console.log(this.state.initTasks)} */}
                    </ul>}
                {initTasks.length ? (
                    <Link to='/wizard/addthoughts' className='list-btn' onClick={() => this.saveItems()}>Save</Link>)
                    : null
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state.entry;
}
export default connect(
    mapStateToProps,
    { saveTasks }
)(Step1);

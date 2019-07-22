import React, { Component } from 'react'
import axios from 'axios';

export default class List extends Component {
    constructor(props) {
        super(props)

        this.state = {
            inputStr: '',
            initTasks: [],
            accTasks: [],
            thought: '',
            date: ''

        }
    }

    inputChange = inputStr => {
        this.setState({ inputStr })
        console.log({ inputStr })
    }

    handleThoughtChange = thought => {
        let date = new Date().toDateString()
        this.setState({ date })
        this.setState({ thought })
        console.log({ thought })
        console.log({ date })
    }

    handleCheckChange = targetTask => {
        console.log(targetTask)
        let checkedTasks = this.state.accTasks
        checkedTasks.push(targetTask)
        this.setState({
            accTasks: checkedTasks
        })
        console.log(this.state.checked)
        console.log(this.state.accTasks)
    }

    addToTasks = input => {
        let taskArray = this.state.initTasks

        taskArray.push(input)

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
            // this.addToTasks()
            taskArray.push(inputStr)
            console.log(taskArray)
            this.setState({
                initTasks: taskArray,
                inputStr: ''
            })
        }
    }


    handleTaskDelete = targetTask => {
        console.log(targetTask)
        let listSplicer = this.state.initTasks
        for (let i = 0; i < listSplicer.length; i++) {
            if (listSplicer[i] === targetTask) {
                listSplicer.splice(i, 1)

            }

        }
        this.setState({
            initTasks: listSplicer
        })

    }

    addEntry = () => {
        axios.post('api/entries', {
            date: this.state.date,
            accTasks: this.state.accTasks,
            thought: this.state.thought
        }).then(res => {
            console.log(res.data);
        })
            .catch(err => {
                console.log('err from server', err)
            })
        this.setState({
            accTasks: [],
            initTasks: [],
        })

    }
    render() {
        return (
            <div className='listStyle'>
                <h1 className='header'> What will you do to better yourself today?</h1>

                <input onChange={(e) => this.inputChange(e.target.value)} value={this.state.inputStr} onKeyDown={this.onEnter} className='inputGoals' type='text' placeholder='Enter goal...' />

                <button onClick={() => this.addToTasks(this.state.inputStr)} className='btn'>Add Task</button>

                <ul id='listItem'>
                    {this.state.initTasks.map((taskItem, i) =>
                        <li className='taskItem' key={taskItem}><input id='checkBox' type='checkbox' onChange={this.handleCheckChange.bind(this, taskItem)} /><label htmlFor id='checkBox'>{taskItem}</label><button id='taskItemDel' onClick={this.handleTaskDelete.bind(this, taskItem)}>[X]</button></li>)}
                    {console.log(this.state.initTasks)}
                </ul>

                <textarea id='inputThoughts' type='text' placeholder='Additional Thoughts..' wrap='soft' onChange={(e) => this.handleThoughtChange(e.target.value)} />
                <button className='btn' onClick={() => this.addEntry()}>Save Entry</button>
            </div>
        )
    }
}
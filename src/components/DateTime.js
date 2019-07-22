import React, { Component } from 'react'
// import axios from 'axios';

export class DateTime extends Component {
    constructor() {
        super()
        this.state = {
            date: ''
        }
    }
    componentDidMount() {
        this.getDate()
    }

    getDate = () => {
        let date = new Date().toDateString()
        this.setState({ date })
        console.log({ date })
    }

    MornAfterEve = () => {
        const date = new Date()
        const currentHr = date.getHours()
        console.log(`Hour ${currentHr}:00!`)

        if (currentHr < 12) {
            return 'Good Morning!'
        } else if (currentHr < 18) {
            return 'Good Afternoon!'
        } else {
            return 'Good Evening!'
        }
    }

    render() {
        const { date } = this.state
        return (
            <div id='dateDiv'>
                <div className='header'>{this.props.test}</div>
                <h3 id='dateHeader'>{date}</h3>
                <div id='hourGreeting'>
                    <h4>{this.MornAfterEve()}</h4>
                </div>
            </div>

        )
    }
}

export default DateTime

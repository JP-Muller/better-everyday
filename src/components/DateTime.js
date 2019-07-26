import React, { Component } from 'react'
import Clock from 'react-live-clock'
// import axios from 'axios';

export class DateTime extends Component {
    constructor(props) {
        super(props)
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
        const { user } = this.props
        console.log(user)
        const date = new Date()
        const currentHr = date.getHours()
        console.log(`Hour ${currentHr}:00!`)

        if (currentHr < 12) {
            return <div id='hour-greeting'><i className="far fa-sun" /> Good morning, {user.firstName}!</div>
        } else if (currentHr < 18) {
            return <div id='hour-greeting'><i className="far fa-sun" /> Good afternoon, {user.firstName}!</div>
        } else {
            return <div id='hour-greeting'><i class="far fa-moon" /> Good evening, {user.firstName}!</div>
        }
    }

    render() {
        return (
            <div id='date-div'>
                <div id='live-clock'>
                    <h1><Clock format={'h:mm:ss'} ticking={true} /></h1>
                </div>
                <div id='hour-greeting'>
                    <h2>{this.MornAfterEve()}</h2>
                </div>
            </div>

        )
    }
}

export default DateTime

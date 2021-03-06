import React, { Component } from 'react'
import Clock from 'react-live-clock'
// import axios from 'axios';

export class DateTime extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: '',
            militaryTime: false,
            greetingFlip: false,
            mantra: ''
        }
    }
    componentDidMount() {
        this.getDate()
        this.mantraPicker()
    }

    getDate = () => {
        let date = new Date().toDateString()
        this.setState({ date })
        // console.log({ date })
    }

    handleDoubleClick = () => {
        let { militaryTime } = this.state
        this.setState({
            militaryTime: !militaryTime
        })
    }

    handleGreetingClick = () => {
        let { greetingFlip } = this.state
        this.setState({
            greetingFlip: !greetingFlip
        })
    }

    MornAfterEve = () => {
        const { user } = this.props
        // console.log(user)
        const date = new Date()
        const currentHr = date.getHours()
        console.log(`Hour ${currentHr}:00!`)

        if (currentHr < 12) {
            return <div id='hour-greeting'><i className="far fa-sun" /> Good morning, {user.firstName}!</div>
        } else if (currentHr < 18) {
            return <div id='hour-greeting'><i className="far fa-sun" /> Good afternoon, {user.firstName}!</div>
        } else {
            return <div id='hour-greeting'><i className="far fa-moon" /> Good evening, {user.firstName}!</div>
        }
    }
    mantraPicker = () => {
    let date = new Date().toDateString().split(' ')
    if (date && date[0] === 'Sun') {
        this.setState({
            mantra: 'Trust your intuition, '
        })
      } else if (date && date[0] === 'Mon') {
        this.setState({
            mantra: 'Find your calm, '
        })
      } else if (date && date[0] === 'Tue') {
        this.setState({
            mantra: 'Help others, '
        })
      } else if (date && date[0] === 'Wed') {
            this.setState({
                mantra: 'Be in the moment, '
            })
      } else if (date && date[0] === 'Thu') {
        this.setState({
            mantra: 'Be happy, '
        })
      } else if (date && date[0] === 'Fri') {
            this.setState({
                mantra: 'Good things take time, '
            })
      } else if (date && date[0] === 'Sat') {
        this.setState({
            mantra: 'Live your truth, '
        })
      }
    }

    render() {
        const { user } = this.props
        let {mantra} = this.state
        return (
            <div id='date-div'>
                <div id='live-clock' onDoubleClick={this.handleDoubleClick}>
                    {!this.state.militaryTime ? (<h1><Clock format={'h:mm:ss'} ticking={true} /></h1>)
                        : (<h1><Clock format={'HH:mm:ss'} ticking={true} /></h1>)}

                </div>
                <div id='hour-greeting' onDoubleClick={this.handleGreetingClick}>
                    {!this.state.greetingFlip ? (<h2>{this.MornAfterEve()}</h2>) : (<h2><div id='hour-greeting'>{mantra}{user.firstName}. </div></h2>)}

                </div>
            </div>

        )
    }
}

export default DateTime

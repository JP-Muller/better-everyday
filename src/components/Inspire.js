import React, { Component } from 'react'
import axios from 'axios';

class Inspire extends Component {
    constructor(props) {
        super(props)
        this.state = {
            quotes: []

        }
    }
    componentDidMount() {
        axios
            .get('https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json')
            .then(res => {
                this.setState({ quotes: res.data })
                console.log(res.data)

            })
            .catch(err => {
                console.log('err from server', err)
            })
    }
    render() {
        let { quotes } = this.state
        return (
            <div>
                <section>
                    <h2 id='rQuote' className='listStyle header'>"{quotes.quoteText}"</h2>
                    <dfn id='rQuote' className='listStyle2 header'>-{quotes.quoteAuthor}</dfn>
                </section>
            </div>
        )
    }
}


export default Inspire

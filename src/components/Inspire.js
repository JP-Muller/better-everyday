import React, { Component } from 'react'
import axios from 'axios';

class Inspire extends Component {
    constructor(props) {
        super(props)
        this.state = {
            quotes: [],
            isHovering: false

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

    handleMouseHover = () => {
        this.setState(this.toggleHoverState);
    }

    toggleHoverState = (state) => {
        return {
            isHovering: !state.isHovering,
        };
    }
    render() {
        let { quotes } = this.state
        return (
            <div className='quote-container'>
                <section id='random-quote' onMouseEnter={this.handleMouseHover}
                    onMouseLeave={this.handleMouseHover}>
                    <p>"{quotes.quoteText}"</p>
                    {this.state.isHovering ? (<section id='quote-credit'>
                        -{quotes.quoteAuthor}
                    </section>) : null}
                </section>

            </div>
        )
    }
}


export default Inspire

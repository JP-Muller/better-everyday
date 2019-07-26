import React, { Component } from 'react'
import axios from 'axios';

export class Background extends Component {
    constructor() {
        super()
        this.state = {
            imageUrl: {}
        }
    }
    componentDidMount() {
        this.getRandomBackground()
    }

    getRandomBackground = () => {
        axios
            .get(`https://api.unsplash.com/photos/random/client_id=48a9956ac4c757a3cd89e724c418639ad9afedf314f6dbae98518581cfe129bd`)
            .then(res => {
                this.setState({
                    imageUrl: res.data
                })
                console.log(this.state.imageUrl)
            })
    }
    render() {
        return (
            <div>
                background
            </div>
        )
    }
}

export default Background

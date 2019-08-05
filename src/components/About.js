import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import { getUser, getUserScores } from '../redux/userReducer';
import axios from 'axios';

class About extends Component {
    constructor() {
        super()
        this.state = {
            contactUs: false,
            name: '',
            email: '',
            message: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.props.getUser()
        this.props.getUserScores()
    }
    contactFlip = () => {
        let { contactUs } = this.state
        this.setState({ contactUs: !contactUs })
    }
    handleChange = e => {
        let { name, value } = e.target
        this.setState({ [name]: value })
    };
    async handleSubmit(e) {
        e.preventDefault()
        const { name, email, message } = this.state
        const form = await axios.post('/api/form', { name, email, message })
            .then(
                this.contactFlip(),
                this.setState({
                    name: '',
                    email: '',
                    message: '',
                }, () => { toast(`Message sent! Thank you!`) }))
    }
    render() {
        let { contactUs } = this.state
        return (
            <div className='about-info-container'>

                {!contactUs ? (<div className='about-details-container'><h1><u>About</u></h1>
                    <section className='about-container'>
                        <dfn className='about-style2'>This is a full stack react app to help organize your day to be more productive. You're able to save completed tasks with additional thoughts in daily entries to look through later.</dfn>
                        <dfn className='about-style'>Start now! <br /> Do something today that your future self will thank you for!</dfn>
                        <iframe id='vid-box' title='video' width="560" height="315" src="https://www.youtube.com/embed/F-MYrZIeMtI" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> <p className='about-style'>"You play it safe, you end progression"</p>
                    </section>
                    <button className='view-post-btn' onClick={this.contactFlip}>CONTACT US</button>
                </div>) : (<div className='about-details-container'>
                    <h1 style={{marginBottom: '15px'}}>Send us a message!</h1>
                    <section className='about-container'>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '25px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '15px' }}><h3>Name:</h3> <input type='text' className='about-input-row' name='name' onChange={this.handleChange} value={this.state.name} /></div>
                            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '15px' }}><h3>Email:</h3> <input type='text' className='about-input-row' name='email' onChange={this.handleChange} value={this.state.email} /></div>
                        </div>
                        <h3>Message:</h3>
                        <div style={{width: '100%'}} ><textarea className='about-input-thoughts' name='message' onChange={this.handleChange} value={this.state.message} /></div>
                    </section>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'spaceEvenly', alignItems: 'center', width: '50%', marginTop: '20px' }}>
                            <button className='view-post-btn' onClick={((e) => this.handleSubmit(e))}>SUBMIT</button>
                            <button className='view-post-btn' onClick={this.contactFlip}>GO BACK</button>
                        </div>
                    </div>
                </div>)}
            </div >
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        entry: state.entry
    }
}
export default connect(mapStateToProps, { getUser, getUserScores })(About)
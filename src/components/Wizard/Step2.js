import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { getUser } from '../../redux/userReducer';
import { saveImageOfDay, saveEntry, savePostDate } from '../../redux/entryReducer'
import DateTime from '.././DateTime'
import Weather from '.././Weather'
import axios from 'axios'

export class Step2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            entry: this.props.entry.entry,
            date: this.props.entry.date,
            selectedImage: null,
            imageOfDay: this.props.entry.imageOfDay
            // imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-cy2XllAnyu7iP-SecyE0cafs6VP5ulqQcle6VKAqz-jcEytK'
        }
    }

    componentDidMount() {
        if (!this.props.user.user.loggedIn) {
            this.props.getUser();
            console.log('Got User!')
        }
    }

    handleThoughtChange = entry => {
        let date = new Date().toDateString()
        this.setState({
            date,
            entry
        })
        console.log({ entry })
        console.log({ date })
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

    handleFileSelection = (e) => {
        this.setState({
            selectedImage: e.target.files[0]
        })
        console.log(this.state.selectedImage)
    }

    handleImageUrl = (imageOfDay) => {
        console.log(`Image URL State: ${imageOfDay}`)
        this.setState({
            imageOfDay
        })
    }
    saveData = () => {
        let { imageOfDay, entry, date } = this.state
        this.props.saveEntry(entry)
        this.props.saveImageOfDay(imageOfDay)
        this.props.savePostDate(date)
    }
    render() {
        let { entry, imageOfDay } = this.state
        let { user, error, redirect } = this.props.user;
        if (error || redirect) return <Redirect to="/login" />;
        if (!user.loggedIn) return <div>Loading</div>;
        return (
            <div>
                <Weather />
                <section className='dash-display-container'>
                    <DateTime user={user} />
                    <section className='uploader-container'>
                        <div id='upload-img-preview'>
                            <img src={imageOfDay} alt='Preview Imagery' />
                        </div>
                        <header className='list-header'>
                            <h1>Upload photo of the day</h1>
                        </header>
                        <p>Image URL:</p>
                        <input type='text' onChange={(e) => this.handleImageUrl(e.target.value)} />
                        <input style={{ display: 'none' }} type='file' onChange={this.handleFileSelection} ref={fileInput => this.fileInput = fileInput} />
                        <button onClick={() => this.fileInput.click()}>Select File</button>
                        <button onClick={() => this.fileInput.click()}>Upload</button>
                        {/* onClick={this.handleImageUpload} */}
                    </section>
                    <div className='list-style'>
                        <header className='list-header'>
                            <h1>Thoughts about today...</h1>
                        </header>
                        <textarea id='input-thoughts' type='text' wrap='soft' value={entry} onChange={(e) => this.handleThoughtChange(e.target.value)} />
                    </div>
                </section>
                <div>
                    <Link to='/' className='list-btn' onClick={() => this.saveData()}>Previous</Link>
                    <Link className='list-btn' onClick={this.saveData} to='/wizard/postpreview'>Save Post</Link>
                </div>
            </div>
        )
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
    { getUser, saveImageOfDay, saveEntry, savePostDate }
)(Step2);

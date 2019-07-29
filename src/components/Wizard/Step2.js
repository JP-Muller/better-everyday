import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Tenor from 'react-tenor'
import TenorStyles from 'react-tenor/dist/styles.css'
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getUser } from '../../redux/userReducer';
import { saveImageOfDay, saveEntry, savePostDate, getPosts } from '../../redux/entryReducer'
import DateTime from '.././DateTime'
import Weather from '.././Weather'
import axios from 'axios'

export class Step2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            entry: this.props.entry.entry,
            date: this.props.entry.date,
            tenorSelected: '',
            imageOfDay: this.props.entry.imageOfDay
            // imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-cy2XllAnyu7iP-SecyE0cafs6VP5ulqQcle6VKAqz-jcEytK'
        }
    }

    componentDidMount() {
        if (!this.props.user.user.loggedIn) {
            this.props.getUser();
            console.log('Got User!')
        }
        if (this.props.user.user.loggedIn) {
            this.props.getPosts(this.props.user.user.id)
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
            <section className='entries-display-container'>
                <section className='entry-container-preview'>
                    <div id='entry-preview'>
                        <div className='post-container'>
                            {/* <div className='image-tasks-container'>
                                <section id='step2-image-of-day'>
                                    <h3><i><b>Image of the Day</b></i></h3>
                                    <section className='image-select-container'>
                                    <section>
                                    <Tenor token="" initialSearch='good job' onSelect={result => this.setState({ imageOfDay: result.media[0].gif.url })} />
                                    <img src={imageOfDay} alt='Preview Imagery' />
                                    </section>
                                     <section className='tenor-search'>
                                         <Tenor token="BH9EX9JC7WAE" initialSearch='good job' onSelect={result => this.setState({ imageOfDay: result.media[0].gif.url })} /> 
                                     </section> 
                                    </section>
                                </section>
                            </div> */}
                            <div id='upload-img-preview'>
                                <header className='list-header image-header'>
                                    <h1>Upload photo of the day</h1>
                                </header>
                                <section className='tenor-search'>
                                    <Tenor token="" onSelect={result => this.setState({ imageOfDay: result.media[0].gif.url })} />
                                </section>
                                <img src={imageOfDay} alt='Preview Imagery' />
                                <p>Image URL:</p>
                                <input type='text' onChange={(e) => this.handleImageUrl(e.target.value)} />
                            </div>
                            <div id='entry-of-day-preview'>
                                <h3 id='entry-of-day-header-preview'><u>Additional Thoughts</u></h3>
                                <div id='entry-of-day-text-preview' >

                                    <textarea id='input-thoughts' type='text' wrap='soft' value={entry} onChange={(e) => this.handleThoughtChange(e.target.value)} />

                                </div>
                            </div>
                        </div>

                        <div className="button-row"  >
                            <div className="middle-buttons">
                                <div>
                                    <Link to='/' className='list-btn' onClick={() => this.saveData()}>Previous</Link>
                                    <Link className='list-btn' onClick={this.saveData} to='/wizard/postpreview'>Save Post</Link>
                                </div>
                            </div>


                        </div>

                    </div>
                </section>
            </section>
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
    { getUser, saveImageOfDay, saveEntry, savePostDate, getPosts }
)(Step2);

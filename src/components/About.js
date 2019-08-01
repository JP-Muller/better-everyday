import React from 'react'

function About() {
    return (
        <div className='about-info-container'>
            <div className='about-details-container'>
                <h1><u>About</u></h1>
                <section className='about-container'>
                    <dfn className='about-style2'>This is a full stack react app to help organize your day to be more productive. You're able to save completed tasks with additional thoughts in daily entries to look through later.</dfn>
                    <dfn className='about-style'>Start now! <br /> Do something today that your future self will thank you for!</dfn>
                    <iframe id='vid-box' title='video' width="560" height="315" src="https://www.youtube.com/embed/F-MYrZIeMtI" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> <p className='about-style'>"You play it safe, you end progression"</p>
                </section>
                <div>
                    <p id='version'>Version: .137</p>
                </div>
            </div>
        </div>
    )
}


export default About